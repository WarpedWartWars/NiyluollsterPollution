import "./style.css";
import element from "./dom";
import player, {
    load,
    save,
} from "./data";

let socket: WebSocket;

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

function genGrid(): void {
    const grid = element("grid");
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.id = `row${i}`;
        row.className = "row";
        grid.appendChild(row);
        for (let j = 0; j < 19; j++) {
            const triangle = document.createElement("img");
            triangle.src = "/src/triangle.svg";
            if (j % 2 == i % 2) {
                triangle.className = "triangle";
                triangle.id = `triangle${i}${j}`;
            } else {
                triangle.className = "antitriangle";
                triangle.id = `triangle${i}${j}`;
            }
            row.appendChild(triangle);
        }
    }
}

function joinGame(): void {
    //element("join").style.display = "none";
    element("game").style.display = "block";
    socket = new WebSocket((element("joinareaid") as HTMLInputElement).value);
    const username = (element("usernameid") as HTMLInputElement).value;

    socket.onopen = function(event) {
        console.log('Connection established');

        socket.send(JSON.stringify({player: username}));
        socket.send(JSON.stringify({message: "has joined"}));
    };

    socket.onmessage = function(event) {
        console.log('Message from server: ', event.data);
        var message = document.createElement("span");
        var daat = JSON.parse(event.data)
        message.textContent = daat["player"] + ": " + daat["message"];
        element("messagesid").appendChild(message);
    };

    socket.onclose = function(event) {
        console.log('Connection closed');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error: ', error);
    };
    
    load();
    genGrid();
}

function sendMessage() {
    var messageElement = element("messageid") as HTMLInputElement;
    socket.send(JSON.stringify({message: messageElement.value}));
    messageElement.value = "";
}


element("start").addEventListener("click", joinGame);
element("send").addEventListener("click", sendMessage);