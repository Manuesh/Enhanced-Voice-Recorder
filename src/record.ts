import DataHandler from "./datahandler";

export default class Recorder {

    recorder: MediaRecorder;
    dataHandler: DataHandler;

    constructor(mediaRecorder: MediaRecorder, dataHandler: DataHandler) {
        this.recorder = mediaRecorder;
        this.dataHandler = dataHandler;
    }

    start() {
        this.recorder.start();
        this.dataHandler.startSavingData(this.recorder);
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