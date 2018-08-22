import { Component, State, Prop, Method } from "@stencil/core";
//import {  Toast } from "@ionic/core";
declare var createjs;
declare var lib;
declare var AdobeAn;
@Component({
  tag: "gi-animation",
  styleUrl: "gi-animation.scss"
})
export class AppAnimation {
  @Prop() src : string;
  @Prop() composition : string;
  @Prop() isClassroomModeOn: boolean = false;
  // @Prop({ connect: "ion-toast-controller" })
  // toastCtrl: ToastController;
  @State() paused: boolean = true;
  @State() sizeOfCanvas: any;
  @State() dataLoaded: boolean = false;
  @State() currentProgressWidth: any = 0;
  canvas: any;
  anim_container: any;
  dom_overlay_container: any;
  comp: any;
  exportRoot: any;
  timeline: any;
  stage: any;
  sound: any;
  firstFramePath: string = "";
  
  isBusy: boolean = false;
  formattedProgress: string = "0";

  componentWillLoad() {
    const script = document.createElement("script");
    this.firstFramePath = this.src.replace(".js", ".png");
    script.src = this.src;
    //script.async = true;
    document.body.appendChild(script);
    let self = this;
    window["playSound"] = function (id, loop) {
      if (self.sound) {
        self.sound.stop();
      }
      self.sound = createjs.Sound.play(
        id,
        createjs.Sound.INTERRUPT_EARLY,
        0,
        0,
        loop
      );
      return self.sound;
    };

  }
  componentDidLoad() {
  }
  loadAnimation() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
      return;
    }

    this.canvas = document.getElementById("canvas1");
    this.anim_container = document.getElementById("canvas-container");
    this.dom_overlay_container = document.getElementById("dom_overlay_container");
    this.comp = AdobeAn.getComposition(this.composition);

    this.canvas.style.width = "100%";
    this.canvas.style.height = document.getElementById("canvas1").offsetWidth + "px";
    this.anim_container.style.height = document.getElementById("canvas1").offsetWidth + "px";
    var loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete", (evt) => { this.handleComplete(evt); });
    loader.addEventListener("fileload", (evt) => { this.handleFileLoad(evt) });
    loader.addEventListener("progress", this.handleQueueProgress(this));
    //TODO :can't figure out https://github.com/CreateJS/SoundJS/issues/283
    loader.loadManifest(
      lib.properties.manifest,
      true,
      this.src.substring(0, this.src.lastIndexOf("/") + 1)
    );
  }

  doneLoading() {
    this.isBusy = false;
    this.dataLoaded = true;
    this.paused = false;
  }

  handleFileLoad(evt) {

    var images = this.comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
    // if (evt.item.type == "image") {
    //   if (!window["createJSImages"]) window["createJSImages"] = {};
    //   if (!window["images"]) window["images"] = {};
    //   window["createJSImages"][evt.item.id] = evt.result;
    //   window["images"][evt.item.id] = evt.result;
    // }
  }

  handleQueueProgress(that) {
    this.isBusy = true;
    return function (progress) {
      that.formattedProgress = progress.loaded
        ? (progress.loaded * 100).toFixed(0)
        : "0";

      if (progress.loaded == 1) {

        that.doneLoading();
      }
      console.log("after queue progress");
    };
  }

  // handleComplete(that) {
  //   this.paused = false;
  //   return function () {
  //     that.stage = new createjs.Stage("canvas1");
  //     that.stage.addChild(new lib[that.animation]());

  //     createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  //     createjs.Ticker.setFPS(lib.properties.fps);
  //     createjs.Ticker.addEventListener("tick", that.tickHandler(that));
  //     createjs.Ticker.setPaused(false);
  //     that.resizeAnimation(that);

  //     let st = null;
  //     // let st = that.stage.getChildAt(0).soundTrack ? that.stage.getChildAt(0).soundTrack : that.stage.getChildAt(0).children[0].soundTrack;
  //     if (that.stage.getChildAt(0) && that.stage.getChildAt(0).soundTrack) {
  //       st = that.stage.getChildAt(0).soundTrack;
  //     } else {
  //       if (
  //         that.stage.getChildAt(0) &&
  //         that.stage.getChildAt(0).children[0] &&
  //         that.stage.getChildAt(0).children[0].soundTrack
  //       ) {
  //         st = that.stage.getChildAt(0).children[0].soundTrack;
  //       }
  //     }
  //     if (!st) {
  //       st = createjs.Sound._instances[0];
  //     }
  //   };
  // }
  handleComplete(evt) {
    var ss = this.comp.getSpriteSheet();
    var queue = evt.target;
    var lib = this.comp.getLibrary();
    var ssMetadata = lib.ssMetadata;
    for (var i = 0; i < ssMetadata.length; i++) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }

    this.exportRoot = new lib.lesson1();
    this.stage = new lib.Stage(this.canvas);

    this.makeResponsive(true, 'both', false, 1);
    AdobeAn.compositionLoaded(lib.properties.id);
    this.fnStartAnimation();
  }

  fnStartAnimation() {
    this.paused = false;
    this.stage.addChild(this.exportRoot);
    createjs.Ticker.framerate = lib.properties.fps;
    //createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", this.stage);
    createjs.Ticker.addEventListener("tick", (evt) => { this.tickHandler(evt) });
  }
  handleTick(event) {
    // Actions carried out each tick (aka frame)
    if (!event.paused) {
      console.log("paused or not", event.paused)
      console.log("paused or not", event)
      // Actions carried out when the Ticker is not paused.
    }
  }
  makeResponsive(isResp, respDim, isScale, scaleType) {
    window.addEventListener('resize', () => this.resizeCanvas(isResp, respDim, isScale, scaleType));
    this.resizeCanvas(isResp, respDim, isScale, scaleType);

  }
  resizeCanvas(isResp, respDim, isScale, scaleType) {
    var lastW, lastH, lastS = 1;
    var w = lib.properties.width, h = lib.properties.height;
    var iw = window.innerWidth, ih = window.innerHeight;
    var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
    if (isResp) {
      if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
        sRatio = lastS;
      }
      else if (!isScale) {
        if (iw < w || ih < h)
          sRatio = Math.min(xRatio, yRatio);
      }
      else if (scaleType == 1) {
        sRatio = Math.min(xRatio, yRatio);
      }
      else if (scaleType == 2) {
        sRatio = Math.max(xRatio, yRatio);
      }
    }

    var anim_container = document.getElementById("canvas-container");
    // this.canvas.width = w * pRatio * sRatio;
    // this.canvas.height = h * pRatio * sRatio;
    // this.canvas.style.width = this.dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
    // this.canvas.style.height = anim_container.style.height = this.dom_overlay_container.style.height = h * sRatio + 'px';

    this.canvas.width = w * pRatio * sRatio;
    this.canvas.height = h * pRatio * sRatio;
    this.canvas.style.width = "100%";
    this.canvas.style.height = document.getElementById("canvas1").offsetWidth + "px";
    anim_container.style.height = document.getElementById("canvas1").offsetWidth + "px";

    this.stage.scaleX = pRatio * sRatio;
    this.stage.scaleY = pRatio * sRatio;
    lastW = iw; lastH = ih; lastS = sRatio;
    var newWidth = document.getElementById("canvas1").offsetWidth;
    this.sizeOfCanvas = newWidth;
    this.stage.tickOnUpdate = false;
    this.stage.update();
    this.stage.tickOnUpdate = true;
  }
  resizeAnimation(that) {
    if (!this.dataLoaded) {
      return;
    }
    var newWidth = document.getElementById("canvas1").offsetWidth;
    // document.getElementById("canvas1").style.height = newWidth + "px";
    // document.getElementById("canvas1").style.width = newWidth + "px";
    that.sizeOfCanvas = newWidth;
    if (that.stage) {
      that.stage.width = newWidth;
      that.stage.height = newWidth;
    }
  }


  // tickHandler(event) {
  //   var newCircle = false;

  //   if (!this.paused && !event.paused) {
  //     this.stage.update();
  //   }
  //   let stage = this.stage.children[0];
  //   this.timeline = stage["timeline"];

  //   if (this.timeline.position % 10 == 0) {
  //     this.currentProgressWidth = parseFloat(
  //       (this.timeline.position /
  //         this.timeline.duration *
  //         this.sizeOfCanvas).toFixed(0)
  //     );
  //     console.log(this.currentProgressWidth);
  //   }

  //   if (this.timeline.position == 0) newCircle = false;
  //   if (this.timeline.duration - this.timeline.position == 1 && !newCircle) {
  //     //to pause at the end of movie
  //     newCircle = true;

  //     createjs.Ticker.setPaused(true);
  //     let st = this.sound;
  //     if (st) {
  //       st.paused = true;
  //     }
  //   }

  // }

  tickHandler(event) {
    if (!event.paused) {
      let stage = this.stage.children[0];
      this.timeline = stage["timeline"];
      if (this.timeline.position % 10 == 0) {
        this.currentProgressWidth = parseFloat(
          (this.timeline.position /
            this.timeline.duration *
            this.sizeOfCanvas).toFixed(0)
        );
      }
    }
  }

  playPauseAnimation() {
    if (createjs && createjs.Ticker) {
      let newState = !createjs.Ticker.paused;
      let st = this.sound;
      if (st) {
        st.paused = newState;
      }

      createjs.Ticker.paused = newState;
      if (newState) {
        createjs.Ticker.removeEventListener("tick", this.stage);
      }
      else {
        createjs.Ticker.addEventListener("tick", this.stage);
      }
      this.paused = newState;
    }
  }

  rewindAnimationTo(newPosition, soundPosition) {

    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    if (newPosition < 0) {
      newPosition = 0;
    }

    if (newPosition > timeline.duration) {
      newPosition = timeline.duration - 10;
    }

    let st = this.sound;
    if (st) {
      st.paused = true;
    }
    //this.sound.setPosition(soundPosition);
    this.sound.position = soundPosition;
    if (this.paused) {

      stage.gotoAndStop(newPosition);
      this.stage.update();
      if (st && !st.getPaused()) {
        st.paused = true;
      }
    } else {

      stage.gotoAndPlay(newPosition);
      st.paused = false;

    }
  }

  rewindAnimation(event) {
    event.stopPropagation();

    let stage = this.stage.children[0];
    let timeline = stage["timeline"];
    let newPosition = Math.round(
      event.offsetX / this.sizeOfCanvas * timeline.duration
    );
    var soundPosition = this.sound.position + 5000;
    this.rewindAnimationTo(newPosition, soundPosition);
  }

  rewind5Sec() {
    let fps = lib.properties.fps;
    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    let newPosition = timeline.position - fps * 5;
    var soundPosition = this.sound.position - 5000;
    this.rewindAnimationTo(newPosition, soundPosition);
  }
  componentDidUpdate() {

  }

  fastForward5Sec() {
    let fps = lib.properties.fps;
    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    let newPosition = timeline.position + fps * 5;
    var soundPosition = this.sound.position + 5000;
    this.rewindAnimationTo(newPosition, soundPosition);
  }
  playButtonAction() {
    if (!this.dataLoaded) {
      this.loadAnimation();
    } else {
      this.playPauseAnimation();
    }
  }
  componentDidUnload() {
    this.canvasPauseAnimation();
    if (this.stage && this.stage.children) {
      let stage = this.stage.children[0];
      let timeline = stage["timeline"];
      stage.removeAllChildren()
      stage.removeAllEventListeners()
      stage.canvas = null
      stage._eventListeners = null;
    }
  }



  @Method()
  canvasPlayAnimation() {
    if (!this.dataLoaded) {
      this.loadAnimation();
    } else {
      if (createjs && createjs.Ticker) {
        let newState = false;
        let st = this.sound;
        if (st) {
          st.paused = newState;
        }
        createjs.Ticker.paused = newState;
        if (newState) {
          createjs.Ticker.addEventListener("tick", this.stage);
        }
        this.paused = newState;
      }
    }

  }
  @Method()
  canvasPauseAnimation() {
    if (createjs && createjs.Ticker) {
      let newState = true;
      let st = this.sound;
      if (st) {
        st.paused = newState;
      }
      createjs.Ticker.paused = newState;
      if (newState) {
        createjs.Ticker.removeEventListener("tick");
      }
      this.paused = newState;
    }
  }
  muteVolume() {
    let st = this.sound;
    if (st) {
      st.volume = 0;
    }
  }
  downVolume() {
    let st = this.sound;
    if (st) {
      if (st._getVolume() > 0.9) {
        st.volume = st._getVolume() - 0.1;
      }
    }
  }
  upVolume() {
    let st = this.sound;
    if (st) {
      if (st._getVolume() < 1) {
        st.volume = st._getVolume() + 0.1;
      }
    }
  }
  render() {
    return (
      <div class="cavase-main-container">
        <div class="canvas-container" id="canvas-container">
          {!this.isClassroomModeOn ? (
            <div><canvas
              id="canvas1"
              onClick={() => this.playButtonAction()}
              class="video-canvas"
            />
              <div id="dom_overlay_container">
              </div>
            </div>
          ) : (
              ""
            )}
          {!this.dataLoaded ? (
            <img class="frame-img" src={this.firstFramePath} />
          ) : (
              ""
            )}
          {this.isClassroomModeOn ? (
            <img
              class="overlay-img"
              src="/assets/img/play-button-disabled-overlay.png"
            />
          ) : (
              ""
            )}
          {!this.isClassroomModeOn && this.paused ? (
            <img
              class="overlay-img"
              onClick={() => this.playButtonAction()}
              src="/assets/img/play-button-overlay.png"
            />
          ) : (
              ""
            )}
          {this.isBusy ? (
            <div>
              <div class="uil-ring-css">
                <div />
                <a>{this.formattedProgress}</a>
              </div>
            </div>
          ) : (
              ""
            )}
        </div>
        {this.dataLoaded ? (
          <div class="navControls">
            <div
              class="progressBar"
              onClick={() => this.rewindAnimation.bind(this)}
            >
              <div
                class="currentProgress"
                style={{ width: this.currentProgressWidth + "px" }}
              />
            </div>
            <div class="button-panel">
              <ion-button color="primary" onClick={() => this.rewind5Sec()}>
                {" "}
                <ion-icon name="rewind" />{" "}
              </ion-button>

              <ion-button
                color="primary"
                onClick={() => this.playButtonAction()}
              >
                {" "}
                {this.paused ? (
                  <ion-icon name="play" />
                ) : (
                    <ion-icon name="pause" />
                  )}
              </ion-button>
              <ion-button
                color="primary"
                onClick={() => this.fastForward5Sec()}
              >
                {" "}
                <ion-icon name="fastforward" />{" "}
              </ion-button>
            </div>
            {/*<div class="volume-controls">
            <ion-button color="primary" onClick={() => this.downVolume()}>
              {" "}
              <ion-icon name="volume-down" />{" "}
            </ion-button>
            <ion-button color="primary" onClick={() => this.muteVolume()}>
              {" "}
              <ion-icon name="volume-off" />{" "}
            </ion-button>
            <ion-button color="primary" onClick={() => this.upVolume()}>
              {" "}
              <ion-icon name="volume-up" />{" "}
            </ion-button>
          </div>*/}
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}
