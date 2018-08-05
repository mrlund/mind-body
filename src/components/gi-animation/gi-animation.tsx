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
  @Prop() animation: string;
  @Prop() project: string;
  @Prop() session: string;
  @Prop() chapter: string;
  @Prop() imgext: string;
  @Prop() isClassroomModeOn: boolean = false;
  // @Prop({ connect: "ion-toast-controller" })
  // toastCtrl: ToastController;
  @State() paused: boolean = true;
  @State() sizeOfCanvas: any;
  @State() dataLoaded: boolean = false;
  @State() currentProgressWidth: any;
  canvas: any;
  anim_container: any;
  dom_overlay_container: any;
  comp: any;
  exportRoot: any;
  timeline: any;
  stage: any;
  sound: any;
  firstFramePath: string = "";
  basePath: string = "../../assets/project";
  isBusy: boolean = false;
  formattedProgress: string = "0";

  componentWillLoad() {
    const script = document.createElement("script");
    console.log(this.imgext);
    this.firstFramePath =
      this.basePath +
      this.project +
      "/session" +
      this.session +
      "/" +
      this.chapter +
      "/" +
      this.animation +
      "." +
      this.imgext;
    script.src =
      this.basePath +
      this.project +
      "/session" +
      this.session +
      "/" +
      this.chapter +
      "/" +
      this.animation +
      ".js";
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
    console.log('Component has been rendered');
  }
  loadAnimation() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
      return;
    }

    this.canvas = document.getElementById("canvas1");
    this.anim_container = document.getElementById("canvas-container");
    this.dom_overlay_container = document.getElementById("dom_overlay_container");
    this.comp = AdobeAn.getComposition("44F55725416534409D0912E1F9993575");
    console.log("comp", this.comp);
    var loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete", (evt) => { this.handleComplete(evt); });
    loader.addEventListener("fileload", (evt) => { this.handleFileLoad(evt) });
    loader.addEventListener("progress", this.handleQueueProgress(this));
    loader.loadManifest(
      lib.properties.manifest,
      true,
      this.basePath +
      this.project +
      "/session" +
      this.session +
      "/" +
      this.chapter +
      "/"
    );
  }

  doneLoading() {
    this.isBusy = false;
    this.dataLoaded = true;
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
      //console.log(progress.loaded);
      that.formattedProgress = progress.loaded
        ? (progress.loaded * 100).toFixed(0)
        : "0";

      if (progress.loaded == 1) {

        that.doneLoading();
      }
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
    console.log('start animation');
    this.stage.addChild(this.exportRoot);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  makeResponsive(isResp, respDim, isScale, scaleType) {
    console.log('make responsive');
    window.addEventListener('resize', () => this.resizeCanvas(isResp, respDim, isScale, scaleType));
    this.resizeCanvas(isResp, respDim, isScale, scaleType);

  }
  resizeCanvas(isResp, respDim, isScale, scaleType) {
    console.log('resize canvas');
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
    this.canvas.width = w * pRatio * sRatio;
    this.canvas.height = h * pRatio * sRatio;
    this.canvas.style.width = this.dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
    this.canvas.style.height = anim_container.style.height = this.dom_overlay_container.style.height = h * sRatio + 'px';
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
    console.log(document.getElementById("canvas1"));
    console.log(this.dataLoaded);
    var newWidth = document.getElementById("canvas1").offsetWidth;
    document.getElementById("canvas1").style.height = newWidth + "px";
    document.getElementById("canvas1").style.width = newWidth + "px";
    that.sizeOfCanvas = newWidth;
    if (that.stage) {
      that.stage.width = newWidth;
      that.stage.height = newWidth;
    }
  }

  tickHandler(that) {
    var newCircle = false;
    return function (event) {
      if (!that.paused && !event.paused) {
        that.stage.update();
      }
      let stage = that.stage.children[0];
      that.timeline = stage["timeline"];

      if (that.timeline.position % 10 == 0) {
        that.currentProgressWidth = parseFloat(
          (that.timeline.position /
            that.timeline.duration *
            that.sizeOfCanvas).toFixed(0)
        );

      }

      if (that.timeline.position == 0) newCircle = false;
      if (that.timeline.duration - that.timeline.position == 1 && !newCircle) {
        //to pause at the end of movie
        newCircle = true;

        createjs.Ticker.setPaused(true);
        let st = that.sound;
        if (st) {
          st.setPaused(true);
        }
      }
    };
  }

  playPauseAnimation() {
    if (createjs && createjs.Ticker) {
      let newState = !createjs.Ticker.getPaused();
      let st = this.sound;
      if (st) {
        st.setPaused(newState);
      }

      createjs.Ticker.setPaused(newState);
      this.paused = newState;
    }
    //var anim = this.stage.getChildAt(0);
    // if (createjs && createjs.Ticker) {
    //   //let newState = !createjs.Ticker.getPaused();
    //   console.log(this.stage.tickEnabled);
    //   console.log(this.stage);
    //   if (this.stage.tickEnabled) {
    //     createjs.Ticker.removeventListener("tick");
    //     console.log('enabled');
    //     this.stage.stop();
    //     let st = this.sound;
    //     if (st) {
    //       st.setPaused(true);
    //     }
    //     this.paused = true;

    //   }
    //   else {
    //     createjs.Ticker.addEventListener("tick", this.stage);
    //     console.log('else');
    //     this.stage.play();
    //     let st = this.sound;
    //     if (st) {
    //       st.setPaused(false);
    //     }
    //     this.paused = false;
    //     this.fnStartAnimation()
    //   }

    // }
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
      st.setPaused(true);
    }
    this.sound.setPosition(soundPosition);
    if (this.paused) {
     
      stage.gotoAndStop(newPosition);
      this.stage.update();
      if (st && !st.getPaused()) {
        st.setPaused(true);
      }
    } else {
     
      stage.gotoAndPlay(newPosition);
      st.setPaused(false);
    }
  }

  // showToast(message) {
  //   this.toastCtrl
  //     .create({
  //       message: message,
  //       duration: 1500
  //     })
  //     .then((toast: Toast) => {
  //       toast.present();
  //     });
  // }

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
    console.log('Component did update');
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

  @Method()
  canvasPlayAnimation() {
    if (!this.dataLoaded) {
      this.loadAnimation();
    } else {
      if (createjs && createjs.Ticker) {
        let newState = false;
        let st = this.sound;
        if (st) {
          st.setPaused(newState);
        }
        createjs.Ticker.setPaused(newState);
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
        st.setPaused(newState);
      }
      createjs.Ticker.setPaused(newState);
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
      <div>
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
