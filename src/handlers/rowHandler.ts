class PlayButton {
  playButtonImg: HTMLImageElement;
  playButtonElement: HTMLButtonElement;

  constructor() {
    this.playButtonImg = document.createElement("img");
    this.playButtonElement = document.createElement("button");
  }

  initialize() {
    this.playButtonImg.src = "src/resources/img/play.svg";
    this.playButtonElement.append(this.playButtonImg);
  }

  async play(/*data: Blob*/) {
    // If the user presses the "play button" the audio will play
  }
}

class PauseButton {
  pauseButtonImg: HTMLImageElement;
  pauseButtonElement: HTMLButtonElement;

  constructor() {
    this.pauseButtonImg = document.createElement("img");
    this.pauseButtonElement = document.createElement("button");
  }

  initialize() {
    this.pauseButtonImg.src = "src/resources/img/pause.svg";
    this.pauseButtonElement.append(this.pauseButtonImg);
  }

  async pause(/*data: Blob*/) {
    // If the user presses the "pause button" the audio will pause
  }
}

class StopButton {
  stopButtonImg: HTMLImageElement;
  stopButtonElement: HTMLButtonElement;

  constructor() {
    this.stopButtonImg = document.createElement("img");
    this.stopButtonElement = document.createElement("button");
  }

  initialize() {
    this.stopButtonImg.src = "src/resources/img/stop.svg";
    this.stopButtonElement.append(this.stopButtonImg);
  }

  async stop(/*data: Blob*/) {
    // If the user presses the "stop button" the audio will stop
  }
}

export default class Row {
  playButton: PlayButton;
  pauseButton: PauseButton;
  stopButton: StopButton;

  constructor() {
    this.playButton = new PlayButton();
    this.pauseButton = new PauseButton();
    this.stopButton = new StopButton();
  }

  initialize() {
    this.playButton.initialize();
    this.pauseButton.initialize();
    this.stopButton.initialize();
  }

  generateChild() {
    let row = document.createElement("div");
    row.classList.add("row");
    document.body.appendChild(row);
    const l = this.generateLeftRow();
    const r = this.generateRightRow();
    
    row.appendChild(l);
    row.appendChild(r);
  }

  generateLeftRow() {
    let inner_left_row = document.createElement("div");
    let text_row = document.createElement("div");
    let text = document.createElement("p");


    inner_left_row.classList.add("inner-left-row");
    inner_left_row.classList.add("text-row");
    text_row.classList.add("text-row");
    text.classList.add("text");

    inner_left_row.appendChild(text_row);
    text_row.appendChild(text);
    
    return inner_left_row;
  }

  generateRightRow() {
    let inner_right_row = document.createElement("div");
    let commands_row = document.createElement("div");
    let play_row = document.createElement("div");
    let stop_row = document.createElement("div");

    commands_row.classList.add("commands-row");
    commands_row.classList.add("play-row");
    play_row.classList.add("play-row");
    this.playButton.playButtonElement.classList.add("play");
    commands_row.classList.add("stop-row");
    stop_row.classList.add("stop-row");
    this.stopButton.stopButtonElement.classList.add("stop");

    inner_right_row.appendChild(commands_row);
    commands_row.appendChild(play_row);
    play_row.append(this.playButton.playButtonElement);
    commands_row.appendChild(stop_row);
    stop_row.append(this.stopButton.stopButtonElement);

    return inner_right_row;
  }

}
