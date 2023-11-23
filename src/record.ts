import { writeBinaryFile, BaseDirectory } from "@tauri-apps/api/fs";

export default class Recorder {

    recorder: MediaRecorder

    constructor(mediaRecorder: MediaRecorder) {
        this.recorder = mediaRecorder;
    }

    start() {
        this.recorder.start();
        this.dataHandler();
    }

    pause() {
        this.recorder.pause();
    }

    resume() {
        this.recorder.resume();
    }

    stop() {
        this.recorder.stop();
    }

    // TODO: Implement a way to save data in a user-defined directory
    dataHandler(){
        let chunks: Blob[] = [];
        this.recorder.addEventListener('dataavailable', async function (e) {
          chunks.push(e.data);
          const arrayBuffer = await e.data.arrayBuffer();
          await writeBinaryFile('audio.webm', arrayBuffer, { dir: BaseDirectory.Desktop, append: true });
          chunks = [];
        });

        let interval = setInterval(() => {
            if(this.recorder.state.match("inactive")) clearInterval(interval);
            this.recorder.requestData();
        }, 1000); 
    }

}