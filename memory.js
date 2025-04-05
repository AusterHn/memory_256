"use strict";
var canvas = document.getElementById("memoire");
var ctx = canvas.getContext("2d");
var champPos = document.getElementById("pos");
var champData = document.getElementById("data");
var champCtrl = document.getElementById("ctrl");
var boutonGo = document.getElementById("go");
//fonction pour dessiner une mémoire ainsi les buffers (adresse, donnée et controle)
//chaque case de la mémoire est d'abord initialiser à 0x00
//le buffer d'adresses est initialisé NaN 
//le buffer de données est initialisé NaN
//le buffer de controle est initialisé à NaN
function drawMemory() {
    for (var i = 0; i < 256; i += 8) {
        ctx.font = "15px calibri";
        ctx.strokeText("0x" + (i.toString(16).toUpperCase()), 15, 20 + (i / 8) * (460 / 31));
    }
    ctx.strokeRect(50, 7, 440, 480);
    ctx.beginPath();
    ctx.moveTo(140, 487);
    ctx.lineTo(140, 567);
    ctx.stroke();
    ctx.strokeRect(115, 567, 50, 25);
    ctx.fillText(NaN.toString(), 126, 582);
    ctx.strokeText("Buffer d'adresses", 85, 607);
    ctx.beginPath();
    ctx.moveTo(270, 487);
    ctx.lineTo(270, 567);
    ctx.stroke();
    ctx.strokeRect(245, 567, 50, 25);
    ctx.fillText(NaN.toString(), 256, 582);
    ctx.strokeText("Buffer de données", 215, 607);
    ctx.beginPath();
    ctx.moveTo(400, 487);
    ctx.lineTo(400, 567);
    ctx.stroke();
    ctx.strokeRect(375, 567, 50, 25);
    ctx.fillText(NaN.toString(), 386, 582);
    ctx.strokeText("Buffer de contrôle", 345, 607);
    for (var i = 0; i < 32; ++i) {
        for (var j = 0; j < 8; ++j) {
            ctx.font = "15px calibri";
            ctx.strokeText("0x00", 60 + j * (440 / 8), 20 + i * (460 / 31));
        }
    }
}
drawMemory();
function start() {
    ctx.clearRect(115, 567, 50, 25);
    ctx.clearRect(245, 567, 50, 25);
    ctx.clearRect(375, 567, 50, 25);
    //Remplissage du buffer d'addresse
    //Les adresses commencent à 0 dans la mémoire 
    //Donc pour avoir la bonne adressse, il faudra soustraire 1 de la postion renseignée
    ctx.fillText("0x" + (parseInt(champPos.value) - 1).toString(16).toUpperCase(), 126, 582);
    //Remplissage du buffer de données
    ctx.fillText("0x" + parseInt(champData.value).toString(16).toUpperCase(), 256, 582);
    //Remplissage du buffer de contrôle
    ctx.fillText("0x" + parseInt(champCtrl.value).toString(16).toUpperCase(), 386, 582);
    //si la valeur de l'instruction de contrôle est 1, reset de la mémoire
    if (parseInt(champCtrl.value) == 1) {
        //nettoyage de tout le canva pour le redessiner
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMemory();
    }
    //sinon si la valeur de l'instruction de contrôle est 0, on écrit la donnée à la bonne position dans la mémoire
    else {
        var step = 1; //compteur de pas pour atteindre la position où la donnée doit être insérer
        for (var i = 1; i <= 32; ++i) {
            for (var j = 1; j <= 8; ++j) {
                if (step == parseInt(champPos.value)) {
                    ctx.clearRect((60 + (j - 1) * (440 / 8)), (20 + (i - 1) * (460 / 31)) - 9, 40, 10);
                    ctx.strokeText("0x" + parseInt(champData.value).toString(16).toUpperCase(), 60 + (j - 1) * (440 / 8), 20 + (i - 1) * (460 / 31));
                }
                step++;
            }
        }
    }
}
boutonGo.addEventListener("click", start);
