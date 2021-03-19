import "./App.scss";
import MicRecorder from "mic-recorder-to-mp3";
import React, {useState} from "react";

function Video() {
  const [videoRecording, isVideoRecording] =
}

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudioRecording: false,
      blobAudioURL: "",
      isAudioBlocked: false,
    };
  }

  startAudio = () => {
    if (this.state.isAudioBlocked) {
      console.log("Permission Audio Denied");
    } else {
      Mp3Recorder.startAudio()
        .then(() => {
          this.setState({ isAudioRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stopAudio = () => {
    Mp3Recorder.stopAudio()
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
            Phase 1: Once the button below is clicked, it will gather your video
            and audio. It will output an mp3 video and a mp4 video that is 30
            seconds long.
          </h1>
          <button
            className="btnAudioVideo customButton"
            onClick={this.startAudio}
            disabled={this.state.isAudioRecording}
          >
            Click here to gather audio
          </button>
          <button
            className="btnAudioVideo customButton"
            onClick={this.stopAudio}
            disabled={!this.state.isAudioRecording}
          >
            Click here to stop gathering audio
          </button>

          <audio src={this.state.blobAudioURL} controls="controls" />

          <div className="app__container">
				<video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
					className="app__videoFeed"
				></video>
        </div>

          <button
            className="btnAudioVideo customButton"
            onClick={this.startVideo}
            disabled={this.state.isAudioRecording}
          >
            Click here to gather video
          </button>
          <button
            className="btnAudioVideo customButton"
            onClick={this.startVideo}
            disabled={this.state.isAudioRecording}
          >
            Click here to stop gathering video
          </button>
        </header>
      </div>
    );
  }
}