import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";

class Visualization extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   this.state = {
  //     playing: false,
  //   };
  //   this.analyser = "";
  //   this.canvas = "";
  //   this.random = Math.random;
  //   this.circles = [];
  //   this.offset = 0;

  //   this.bufferLength = 0;
  //   this.dataArray = [];
  // }

  // componentDidMount() {
  //   //setup canvas
  //   this.canvas = this.canvasRef.current;
  //   this.canvas.width = 100;
  //   this.canvas.height = 65;

  //   this.contextRef.current = this.canvas.getContext("2d");

  //   console.log(this.contextRef.current);
  //   this.togglePlay();
  // }

  // componentDidUpdate() {
  //   this.setupWebAudio();
  //   this.draw.bind(this);
  //   this.draw();
  // }

  // setupWebAudio() {
  //   let audioEle = this.props.audioRef.current;
  //   console.log(audioEle);
  //   audioEle.src = this.props.currentTrack.path;
  //   audioEle.load();

  //   //setup audio contextRef
  //   let audioCtx = new AudioContext();
  //   this.analyser = audioCtx.createAnalyser();
  //   let source = audioCtx.createMediaElementSource(audioEle);
  //   source.connect(this.analyser);
  //   this.analyser.connect(audioCtx.destination);
  //   this.analyser.fftSize = 256;
  //   this.bufferLength = this.analyser.frequencyBinCount;
  //   this.dataArray = new Uint8Array(this.bufferLength);

  //   console.log(this.bufferLength);
  //   console.log(this.dataArray);
  //   this.contextRef.current.clearRect(
  //     0,
  //     0,
  //     this.canvas.width,
  //     this.canvas.height
  //   );

  //   // this.audioRef.current.controls = true;
  //   // this.audioRef.current.loop = true;
  //   // this.audioRef.current.style.width = window.innerWidth + "px";
  //   // this.audioRef.current.play();
  // }

  // draw() {
  //   console.log("draw");
  //   requestAnimationFrame(this.draw.bind(this));
  //   this.analyser.getByteTimeDomainData(this.dataArray);

  //   //this.analyser.getByteFrequencyData(this.dataArray);
  //   this.contextRef.current.fillStyle = "rgb(0, 0, 0)";
  //   this.contextRef.current.fillRect(
  //     0,
  //     0,
  //     this.canvas.width,
  //     this.canvas.height
  //   );

  //   // let barWidth = (this.canvas.width / this.bufferLength) * 2.5;
  //   // let barHeight;
  //   // let x = 0;

  //   // for (let i = 0; i < this.bufferLength; i++) {
  //   //   barHeight = this.dataArray[i] ;
  //   //   this.contextRef.current.fillStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;
  //   //   this.contextRef.current.fillRect(
  //   //     x,
  //   //     this.canvas.height - barHeight / 2,
  //   //     barWidth,
  //   //     barHeight
  //   //   );

  //   //   x += barWidth + 1;
  //   // }

  //   this.contextRef.current.lineWidth = 5;
  //   this.contextRef.current.strokeStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;
  //   this.contextRef.current.beginPath();
  //   let sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
  //   let x = 0;

  //   for (let i = 0; i < this.bufferLength; i++) {
  //     //this.contextRef.current.beginPath();

  //     //this.contextRef.current.fillStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;

  //     let v = this.dataArray[i] / 128.0;
  //     let y = (v * this.canvas.height) / 2;

  //     this.contextRef.current.arc(
  //       // Math.random() * this.canvas.width,
  //       // Math.random() * this.canvas.height,

  //       /*
  //             // Semicircle Animation

  //             this.canvas.width / 2,
  //             this.canvas.height ,
  //             y * 1.25,
  //             Math.PI,
  //             Math.PI * 2,
  //             false
  //           */

  //       this.canvas.width / 2,
  //       this.canvas.height / 2,
  //       y * 1.25,
  //       0,
  //       Math.PI * 2,
  //       false
  //     );
  //   }

  //   x += sliceWidth;

  //   this.contextRef.current.stroke();
  // }

  // togglePlay() {
  //   this.setupWebAudio();
  //   this.draw.bind(this);
  //   this.draw();
  // }

  // getRandomColor() {
  //   return (this.random() * 255) >> 0;
  // }

  // render() {
  //   this.parentRef = React.createRef();
  //   this.canvasRef = React.createRef();
  //   this.contextRef = React.createRef();
  //   return (
  //     <div
  //       // style={{
  //       //   // background: "linear-gradient(90deg,#870000,#190A05)",
  //       //   display: "flex",
  //       //   flexDirection: "column",
  //       // }}
  //       ref={this.parentRef}
  //     >
  //       {/* <Button
  //             style={{ backgroundColor: "white" }}
  //             onClick={this.togglePlay.bind(this)}
  //           >
  //             PLAY
  //           </Button> */}
  //       {/* <audio ref={this.props.innerRef}></audio> */}
  //       <canvas ref={this.canvasRef}></canvas>
  //     </div>
  //   );
  // }

  constructor(props) {
    super(props);
    console.log(props);
    this.parentRef = React.createRef();
    this.canvasRef = React.createRef();
    this.contextRef = React.createRef();
    this.state = {
      playing: false,
    };
    this.analyser = "";
    this.canvas = "";
    this.random = Math.random;
    this.circles = [];
    this.offset = 0;
    this.bufferLength = 0;
    this.dataArray = [];
  }

  componentDidUpdate() {
    //setup canvas
    this.canvas = this.canvasRef.current;
    this.canvas.width = 100;
    this.canvas.height = 65;

    this.contextRef.current = this.canvas.getContext("2d");

    //set up audio visual
    this.setupWebAudio();
    this.draw.bind(this);
    this.draw();
  }

  setupWebAudio() {
    let audioEle = this.props.audioRef.current;
    console.log(audioEle);
    audioEle.src = this.props.currentTrack.path;
    audioEle.load();

    //setup audio contextRef
    let audioCtx = new AudioContext();
    this.analyser = audioCtx.createAnalyser();
    let source = audioCtx.createMediaElementSource(audioEle);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    console.log('CTX',audioCtx);
    console.log(this.bufferLength);
    console.log(this.dataArray);
    this.contextRef.current.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  draw() {
      requestAnimationFrame(this.draw.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);

    //this.analyser.getByteFrequencyData(this.dataArray);
    this.contextRef.current.fillStyle = "rgb(0, 0, 0)";
    this.contextRef.current.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // let barWidth = (this.canvas.width / this.bufferLength) * 2.5;
    // let barHeight;
    // let x = 0;

    // for (let i = 0; i < this.bufferLength; i++) {
    //   barHeight = this.dataArray[i] ;
    //   this.contextRef.current.fillStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;
    //   this.contextRef.current.fillRect(
    //     x,
    //     this.canvas.height - barHeight / 2,
    //     barWidth,
    //     barHeight
    //   );

    //   x += barWidth + 1;
    // }

    this.contextRef.current.lineWidth = 5;
    this.contextRef.current.strokeStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;
    this.contextRef.current.beginPath();
    let sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      //this.contextRef.current.beginPath();

      //this.contextRef.current.fillStyle = `rgb(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()})`;

      let v = this.dataArray[i] / 128.0;
      let y = (v * this.canvas.height) / 2;

      this.contextRef.current.arc(
        // Math.random() * this.canvas.width,
        // Math.random() * this.canvas.height,

        /*
              // Semicircle Animation

              this.canvas.width / 2,
              this.canvas.height ,
              y * 1.25,
              Math.PI,
              Math.PI * 2,
              false
            */

        this.canvas.width / 2,
        this.canvas.height / 2,
        y * 1.25,
        0,
        Math.PI * 2,
        false
      );
    }

    x += sliceWidth;

    this.contextRef.current.stroke();
  }

  getRandomColor() {
    return (this.random() * 255) >> 0;
  }

  render() {
    return (
      <>
        <div ref={this.parentRef}>
          <canvas ref={this.canvasRef}></canvas>
        </div>
      </>
    );
  }
}

// const AnonymousComponent = forwardRef((props, ref) => (
//   <Visualization {...props} audioRef={ref} />
// ));

// export default React.forwardRef((props, ref) => (
//   <Visualization ref={ref} {...props} />
// ));

// export default AnonymousComponent;

// const mapStateToProps = (state) => {
//   return state;
// };

// const ConnectedComponent = connect(mapStateToProps)(Visualization);

// export default ConnectedComponent;

// export default forwardRef((props, ref) => (
//   <ConnectedComponent {...props} audioRef={ref} />
// ));

const mapStateToProps = (state) => {
  return state;
};

const wrapper = React.forwardRef((props, ref) => {
  return <Visualization {...props} audioRef={ref} />;
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  wrapper
);
