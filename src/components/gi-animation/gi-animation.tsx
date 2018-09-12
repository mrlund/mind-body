import { Component, State, Prop, Method, Element } from "@stencil/core";

declare var createjs;
declare var lib;
declare var AdobeAn;

@Component({
  tag: "gi-animation",
  styleUrl: "gi-animation.scss"
})

export class AppAnimation {
  @Prop() src: string;
  @Prop() composition: string;
  @Prop() initialClassMode: boolean;
  @State() classMode: boolean;
  @State() paused: boolean = true;
  @State() sizeOfCanvas: any;
  @State() sizeofProgressBar: any;
  @State() dataLoaded: boolean = false;
  @State() currentProgressWidth: any = 0;
  @Element() el: HTMLElement;
  canvas: any;
  anim_container: any;
  comp: any;
  exportRoot: any;
  timeline: any;
  stage: any;
  sound: any;
  firstFramePath: string = "";

  @State() isBusy: boolean = false;
  animationVideoProgress: string = "0";
  library: any;
  loader: any;

  componentWillLoad() {
    // if (!this.isScriptLoaded(this.src)) {
    this.classMode = this.initialClassMode;
    const script = document.createElement("script");
    this.firstFramePath = this.src.replace(".js", ".png");
    script.src = this.src;
    //script.async = true;
    document.body.appendChild(script);

    this.rergisterSoundControls();
    // }
    // else {
    //   console.log("script loaded", this.src);
    // }
  }

  isScriptLoaded(url) {
    var scripts = document.getElementsByTagName('script');
    console.log(scripts);
    for (var i = scripts.length; i--;) {

      if (scripts[i].getAttribute('src') == url) return true;
    }
    return false;
  }

  rergisterSoundControls() {
    window["playSound"] = (id, loop) => {
      console.log("window", id, loop)
      if (this.sound) {
        this.sound.stop();
      }
      this.sound = createjs.Sound.play(id, { interrupt: createjs.Sound.INTERRUPT_EARLY, loop: loop, volume: 1 });
      return this.sound;
    };
  }


  startLoading() {
    this.isBusy = true;
    this.paused = false;
  }

  doneLoading() {
    this.isBusy = false;
    this.dataLoaded = true;
    this.paused = false;
  }

  handleFileLoad(evt) {
    var images = this.comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
  }

  handleQueueProgress(that) {
    return (progress) => {
      this.animationVideoProgress = progress.loaded
        ? (progress.loaded * 100).toFixed(0)
        : "0";
      if (progress.loaded == 1) {
        this.doneLoading();
      }
    };
  }

  handleComplete(evt) {
    var ss = this.comp.getSpriteSheet();
    var queue = evt.target;
    //var lib = this.comp.getLibrary();
    var ssMetadata = this.library.ssMetadata;
    for (var i = 0; i < ssMetadata.length; i++) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    var jsFileName = this.src.substring(this.src.lastIndexOf('/') + 1, this.src.lastIndexOf('.'))
    this.exportRoot = new this.library[jsFileName];
    this.stage = new this.library.Stage(this.canvas);

    this.makeResponsive(true, 'both', false, 1);
    AdobeAn.compositionLoaded(this.library.properties.id);

    this.stage.addChild(this.exportRoot);
    createjs.Ticker.framerate = this.library.properties.fps;
    createjs.Ticker.paused = false;
    createjs.Ticker.addEventListener("tick", this.stage);
    createjs.Ticker.addEventListener("tick", (evt) => { this.tickHandler(evt) });

    console.log('handlecomplte');
    console.log(createjs.Ticker);
  }


  loadAnimation() {
    this.startLoading();
    if (!createjs.Sound.initializeDefaultPlugins()) {
      return;
    }

    this.canvas = this.el.querySelector(".video-canvas");
    this.anim_container = this.el.querySelector(".canvas-container");
    this.comp = AdobeAn.getComposition(this.composition);
    console.log(this.comp);
    this.canvas.style.width = "100%";
    this.canvas.style.height = this.canvas.offsetWidth + "px";
    this.anim_container.style.height = this.canvas.offsetWidth + "px";
    this.library = this.comp.getLibrary();


    this.loader = new createjs.LoadQueue(false);
    this.loader.installPlugin(createjs.Sound);
    this.loader.addEventListener("complete", (evt) => { this.handleComplete(evt); });
    this.loader.addEventListener("fileload", (evt) => { this.handleFileLoad(evt) });
    this.loader.addEventListener("progress", this.handleQueueProgress(this));
    //TODO :can't figure out https://github.com/CreateJS/SoundJS/issues/283
    this.loader.loadManifest(
      this.library.properties.manifest,
      true,
      this.src.substring(0, this.src.lastIndexOf("/") + 1)
    );
  }

  playButtonAction() {
    if (!this.dataLoaded) {
      this.loadAnimation();
    } else {
      this.playPauseAnimation();
    }
  }

  playPauseAnimation() {
    let newState = !createjs.Ticker.paused;
    if (newState) {
      this.pauseAnimation();
    }
    else {
      this.playAnimation();
    }
  }
  @Method()
  playAnimation() {
    console.log('play');
    if (this.loader != null) {
      this.loader.close();
    }
    if (createjs && createjs.Ticker) {
      let newState = false;
      let st = this.sound;
      if (st) {
        st.paused = newState;
      }
      createjs.Ticker.paused = newState;
      createjs.Ticker.addEventListener("tick", this.stage);
      this.paused = newState;
    }
  }
  @Method()
  pauseAnimation() {
    console.log('pause');
    if (this.loader != null) {
      this.loader.close();
    }
    if (createjs && createjs.Ticker) {
      let newState = true;
      let st = this.sound;
      if (st) {
        st.paused = newState;
      }
      createjs.Ticker.paused = newState;
      createjs.Ticker.removeEventListener("tick", this.stage);
      this.paused = newState;
    }
  }

  componentDidUnload() {
    this.pauseAnimation();
    // if (this.stage && this.stage.children) {
    //   let stage = this.stage.children[0];
    //   let timeline = stage["timeline"];
    //   this.stage.clear();
    //   stage.removeAllChildren()
    //   stage.removeAllEventListeners()
    //   stage.canvas = null
    //   stage._eventListeners = null;
    // }
  }
  @Method()
  classRoomModeChanged(val) {
    this.classMode = val;
  }

  @Method()
  destroyAnimation() {
    this.pauseAnimation();
    // if (this.stage && this.stage.children) {
    //   let stage = this.stage.children[0];
    //   let timeline = stage["timeline"];
    //   this.stage.clear();
    //   stage.removeAllChildren();
    //   stage.removeAllEventListeners();
    //   stage.canvas = null
    //   stage._eventListeners = null;
    // }
  }

  makeResponsive(isResp, respDim, isScale, scaleType) {
    window.addEventListener('resize', () => this.resizeCanvas(isResp, respDim, isScale, scaleType));
    this.resizeCanvas(isResp, respDim, isScale, scaleType);

  }

  resizeCanvas(isResp, respDim, isScale, scaleType) {
    //var lib = this.comp.getLibrary();
    var lastW, lastH, lastS = 1;
    var w = this.library.properties.width, h = this.library.properties.height;
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

    var anim_container = this.el.querySelector(".canvas-container") as HTMLElement;
    // this.canvas.width = w * pRatio * sRatio;
    // this.canvas.height = h * pRatio * sRatio;
    // this.canvas.style.width = this.dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
    // this.canvas.style.height = anim_container.style.height = this.dom_overlay_container.style.height = h * sRatio + 'px';

    this.canvas.width = w * pRatio * sRatio;
    this.canvas.height = h * pRatio * sRatio;
    this.canvas.style.width = "100%";
    this.canvas.style.height = this.canvas.offsetWidth + "px";
    anim_container.style.height = this.canvas.offsetWidth + "px";

    this.stage.scaleX = pRatio * sRatio;
    this.stage.scaleY = pRatio * sRatio;
    lastW = iw; lastH = ih; lastS = sRatio;
    var newWidth = this.canvas.offsetWidth;
    this.sizeOfCanvas = newWidth;
    var progressBar = this.el.querySelector(".progressBar") as HTMLElement
    this.sizeofProgressBar = progressBar.offsetWidth;
    this.stage.tickOnUpdate = false;
    this.stage.update();
    this.stage.tickOnUpdate = true;
  }

  tickHandler(event) {
    // console.log("event", event);
    // console.log("paused", event.paused);
    if (!event.paused) {
      let stage = this.stage.children[0];
      this.timeline = stage["timeline"];
      if (this.timeline.position % 10 == 0) {
        this.currentProgressWidth = parseFloat(
          (this.timeline.position /
            this.timeline.duration *
            this.sizeofProgressBar).toFixed(0)
        );
      }
    }
  }

  rewindAnimationTo(newPosition) {
    let st = this.sound;
    if (st) {
      st.paused = true;
    }

    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    if (newPosition < 0) {
      newPosition = 0;
    }

    if (newPosition > timeline.duration) {
      newPosition = timeline.duration - 10;
    }

    //this.sound.setPosition(soundPosition);
    //this.sound.position = soundPosition;
    if (this.paused) {
      stage.gotoAndStop(newPosition);
      this.stage.update();
      if (st && !st.getPaused()) {
        //st.paused = true;
        createjs.Ticker.paused = true;
      }
    } else {
      stage.gotoAndPlay(newPosition);
      //st.paused = false;
      createjs.Ticker.paused = false;
    }
  }

  rewindAnimation(event) {
    event.stopPropagation();
    let stage = this.stage.children[0];
    let timeline = stage["timeline"];
    let newPosition = Math.round(
      event.offsetX / this.sizeofProgressBar * timeline.duration
    );
    // var soundPosition = this.sound.position + 5000;
    // console.log("video", newPosition / 1000);
    // console.log("sound", soundPosition / 1000);
    this.rewindAnimationTo(newPosition);
  }

  rewind5Sec() {
    let fps = this.library.properties.fps;
    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    let newPosition = timeline.position - fps * 5;
    //var soundPosition = this.sound.position - 5000;
    this.rewindAnimationTo(newPosition);
  }

  fastForward5Sec() {
    let fps = this.library.properties.fps;
    let stage = this.stage.children[0];
    let timeline = stage["timeline"];

    let newPosition = timeline.position + fps * 5;
    // var soundPosition = this.sound.position + 5000;
    this.rewindAnimationTo(newPosition);
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
          {!this.classMode ? (
            <div><canvas
              class="video-canvas"
              onClick={() => this.playButtonAction()}
            />
            </div>
          ) : (
              ""
            )}
          {!this.dataLoaded ? (
            <img class="frame-img" src={this.firstFramePath} />
          ) : (
              ""
            )}
          {this.classMode ? (
            <img
              class="overlay-img"
              src="/assets/img/play-button-disabled-overlay.png"
            />
          ) : (
              ""
            )}
          {!this.classMode && this.paused ? (
            <img
              class="overlay-img"
              onClick={() => this.playButtonAction()}
              src="/assets/img/play-button-overlay.png"
            />
          ) : (
              ""
            )}
          {this.isBusy ? (
            <div class="loading-container">
              <div class="uil-ring-css">
                <div />
                <a>Loading {this.animationVideoProgress}%</a>
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
              onClick={(ev) => this.rewindAnimation(ev)}
            >
              <div
                class="currentProgress"
                style={{ width: this.currentProgressWidth + "px" }}
              />
            </div>
            <div class="button-panel">
              <ion-button size="small" color="transperant" onClick={() => this.rewind5Sec()}>
                {" "}
                <ion-icon src="/assets/img/rewind.svg"></ion-icon>
                {" "}
              </ion-button>

              <ion-button size="small"
                color="transperant"
                onClick={() => this.playButtonAction()}
              >
                {" "}
                {this.paused ? (
                  <ion-icon name="pause"></ion-icon>
                ) : (
                    <ion-icon src="/assets/img/play-symbol.svg"></ion-icon>
                  )}
              </ion-button>
              <ion-button size="small"
                color="transperant"
                onClick={() => this.fastForward5Sec()}
              >
                {" "}
                <ion-icon src="/assets/img/forward.svg"></ion-icon>
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
