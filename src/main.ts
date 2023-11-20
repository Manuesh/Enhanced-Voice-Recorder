import Recorder from "./record";
import Timer from "./timer";
import Row from "./row";
import { writeBinaryFile, BaseDirectory, writeFile, FsBinaryFileOption } from "@tauri-apps/api/fs";


let recButton = document.querySelector(".recButton")! as HTMLButtonElement;
let timer = new Timer();



async function run() {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };

    /*
    let row = new Row();

    row.initialize();       // Maybe I'll move this function call somewhere else
    row.generateChild();
    */

    const userMedia = await navigator.mediaDevices.getUserMedia(constraints);
    recButton.disabled = false;

    const mediaRecorder = new MediaRecorder(userMedia);
    const recorder = new Recorder(mediaRecorder);
    
    // Recorder handler
    recButton.addEventListener("click", async () => {
      if (mediaRecorder.state.match("inactive")) {
        recorder.start();
        timer.start();
      } else if (mediaRecorder.state.match("recording")) {
        const blob = await recorder.stop();
        let row = new Row(blob.data);
        row.initialize();
        row.generateChild();
        timer.stop();
      }
    });

    // Implement a way to save audio files in file system and get them to play

  } else {
    console.error("getUserMedia not supported on your browser!");
  }
}

run();