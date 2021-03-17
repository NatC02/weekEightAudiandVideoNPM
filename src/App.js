import "./App.scss";

function App() {
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

export default App;
