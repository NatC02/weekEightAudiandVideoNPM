import "./App.scss";
import MicRecorder from "mic-recorder-to-mp3";
import React, { createElement } from "react";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudioRecording: false,
      blobAudioURL: "",
      isAudioBlocked: false,
      isAudioToggleOn: true,
    };
  }

  //Starting audio

  start = () => {
    if (this.state.isAudioBlocked) {
      console.log("Permission Audio Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isAudioRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  //Stopping audio

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        //This will gather the audio and immediately play it once it is stopped

        const fileAudio = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const playerAudio = new Audio(URL.createObjectURL(fileAudio));
        playerAudio.play();

        const blobAudioURL = URL.createObjectURL(blob);
        this.setState({ blobAudioURL, isAudioRecording: false });
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Audio Granted");
        this.setState({ isAudioBlocked: false });
      },
      () => {
        console.log("Permission Audio Denied");
        this.setState({ isAudioBlocked: true });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text">
            {" "}
            Phase 1: Once the button below is clicked, it will gather your
            audio. It will output an mp3 file that is as long as you recorded.
          </h1>
          <button
            className="btnAudioVideo customButton"
            onClick={this.start}
            disabled={this.state.isAudioRecording}
          >
            Click here to gather audio
          </button>
          <button
            className="btnAudioVideo customButton"
            onClick={this.stop}
            disabled={!this.state.isAudioRecording}
          >
            Click here to stop gathering audio
          </button>

          <audio src={this.state.blobAudioURL} controls="controls" />
        </header>
      </div>
    );
  }
}

export default App;
