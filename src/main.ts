import "./style.css";
import element from "./dom";
import player, {
    load,
    save,
} from "./data";

let socket: WebSocket;

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
}

function sendMessage() {
    var messageElement = element("messageid") as HTMLInputElement;
    socket.send(JSON.stringify({message: messageElement.value}));
    messageElement.value = "";
}


element("start").addEventListener("click", joinGame);
element("send").addEventListener("click", sendMessage);