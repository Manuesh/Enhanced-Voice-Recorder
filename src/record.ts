export default class Recorder {

    recorder: MediaRecorder

    constructor(mediaRecorder: MediaRecorder) {
        this.recorder = mediaRecorder
    }

    start() {
        this.recorder.start();
    }

    pause() {
        this.recorder.pause();
    }

    resume() {
        this.recorder.resume();
    }

    stop(): Promise<{
        data: Blob,
        toUrl: () => string 
    }> {
        return new Promise(resolve => {
            this.recorder.addEventListener('dataavailable', function (e) {
                resolve({
                    data: e.data,
                    toUrl: () => {
                        return URL.createObjectURL(e.data);
                    }
                })
            }, { once: true })
            this.recorder.stop()
        })
    }

    async download(filename: string) {
        const a = document.createElement('a')
        a.href = filename
        a.download = "test"
        a.click()
        window.URL.revokeObjectURL(filename)
    }
}

