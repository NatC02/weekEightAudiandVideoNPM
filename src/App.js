import "./App.scss";
import MicRecorder from "mic-recorder-to-mp3";
import React, {
  createElement /*, { useState } commented out hook */,
} from "react";

/* implementing the reacts hook using react hooks documentation

I was trying to implement it :/

function App() {
  const [videoRecording, setVideoRecording] = useState(false);

  const HEIGHT = 500;
  const WIDTH = 500;

  const startVideo = () => {
    setVideoRecording(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setVideoRecording(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  */

//below is the old way of doing react

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAudioRecording: false,
      blobAudioURL: "",
      isAudioBlocked: false,
      isAudioToggleOn: true,
      isVideoRecording: false,
      blobVideoURl: "",
      isVideoblocked: false,
    };

    this.handleClick = this.handleClick.bind(this);
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

  //Toggle audio text message

  handleClick() {
    this.setState((state) => ({
      isAudioToggleOn: !state.isAudioToggleOn,
    }));
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

          {/* Commented out because I was trying to combine react class component with react hooks
          <div>
            <video
              height={HEIGHT}
              width={WIDTH}
              muted
              autoPlay
              className="app__videoFeed"
            >
              Your video!
            </video>
          </div>
          <div>
            {videoRecording ? (
              <button
                className="btnAudioVideo customButton"
                onClick={startVideo}
              >
                Click here to gather video
              </button>
            ) : (
              <button
                className="btnAudioVideo customButton"
                onClick={stopVideo}
              >
                Click here to stop gathering video
              </button>
            )}
          </div> 
            */}
        </header>
      </div>
    );
  }
}

export default App;
