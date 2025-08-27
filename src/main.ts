import "./style.css";
import element from "./dom";
import player, {
    load,
    resetGame,
    save,
    saveExport,
    saveImport,
    saveImportConfirm
} from "./data";

load();

//game loop
setInterval(() => {
    //test
}, 100);

function updateTexts(): void {

}

function updateButtons(): void {}

//UI update loop
setInterval(() => {
    updateTexts();
    updateButtons();
}, 100);


function joinGame(): void {
    const socket = new WebSocket(element("joinareaid").value);

    socket.onopen = function(event) {
        console.log('Connection established');

        socket.send('Hellodrgfdgfdgfr!');
        socket.send('Hello Server!');
    };

    socket.onmessage = function(event) {
        console.log('Message from server: ', event.data);
    };

    socket.onclose = function(event) {
        console.log('Connection closed');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error: ', error);
    };
}
element("start").addEventListener("click", joinGame);

//save loop
setInterval(save, 5000);

element("wipesave").addEventListener("click", resetGame);
element("export").addEventListener("click", saveExport);
element("import").addEventListener("click", saveImport);
element("saveimportconfirm").addEventListener("click", saveImportConfirm);