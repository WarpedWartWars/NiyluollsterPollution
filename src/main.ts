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

//save loop
setInterval(save, 5000);

element("wipesave").addEventListener("click", resetGame);
element("export").addEventListener("click", saveExport);
element("import").addEventListener("click", saveImport);
element("saveimportconfirm").addEventListener("click", saveImportConfirm);