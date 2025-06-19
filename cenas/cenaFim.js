class CenaFim extends Phaser.Scene {
    constructor() {
        super("CenaFim");
    }

    init(data) {
        this.vencedor = data.vencedor;
        this.charP1 = data.charP1;
        this.charP2 = data.charP2;
    }

    create() {
        this.add.image(400, 200, 'background').setDisplaySize(800, 400);

        let imgVencedor = null;

        if (this.vencedor === 'p1') {
            imgVencedor = this.add.image(400, 190, 'char' + this.charP1)
                .setScale(0.45);
        } else if (this.vencedor === 'p2') {
            imgVencedor = this.add.image(400, 190, 'char' + this.charP2)
                .setScale(0.45)
                .setFlipX(true);
        }

    
        this.add.image(400, 80, 'winnerBanner').setScale(0.35).setOrigin(0.5).setDepth(10);

    
        const botaoJogarNovamente = this.add.image(400, 290, 'playAgain')
            .setScale(0.07)
            .setInteractive();

        botaoJogarNovamente.on('pointerdown', () => {
            this.scene.stop("CenaFim");
            this.scene.start("Cena2", {
                p1: this.charP1,
                p2: this.charP2
            });
        });

        const botaoMenu = this.add.image(400, 365, 'returnToMenu')
            .setScale(0.13)
            .setInteractive();

        botaoMenu.on('pointerdown', () => {
            this.scene.stop("CenaFim");
            this.scene.start("CenaMenu");
        });
    }
}