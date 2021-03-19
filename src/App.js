import "./App.scss";
import MicRecorder from "mic-recorder-to-mp3";
import React from "react";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
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
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        //This will gather the audio and immediately play it once it is stopped

        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const player = new Audio(URL.createObjectURL(file));
        player.play();

        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text">
            {" "}
            Phase 1: Once the button below is clicked, it will gather your video
            and audio. It will output an mp3 video and a mp4 video that is 30
            seconds long.
          </h1>
          <button
            className="btnAudioVideo customButton"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Click here to gather audio
          </button>
          <button
            className="btnAudioVideo customButton"
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            Click here to stop gathering audio
          </button>

          <audio src={this.state.blobURL} controls="controls" />

          <button
            className="btnAudioVideo customButton"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Click here to gather video
          </button>
          <button
            className="btnAudioVideo customButton"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Click here to stop gathering video
          </button>
        </header>
      </div>
    );
  }
}

export default App;
