import getDataHandlerInstance from "./dataHandler";

class InnerNoticeHandler{

    constructor(){
        this.createNotice();
    }

    private createNotice(){
        let recDiv = document.querySelector(".registrazione") as HTMLDivElement;
        recDiv.classList.add("registrazione-blur");

        let link = document.createElement('link') as HTMLLinkElement;
        link.classList.add("link");
        link.rel = 'stylesheet';
        link.href = '/src/styles/notice-style.css';

        document.body.appendChild(link);

        let temporaryDiv = document.createElement("div");
        let notice = document.createElement("div");
        
        temporaryDiv.classList.add("temporary-div");

        const up = this.generateUpperRow();
        const down = this.generateLowerRow();

        notice.classList.add("notice");
        notice.classList.add("upper-row");
        notice.classList.add("lower-row");

        document.body.appendChild(temporaryDiv);
        temporaryDiv.appendChild(notice);
        notice.appendChild(up);
        notice.appendChild(down);


        notice.style.display = "flex";
    }

    private generateUpperRow(){
        let upperRow = document.createElement("div");
        let innerUpperRowDiv = document.createElement("div");
        let noticeImageDiv = document.createElement("div");
        let noticeTextDiv = document.createElement("div");
        let img = document.createElement("img");
        let text = document.createElement("text");

        upperRow.classList.add("upper-row");
        upperRow.classList.add("inner-upper-row-div");

        innerUpperRowDiv.classList.add("inner-upper-row-div");
        innerUpperRowDiv.classList.add("notice-image-div");
        innerUpperRowDiv.classList.add("notice-text-div");

        noticeImageDiv.classList.add("notice-image-div");
        noticeImageDiv.classList.add("img");

        noticeTextDiv.classList.add("notice-text-div");
        noticeTextDiv.classList.add("text");

        img.classList.add("img");
        
        text.classList.add("text");

        upperRow.appendChild(innerUpperRowDiv);
        innerUpperRowDiv.appendChild(noticeImageDiv);
        innerUpperRowDiv.appendChild(noticeTextDiv);
        noticeImageDiv.appendChild(img);
        noticeTextDiv.appendChild(text);

        img.src = "/src/resources/img/save.svg";
        
        text.innerText = "You haven't set a save folder yet.\nPlease click the button below to set one."

        return upperRow;
    }

    private generateLowerRow() {
        let lowerRow = document.createElement("div");
        let noticeButtonDiv = document.createElement("div");
        let button = document.createElement("ok-button");

        lowerRow.classList.add("lower-row");
        lowerRow.classList.add("notice-button-div");

        noticeButtonDiv.classList.add("notice-button-div");
        noticeButtonDiv.classList.add("ok-button");

        button.classList.add("button");
        
        button.addEventListener("click", async () => {
            let path = await this.selectSaveFolder();
            if (path !== "undefined") this.clearNotice();
        });

        lowerRow.appendChild(noticeButtonDiv);
        noticeButtonDiv.appendChild(button);

        button.innerText = "OK";

        return lowerRow;
    }

    async selectSaveFolder() {
        localStorage.setItem("saveFolder", await getDataHandlerInstance().chooseDirectory());
        return localStorage.getItem("saveFolder");
    }

    clearNotice(){
        let recordingDiv = document.querySelector(".registrazione") as HTMLDivElement;
        recordingDiv.classList.remove("registrazione-blur");
    
        setTimeout(() => {
            document.body.removeChild(document.querySelector(".link") as HTMLLinkElement);
        }, 500);

        document.body.removeChild(document.querySelector(".temporary-div") as HTMLDivElement);
    }

}

export default class NoticeHandler{

    static checkIfSaveFolderIsSet(): Promise<{
        getPath: () => string,
        isFolderAdded: boolean
    }> {
        localStorage.removeItem("saveFolder");
        return new Promise((resolve) => {
            if(localStorage.getItem("saveFolder") === null){
                resolve({
                    getPath: () => "",
                    isFolderAdded: false
                })
                return new InnerNoticeHandler();
            } else resolve({
                getPath: () => localStorage.getItem("saveFolder")!,
                isFolderAdded: true
            });
        });
    }

}
