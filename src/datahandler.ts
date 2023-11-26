import { writeBinaryFile, BaseDirectory } from "@tauri-apps/api/fs";

export default class DataHandler{

    startSavingData(recorder: MediaRecorder){
        this.saveData(recorder);
    }

    // TODO: Implement a way to save data in a user-defined directory
    private saveData(recorder: MediaRecorder){
        const saveData = async function (e: BlobEvent) {
            const arrayBuffer = await e.data.arrayBuffer();
            await writeBinaryFile('audio.webm', arrayBuffer, { dir: BaseDirectory.Desktop, append: true });
        }

        recorder.addEventListener("dataavailable", saveData);

        recorder.addEventListener("stop", () => {
            recorder.removeEventListener("dataavailable", saveData);
        }, {once: true});
        

        let interval = setInterval(() => {
            if(recorder.state.match("inactive")) clearInterval(interval);
            else if (recorder.state.match("recording")) recorder.requestData();
        }, 1000); 
    }


}