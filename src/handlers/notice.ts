import getDataHandlerInstance from "./dataHandler";
const dataHandler = getDataHandlerInstance();

const button = document.querySelector(".button") as HTMLButtonElement;

button.addEventListener("click", async () => {
    localStorage.setItem("saveFolder", await dataHandler.chooseDirectory());
    window.location.href = "/index.html"
});


