import { dataHandler } from "./dataHandler";

export default class Recorder {

    recorder: MediaRecorder;

    constructor(mediaRecorder: MediaRecorder) {
        this.recorder = mediaRecorder;
    }

    start() {
        this.recorder.start();
        dataHandler.startSavingData(this.recorder);
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

}