import Recorder from "./record";
import Timer from "./timer";
import Row from "./row";


let recButton = document.querySelector(".recButton")! as HTMLButtonElement;
let timer = new Timer();


async function run() {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };

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
        let row = new Row();
        row.initialize();
        row.generateChild();
        timer.stop();
      }
    });

  } else {
    console.error("getUserMedia not supported on your browser!");
  }
}

run();