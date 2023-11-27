import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

export default class DataHandler{

    directory: string;

    constructor(){
        this.directory = "";
    }

    async chooseDirectory(){
        this.directory = (await open({directory: true}))?.toString()!;
    }

    async startSavingData(recorder: MediaRecorder){
        this.saveData(recorder, this.directory);
    }

    // TODO: Implement a way to save data in a user-defined directory
    private async saveData(recorder: MediaRecorder, directory: string){
        const saveData = async function (e: BlobEvent) {
            const arrayBuffer = await e.data.arrayBuffer();
            await writeBinaryFile(directory+'\\audio.webm', arrayBuffer, { append: true });
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