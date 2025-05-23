const canvas = <HTMLCanvasElement> document.getElementById("memoire")
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d")
const champPos = <HTMLInputElement> document.getElementById("pos")
const champData = <HTMLInputElement> document.getElementById("data")
const champCtrl = <HTMLInputElement> document.getElementById("ctrl")
const boutonGo = <HTMLButtonElement> document.getElementById("go")

if (!ctx || !champPos || !champData || !champCtrl || !boutonGo) {
    alert("Certains éléments graphiques n'ont pas été trouvés sur la page !")
}
//fonction pour dessiner une mémoire ainsi les buffers (adresse, donnée et controle)
//chaque case de la mémoire est d'abord initialiser à 0x00
//le buffer d'adresses est initialisé NaN 
//le buffer de données est initialisé NaN
//le buffer de controle est initialisé à NaN
function drawMemory() {
    for (let i = 0 ; i < 256; i+=8) {
        ctx.font = "15px calibri"
        ctx.fillText("0x"+(i.toString(16).toUpperCase()), 15, 20+(i/8)*(460/31))
    }
    ctx.strokeRect(50, 7, 440, 480)
    ctx.beginPath()
    ctx.moveTo(140, 487)
    ctx.lineTo(140, 567)
    ctx.stroke()
    ctx.strokeRect(115, 567, 50, 25)
    ctx.fillText(NaN.toString(), 126, 582)
    ctx.fillText("Buffer d'adresses",85, 607)
    ctx.beginPath()
    ctx.moveTo(270, 487)
    ctx.lineTo(270, 567)
    ctx.stroke()
    ctx.strokeRect(245, 567, 50, 25)
    ctx.fillText(NaN.toString(), 256, 582)
    ctx.fillText("Buffer de données", 215, 607)
    ctx.beginPath()
    ctx.moveTo(400, 487)
    ctx.lineTo(400, 567)
    ctx.stroke()
    ctx.strokeRect(375, 567, 50, 25)
    ctx.fillText(NaN.toString(), 386, 582)
    ctx.fillText("Buffer de contrôle", 345, 607)
    for (let i = 0; i < 32; ++i) {
        for (let j = 0; j < 8; ++j) {
            ctx.font = "15px calibri"
            ctx.fillText("0x00", 60+j*(440/8), 20+i*(460/31))
        }
    }
}
drawMemory()


function start() {
    //vérification d'erreur sur les intervalles auxquelles doivent appartenir les données saisies par l'utilisateur
    if (isNaN(parseInt(champPos.value)) || isNaN(parseInt(champData.value)) || isNaN(parseInt(champCtrl.value)) || parseInt(champPos.value) <= 0 || parseInt(champPos.value) > 256 || parseInt(champData.value) < 0 || parseInt(champData.value) > 255 || parseInt(champCtrl.value) < 0 || parseInt(champCtrl.value) > 1) {
        alert("Erreur sur les entrées utilisateur. Vérifiez les valeurs saisies !")
    }
    else{
        ctx.clearRect(115, 567, 50, 25)
        ctx.clearRect(245, 567, 50, 25)
        ctx.clearRect(375, 567, 50, 25)
        //Remplissage du buffer d'addresse
        //Les adresses commencent à 0 dans la mémoire 
        //Donc pour avoir la bonne adressse, il faudra ôter 1 de la postion renseignée
        ctx.fillText("0x"+(parseInt(champPos.value)-1).toString(16).toUpperCase(), 126, 582)
        //Remplissage du buffer de données
        ctx.fillText("0x"+parseInt(champData.value).toString(16).toUpperCase(), 256, 582)
        //Remplissage du buffer de contrôle
        ctx.fillText("0x"+parseInt(champCtrl.value).toString(16).toUpperCase(), 386, 582)
        //si la valeur de l'instruction de contrôle est 1, reset de la mémoire
        if (parseInt(champCtrl.value) == 1) {
            //nettoyage de tout le canva pour le redessiner
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawMemory()
        }
        //sinon si la valeur de l'instruction de contrôle est 0, on écrit la donnée à la bonne position dans la mémoire
        else {
            let step : number = 1 //compteur de pas pour atteindre la position où la donnée doit être insérer
            for (let i = 1; i <= 32; ++i) {
                for (let j = 1; j <= 8; ++j) {
                    if (step == parseInt(champPos.value)){
                        ctx.clearRect((60+(j-1)*(440/8)), (20+(i-1)*(460/31))-9, 40, 10)
                        ctx.fillText("0x"+parseInt(champData.value).toString(16).toUpperCase(), 60+(j-1)*(440/8), 20+(i-1)*(460/31))
                    }
                    step++
                }
            }
        }
    }

}
boutonGo.addEventListener("click", start)