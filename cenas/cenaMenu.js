class CenaMenu extends Phaser.Scene {
    constructor() {
        super("CenaMenu");
    }

    create() {
        this.add.image(400, 200, 'background').setDisplaySize(800, 400);

        this.add.text(400, 60, 'Cabeça Soccer', {
            fontSize: '52px',
            fill: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        const botaoJogar = this.add.image(400, 220, 'botaoJogar')
            .setScale(0.6)
            .setInteractive();

        const botaoInstrucoes = this.add.image(400, 300, 'botaoInstrucoes')
            .setScale(0.6)
            .setInteractive();

        [botaoJogar, botaoInstrucoes].forEach(botao => {
            botao.on('pointerover', () => botao.setScale(0.65));
            botao.on('pointerout', () => botao.setScale(0.6));
        });

        botaoJogar.on('pointerdown', () => {
            this.scene.start('CenaSelecao');
        });

        botaoInstrucoes.on('pointerdown', () => {
            this.mostrarInstrucoes();
        });
    }

    mostrarInstrucoes() {
    const painel = this.add.rectangle(400, 200, 500, 300, 0x000000, 0.85)
        .setStrokeStyle(3, 0xffffff)
        .setOrigin(0.5);

    const titulo = this.add.text(400, 70, 'Controlos', {
        fontSize: '28px',
        fill: '#ffffff',
        fontFamily: 'Arial Black'
    }).setOrigin(0.5);

    const texto = this.add.text(180, 110,
        'Jogador 1:\n  - A / D: Mexer\n  - W: Saltar\n  - S: Chutar\n\n' +
        'Jogador 2:\n  - ← / →: Mexer\n  - ↑: Saltar\n  - ↓: Chutar',
        {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });

    const botaoFechar = this.add.image(625, 75, 'botaoFechar')
        .setScale(0.4) 
        .setInteractive();

    botaoFechar.on('pointerdown', () => {
        painel.destroy();
        texto.destroy();
        titulo.destroy();
        botaoFechar.destroy();
    });
}


}
