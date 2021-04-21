import React from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Button, Grid, Slider } from "@material-ui/core";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { connect } from "react-redux";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MenuIcon from "@material-ui/icons/Menu";

import {
  PAUSE,
  PLAY,
  PLAY__SHUFFLE,
  PLAY__REPEAT__ONE,
  MUTE__AUDIO,
  OPEN__VISUALIZER,
} from "../../actions";
import CloseIcon from "@material-ui/icons/Close";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import Visualization from "./Visualization";
import { SET__AUDIO__REF } from "../../actions/types";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = null;
    this.state = {
      active: false,
      currentTime: null,
      duration: null,
      volumeSlider: 100,
      sliderVal: 0,
      visualizerSidebar: false,
    };
    this.parentRef = React.createRef();
    this.primaryCanvasRef = React.createRef();
    this.contextRef = React.createRef();
    this.secondaryCanvasRef = React.createRef();

    this.analyser = "";
    this.canvas = "";
    this.random = Math.random;
    this.circles = [];
    this.offset = 0;
    this.bufferLength = 0;
    this.dataArray = [];
  }

  componentDidMount() {
    this.audioRef.addEventListener("timeupdate", (e) => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
        sliderVal: e.target.currentTime * (100 / e.target.duration),
      });
    });
    //setup canvas
    // this.canvas = this.primaryCanvasRef.current;
    // this.canvas.width = 100;
    // this.canvas.height = 65;
    // this.contextRef.current = this.canvas.getContext("2d");
    // set up audio visual
    // this.setupWebAudio();
    // this.draw.bind(this)();
    // this.handleWave1Visualization();
    this.canvas = this.secondaryCanvasRef.current;
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = window.innerHeight - 120;
    this.contextRef.current = this.canvas.getContext("2d");
    this.setupWebAudio();
    this.handleWave1Visualization();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentTrack.repeatOne) {
      this.audioRef.loop = true;
    } else {
      this.audioRef.loop = false;
    }
    // if (this.state.active) {
    //   this.canvas = this.secondaryCanvasRef.current;
    //   this.canvas.width = window.innerWidth - 40;
    //   this.canvas.height = window.innerHeight - 120;
    //   this.contextRef.current = this.canvas.getContext("2d");
    //   this.setupWebAudio();
    //   this.handleWave1Visualization();
    // }
    // else {
    //   this.canvas = this.primaryCanvasRef.current;
    //   this.canvas.width = 100;
    //   this.canvas.height = 65;

    //   this.contextRef.current = this.canvas.getContext("2d");
    // }
  }

  setupWebAudio() {
    let audioEle = this.audioRef;
    //setup audio contextRef
    let audioCtx = new AudioContext();
    this.analyser = audioCtx.createAnalyser();
    let source = audioCtx.createMediaElementSource(audioEle);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);
    // this.analyser.fftSize = 256;
    // this.analyser.fftSize = 4096;
    // this.bufferLength = this.analyser.frequencyBinCount;
    // this.dataArray = new Uint8Array(this.bufferLength);

    // console.log("CTX", audioCtx);
    // console.log(this.bufferLength);
    // console.log(this.dataArray);
    // this.contextRef.current.clearRect(
    //   0,
    //   0,
    //   this.canvas.width,
    //   this.canvas.height
    // );
  }

  getRandomColor() {
    return (this.random() * 255) >> 0;
  }

  togglePlay() {
    this.setupWebAudio();
    // this.draw.bind(this);
    //this.draw();
    // this.handleSpiralVisualization();
    // this.setState({
    //   playing: true,
    // });
  }

  setTime(time) {
    this.audioRef.currentTime = time;
  }

  getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  showCurrentTime = () => {
    if (isNaN(this.audioRef)) {
      return this.getTime(this.state.currentTime);
    } else {
      return `0:00`;
    }
  };

  handlePlay() {
    this.props.dispatch({ type: PLAY });
    this.audioRef.play();
    this.setState({
      ...this.state,
      duration: this.audioRef.duration,
    });
  }

  handlePause() {
    this.props.dispatch({ type: PAUSE });
    this.audioRef.pause();
  }

  handleSliderChange = (event, newVal) => {
    this.audioRef.currentTime = (newVal * this.audioRef.duration) / 100;
    this.setState({
      ...this.state,
      currentTime: newVal,
    });
  };

  handleVolSliderChange = (event, newVal) => {
    console.log("slider");
    if (this.audioRef !== null) {
      this.setState({
        ...this.state,
        volumeSlider: newVal,
      });
      this.audioRef.volume = newVal / 100;
    }
  };

  handleMuteAudio = () => {
    if (!this.props.currentTrack.muteAudio) {
      console.log("mute");
      this.audioRef.muted = true;
    } else this.audioRef.muted = false;
  };

  showDuration() {
    if (this.state.duration === null) {
      return `0:00`;
    }
    return this.getTime(this.state.duration);
  }

  handleTrackSlider = () => {
    console.log("slider");
  };

  trackEnded = () => {
    if (!this.props.currentTrack.repeatOne) {
      this.setState({
        ...this.state,
        sliderVal: 0,
        currentTime: null,
      });
      this.props.dispatch({ type: PAUSE });
      this.audioRef.loop = false;
    }
  };

  handleVisualizerSidebar = () => {
    return (
      <div className="visualizer__sidebar">
        <ul className="visualizer__sidebar__list">
          <li onClick={this.handleSpiral1Visualization}>SPIRAL 1</li>
          <li onClick={this.handleSpiral2Visualization}>SPIRAL 2</li>
          <li onClick={this.handleSpiral3Visualization}>SPIRAL 3</li>
          {/* <li onClick={this.handleSpiral4Visualization}>SPIRAL 4</li> */}
          <li onClick={this.handleWave1Visualization}>WAVE 1</li>
          <li onClick={this.handleWave2Visualization}>WAVE 2</li>
        </ul>
      </div>
    );
  };

  handleSpiral1Visualization = () => {
    this.analyser.fftSize = 4096;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    let canvasWidth = window.innerWidth - 40;
    let canvasHeight = window.innerHeight - 120;
    let barWidth = canvasWidth / this.bufferLength;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      this.contextRef.current.beginPath();
      this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        this.contextRef.current.save();
        this.contextRef.current.translate(canvasWidth / 2, canvasHeight / 2);
        //rotate take value in radians
        this.contextRef.current.rotate((i * (Math.PI * 8)) / this.bufferLength);
        const hue = i * 5;
        //preset 2
        // this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        // this.contextRef.current.fillRect(
        //   0,
        //   canvasHeight - barHeight - 30,
        //   barWidth,
        //   barHeight
        // );

        // this.contextRef.current.fillStyle = `white`;
        // this.contextRef.current.fillRect(
        //   0,
        //   canvasHeight - barHeight - 70,
        //   barWidth * 2,
        //   barHeight * -1
        // );

        // preset 2
        // this.contextRef.current.fillStyle = `white`;
        // this.contextRef.current.fillRect(
        //   (i + x) / 5,
        //   canvasHeight - barHeight - 140,
        //   barWidth,
        //   barHeight * -1
        // );

        // this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        // this.contextRef.current.fillRect(
        //   (i + x) / 5,
        //   canvasHeight - barHeight - 70,
        //   barWidth,
        //   barHeight * -1
        // );

        this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        this.contextRef.current.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        this.contextRef.current.restore();
      }

      requestAnimationFrame(animate.bind(this));
    }

    animate.bind(this)();
  };

  handleSpiral2Visualization = () => {
    this.analyser.fftSize = 4096;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    let canvasWidth = window.innerWidth - 40;
    let canvasHeight = window.innerHeight - 120;
    let barWidth = canvasWidth / this.bufferLength;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      this.contextRef.current.beginPath();
      this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        this.contextRef.current.save();
        this.contextRef.current.translate(canvasWidth / 2, canvasHeight / 2);
        //rotate take value in radians
        this.contextRef.current.rotate((i * (Math.PI * 8)) / this.bufferLength);
        const hue = i * 5;
        //preset 2
        this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        this.contextRef.current.fillRect(
          0,
          canvasHeight - barHeight - 30,
          barWidth,
          barHeight
        );
        let linearGradient = this.contextRef.current.createLinearGradient(
          0,
          canvasHeight - barHeight - 70,
          barWidth * 2,
          barHeight * -1
        );

        this.contextRef.current.fillStyle = "white";
        this.contextRef.current.fillRect(
          0,
          canvasHeight - barHeight - 70,
          barWidth * 2,
          barHeight * -1
        );

        // preset 2
        // this.contextRef.current.fillStyle = `white`;
        // this.contextRef.current.fillRect(
        //   (i + x) / 5,
        //   canvasHeight - barHeight - 140,
        //   barWidth,
        //   barHeight * -1
        // );

        // this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        // this.contextRef.current.fillRect(
        //   (i + x) / 5,
        //   canvasHeight - barHeight - 70,
        //   barWidth,
        //   barHeight * -1
        // );

        this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        this.contextRef.current.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        this.contextRef.current.restore();
      }

      requestAnimationFrame(animate.bind(this));
    }

    animate.bind(this)();
  };
  handleSpiral3Visualization = () => {
    this.analyser.fftSize = 4096;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    let canvasWidth = window.innerWidth - 40;
    let canvasHeight = window.innerHeight - 120;
    let barWidth = canvasWidth / this.bufferLength;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      this.contextRef.current.beginPath();
      this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        this.contextRef.current.save();
        this.contextRef.current.translate(canvasWidth / 2, canvasHeight / 2);
        //rotate take value in radians
        this.contextRef.current.rotate((i * (Math.PI * 8)) / this.bufferLength);
        const hue = i * 5;

        this.contextRef.current.fillStyle = `white`;
        this.contextRef.current.fillRect(
          (i + x) / 5,
          canvasHeight - barHeight - 140,
          barWidth,
          barHeight * -1
        );

        this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        this.contextRef.current.fillRect(
          (i + x) / 5,
          canvasHeight - barHeight - 70,
          barWidth,
          barHeight * -1
        );

        this.contextRef.current.fillStyle = `hsl(${hue},100%,50%)`;
        this.contextRef.current.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        this.contextRef.current.restore();
      }

      requestAnimationFrame(animate.bind(this));
    }

    animate.bind(this)();
  };

  // handleSpiral4Visualization = () => {
  //   this.analyser.fftSize = 4096;
  //   this.bufferLength = this.analyser.frequencyBinCount;
  //   this.dataArray = new Uint8Array(this.bufferLength);

  //   this.contextRef.current.clearRect(
  //     0,
  //     0,
  //     this.canvas.width,
  //     this.canvas.height
  //   );

  //   let canvasWidth = window.innerWidth - 40;
  //   let canvasHeight = window.innerHeight - 120;
  //   let barWidth = canvasWidth / this.bufferLength;
  //   let barHeight;
  //   let x;

  //   function animate() {
  //     x = 0;
  //     this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
  //     this.analyser.getByteFrequencyData(this.dataArray);
  //     for (let i = 0; i < this.bufferLength; i++) {
  //       barHeight = this.dataArray[i];
  //       this.contextRef.current.save();
  //       this.contextRef.current.translate(canvasWidth / 2, canvasHeight / 2);
  //       //rotate take value in radians
  //       this.contextRef.current.rotate((i * (Math.PI * 8)) / this.bufferLength);
  //       //preset 2
  //       let linearGradient3 = this.contextRef.current.createLinearGradient(
  //         0,
  //         canvasHeight - barHeight - 30,
  //         barWidth,
  //         barHeight
  //       );
  //       linearGradient3.addColorStop(0, "#8E2DE2");
  //       linearGradient3.addColorStop("0.3", "#4A00E0");
  //       linearGradient3.addColorStop("0.5", "#0575E6");
  //       linearGradient3.addColorStop("0.6", "#021B79");
  //       linearGradient3.addColorStop("0.8", "#005C97");
  //       linearGradient3.addColorStop(1, "#363795");
  //       this.contextRef.current.fillStyle = linearGradient3;
  //       this.contextRef.current.fillRect(
  //         0,
  //         canvasHeight - barHeight - 30,
  //         barWidth,
  //         barHeight * -1
  //       );
  //       let linearGradient2 = this.contextRef.current.createLinearGradient(
  //         0,
  //         canvasHeight - barHeight - 70,
  //         barWidth * 2,
  //         barHeight * -1
  //       );
  //       linearGradient2.addColorStop(0, "#dd1818");
  //       linearGradient2.addColorStop("0.3", "#6f0000");
  //       linearGradient2.addColorStop("0.5", "#ee0979");
  //       linearGradient2.addColorStop("0.6", "#ff6a00");
  //       linearGradient2.addColorStop("0.8", "#f83600");
  //       linearGradient2.addColorStop(1, "#fe8c00");
  //       this.contextRef.current.fillStyle = linearGradient2;
  //       this.contextRef.current.fillRect(
  //         0,
  //         canvasHeight - barHeight - 70,
  //         barWidth * 2,
  //         barHeight * -1
  //       );
  //       let linearGradient1 = this.contextRef.current.createLinearGradient(
  //         0,
  //         0,
  //         barWidth,
  //         barHeight
  //       );
  //       linearGradient1.addColorStop(0, "#f12711");
  //       linearGradient1.addColorStop("0.3", "#f5af19");
  //       linearGradient1.addColorStop("0.5", "#FF416C");
  //       linearGradient1.addColorStop("0.6", "#FF4B2B");
  //       linearGradient1.addColorStop("0.8", "#ED213A");
  //       linearGradient1.addColorStop(1, "#93291E");
  //       // linearGradient2.addColorStop(1, "#FFFFFF");
  //       this.contextRef.current.fillStyle = linearGradient1;
  //       this.contextRef.current.fillRect(0, 0, barWidth, barHeight);
  //       x += barWidth;
  //       this.contextRef.current.restore();
  //     }

  //     requestAnimationFrame(animate.bind(this));
  //   }

  //   animate.bind(this)();
  // };

  handleWave1Visualization = () => {
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    let canvasWidth = window.innerWidth - 40;
    let canvasHeight = window.innerHeight - 120;

    let barWidth = canvasWidth / 2 / this.bufferLength;
    // let barWidth = this.canvas.width / 4;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      this.contextRef.current.beginPath();
      this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;

        this.contextRef.current.fillStyle = "white";
        this.contextRef.current.fillRect(
          1240 / 2 - x,
          canvasHeight - barHeight - 30,
          barWidth,
          barHeight
        );
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          1240 / 2 - x,
          canvasHeight - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;

        this.contextRef.current.fillStyle = "white";
        this.contextRef.current.fillRect(
          x,
          canvasHeight - barHeight - 30,
          barWidth,
          barHeight
        );
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          x,
          canvasHeight - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
      requestAnimationFrame(animate.bind(this));
    }

    animate.bind(this)();
  };

  handleWave2Visualization = () => {
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    let canvasWidth = window.innerWidth - 40;
    let canvasHeight = window.innerHeight - 120;

    let barWidth = canvasWidth / 2 / this.bufferLength;
    // let barWidth = this.canvas.width / 4;
    let barHeight;
    let x;

    function animate() {
      x = 0;
      this.contextRef.current.beginPath();
      this.contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          1240 / 2 - x,
          canvasHeight - barHeight + 50,
          barWidth,
          barHeight * -1
        );
        this.contextRef.current.fillStyle = "white";
        this.contextRef.current.fillRect(
          1240 / 2 - x,
          canvasHeight - barHeight - 30,
          barWidth,
          barHeight
        );
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          1240 / 2 - x,
          canvasHeight - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          x,
          canvasHeight - barHeight + 50,
          barWidth,
          barHeight * -1
        );
        this.contextRef.current.fillStyle = "white";
        this.contextRef.current.fillRect(
          x,
          canvasHeight - barHeight - 30,
          barWidth,
          barHeight
        );
        this.contextRef.current.fillStyle = `rgb(${red},${green},${blue})`;
        this.contextRef.current.fillRect(
          x,
          canvasHeight - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
      requestAnimationFrame(animate.bind(this));
    }

    animate.bind(this)();
  };

  render() {
    return (
      <>
        <div
          className="footer"
          style={{
            height: `${this.state.active ? "100vh" : ""}`,
          }}
        >
          {this.state.visualizerSidebar ? this.handleVisualizerSidebar() : ""}
          <div
            style={{
              // marginTop: "30px",
              display: `${this.state.active ? "" : "none"}`,
              height: `${this.state.active ? `calc(100% - 105px)` : "0"}`,
              width: "100%",
            }}
          >
            {/* <h1>{this.state.active ? "ACTIVE" : ""}</h1> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {this.state.visualizerSidebar ? (
                <CloseIcon
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginLeft: "230px",
                  }}
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      visualizerSidebar: !this.state.visualizerSidebar,
                    });
                  }}
                />
              ) : (
                <MenuIcon
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      visualizerSidebar: !this.state.visualizerSidebar,
                    });
                  }}
                />
              )}
              <CloseIcon
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    active: !this.state.active,
                    visualizerSidebar: !this.state.visualizerSidebar,
                  });
                }}
              />
            </div>
            <canvas
              style={{
                cursor: "pointer",
                backgroundColor: "black",
              }}
              ref={this.secondaryCanvasRef}
            ></canvas>
          </div>
          <div className="footer__content">
            <div className="footer__left" style={{ cursor: "pointer" }}>
              <img
                className="footer__albumLogo"
                src={this.props.currentTrack.image}
                alt="Album Logo"
              />
              <div className="footer__songInfo">
                {this.props.currentTrack.name === "" ? (
                  <>
                    <h4>No song is playing</h4>
                    <p>...</p>
                  </>
                ) : (
                  <>
                    <h4>{this.props.currentTrack.name}</h4>
                    <p>{this.props.currentTrack.singer}</p>
                  </>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                this.setState({
                  ...this.state,
                  active: !this.state.active,
                });
                this.props.dispatch({ type: OPEN__VISUALIZER });
              }}
              className="visualizer"
            >
              <h5>VISUALIZER</h5>
            </div>
            <div className="footer__center">
              <div>
                <p style={{ marginRight: "1rem" }}>{this.showCurrentTime()}</p>
                <Slider
                  value={this.state.sliderVal}
                  onChange={this.handleSliderChange.bind(this)}
                />
                {this.handleTrackSlider()}
                <p style={{ marginLeft: "1rem" }}>
                  {/* {this.props.currentTrack.duration} */}
                  {this.showDuration()}
                </p>
              </div>
              <div>
                <ShuffleIcon
                  onClick={() => this.props.dispatch({ type: PLAY__SHUFFLE })}
                  className={
                    this.props.currentTrack.shuffle
                      ? "footer__green"
                      : "footer__icon"
                  }
                />
                <SkipPreviousIcon className="footer__icon" />
                {this.props.currentTrack.isPlaying ? (
                  <PauseCircleOutlineIcon
                    fontSize="large"
                    className="footer__icon"
                    onClick={this.handlePause.bind(this)}
                  />
                ) : (
                  <PlayCircleOutlineIcon
                    onClick={this.handlePlay.bind(this)}
                    fontSize="large"
                    className="footer__icon"
                  />
                )}
                <SkipNextIcon className="footer__icon" />
                {this.props.currentTrack.repeatOne ? (
                  <RepeatOneIcon
                    onClick={() =>
                      this.props.dispatch({ type: PLAY__REPEAT__ONE })
                    }
                    className="footer__green"
                  />
                ) : (
                  <RepeatIcon
                    onClick={() =>
                      this.props.dispatch({ type: PLAY__REPEAT__ONE })
                    }
                    className="footer__icon"
                  />
                )}
              </div>
            </div>
            <div className="footer__right">
              <Grid container spacing={2}>
                <Grid item>
                  {this.props.currentTrack.muteAudio ? (
                    <VolumeMuteIcon
                      className="footer__icon"
                      onClick={() => {
                        this.handleMuteAudio();
                        this.props.dispatch({ type: MUTE__AUDIO });
                      }}
                    />
                  ) : this.state.volumeSlider > 80 ? (
                    <VolumeUpIcon
                      className="footer__icon"
                      onClick={() => {
                        this.handleMuteAudio();
                        this.props.dispatch({ type: MUTE__AUDIO });
                      }}
                    />
                  ) : (
                    <VolumeDownIcon
                      className="footer__icon"
                      onClick={() => {
                        this.handleMuteAudio();
                        this.props.dispatch({ type: MUTE__AUDIO });
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={5}>
                  <Slider
                    value={this.state.volumeSlider}
                    onChange={this.handleVolSliderChange.bind(this)}
                  />
                </Grid>
              </Grid>
            </div>
            <audio
              ref={(ref) => (this.audioRef = ref)}
              onEnded={this.trackEnded}
            >
              <source src={this.props.currentTrack.path}></source>
            </audio>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Footer);
