import "./App.scss";
import MicRecorder from "mic-recorder-to-mp3";
import React from "react";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text">
          {" "}
          Phase 1: Once the button below is clicked, it will gather your video
          and audio. It will output an mp3 video and a mp4 video that is 30
          seconds long.
        </h1>
        <button className="btn customButton">Click here to gather</button>
      </header>
    </div>
  );
}

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class recordAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBLocked: false,
    };
  }

  start = () => {
    if (this.state.isBLocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop().getMp3()
    .then(([buffer, blob]) =>  {
      const blobURL = URL.createObjectURL(blob)
      this.state({blobURL, isRecording: false});
    }).catch((e) => console.log(e));
  };

  

}

export default App;
