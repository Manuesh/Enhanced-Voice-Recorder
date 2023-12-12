import Recorder from "./handlers/record";
import Timer from "./handlers/timer";
import Row from "./handlers/rowHandler";
import NoticeHandler from "./handlers/noticeHandler";


let recButton = document.querySelector(".recButton")! as HTMLButtonElement;
let timer = new Timer();

NoticeHandler.checkIfSaveFolderIsSet();

async function run() {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
  
    const constraints = { audio: true };
    const userMedia = await navigator.mediaDevices.getUserMedia(constraints);
    recButton.disabled = false;

    const options = { mimeType: "audio/webm;codecs=pcm" };
    const mediaRecorder = new MediaRecorder(userMedia, options);
    const recorder = new Recorder(mediaRecorder);    

    // Recorder handler
    recButton.addEventListener("click", async () => {
      if (mediaRecorder.state.match("inactive")) {
        recorder.start();
        timer.start();
      } else if (mediaRecorder.state.match("recording")) {
        recorder.stop();
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