class Cena1 extends Phaser.Scene {
  constructor() {
    super("InicioJogo");
  }

  preload() {
    this.load.image('background', 'Assets/Stadium.jpg');
    this.load.image('ball', 'Assets/Ball_02.png');
    this.load.image('goalBack', 'Assets/Goal_Back.png');
    this.load.image('goalSide', 'Assets/Goal_Side.png');
    this.load.image('goalTop', 'Assets/Goal_Top.png');
    this.load.image('goalImage', 'Assets/Goal.png');
    this.load.image('winnerBanner', 'Assets/Winner.png');
    this.load.image('Contador', 'Assets/Contador.png');
    this.load.image('Overtime', 'Assets/Overtime.png');

    this.load.image('botaoJogar', 'Assets/Play.png');
    this.load.image('botaoInstrucoes', 'Assets/Tutorial.png');
    this.load.image('botaoFechar', 'Assets/close.png');

    this.load.image('painelFundo', 'Assets/Window.png');
    this.load.image('selectTeam', 'Assets/Select team.png');
    this.load.image('startBtn', 'Assets/Play.png');
    this.load.image('playAgain', 'Assets/PlayAgain.png');
    this.load.image('returnToMenu', 'Assets/ReturnToMenu.png');

    for (let i = 1; i <= 8; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      const basePath = `Assets/Characters/Character ${num}/PNG Sequences`;

      // Imagem de idle estática (usada no menu de seleção, por exemplo)
      this.load.image('char' + i, `${basePath}/Idle/Idle_000.png`);

      const animacoes = {
        idle: 10,
        fall: 5,
        jump: 5,
        kick: 9,
        back: 10,
        forward: 10
      };

      for (const [anim, total] of Object.entries(animacoes)) {
        for (let j = 0; j < total; j++) {
          const padded = j.toString().padStart(3, '0');
          const nomeAnim = anim === 'idle' ? 'Idle' :
                           anim === 'fall' ? 'Falling Down' :
                           anim === 'jump' ? 'Jump' :
                           anim === 'kick' ? 'Kick' :
                           anim === 'back' ? 'Move Backward' :
                           'Move Forward';
          this.load.image(`char${i}_${anim}_${j}`, `${basePath}/${nomeAnim}/${nomeAnim}_${padded}.png`);
        }
      }
    }
  }

  create() {
    for (let i = 1; i <= 8; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      const criarAnimacao = (key, prefixo, total, frameRate = 10, repeat = -1) => {
        this.anims.create({
          key: `${key}_${num}`,
          frames: Array.from({ length: total }, (_, j) => ({
            key: `char${i}_${prefixo}_${j}`
          })),
          frameRate,
          repeat
        });
      };

      criarAnimacao('idle', 'idle', 10); 
      criarAnimacao('fall', 'fall', 5, 10, 0);
      criarAnimacao('jump', 'jump', 5, 10, 0);
      criarAnimacao('kick', 'kick', 9, 10, 0);
      criarAnimacao('move_back', 'back', 10);
      criarAnimacao('move_forward', 'forward', 10);
    }

    this.scene.start("CenaMenu");
  }
}
