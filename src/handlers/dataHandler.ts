import { writeFile } from "@tauri-apps/plugin-fs";
import { open } from "@tauri-apps/plugin-dialog";

class DataHandler{

    directory: string;

    constructor(){
        this.directory = "";
    }

    async chooseDirectory(){
        this.directory = (await open({directory: true}))?.toString()!;
        return this.directory;
    }

    async startSavingData(recorder: MediaRecorder){
        this.saveData(recorder);
    }

    // Consider sending data to Rust and serialize it there
    private async saveData(recorder: MediaRecorder){
        const saveData = async function (e: BlobEvent) {
            const arrayBuffer = await e.data.arrayBuffer();
            const path = localStorage.getItem("saveFolder");
            const uint8Array = new Uint8Array(arrayBuffer);
            await writeFile(path!, uint8Array, { append: true });
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

export const dataHandler: DataHandler = new DataHandler();