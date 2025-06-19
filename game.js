window.onload = function(){
    var configuracao = {
        width : 800,
        height : 600,
        backgroundColor : 0x808080,
        scene: [Cena1, CenaMenu, CenaSelecao, Cena2, CenaFim],
        physics: {
            default: "arcade",
            arcade:{
                gravity: { y: 600 },
                debug: false
            }
        }
    }
    var game = new Phaser.Game(configuracao);
}

let player1, player2;
let ball;
let cursors;
let keysPlayer2;
let ground;
let goalLeft, goalRight;
let scoreLeft = 0;
let scoreRight = 0;
let scoreTextLeft, scoreTextRight;
let timerText;
let tempoRestante = 60;
let jogoAtivo = true;