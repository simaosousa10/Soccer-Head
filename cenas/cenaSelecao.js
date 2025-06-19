class CenaSelecao extends Phaser.Scene {
    constructor() {
        super("CenaSelecao");
    }

    create() {
        this.add.image(400, 200, 'background').setDisplaySize(800, 400);
        this.add.image(400, 45, 'selectTeam').setDisplaySize(200, 50);

        // Fundos dos jogadores
        this.add.image(200, 235, 'painelFundo').setDisplaySize(340, 300);
        this.add.image(600, 235, 'painelFundo').setDisplaySize(340, 300);

        this.add.text(200, 118, 'Jogador 1', {
            fontSize: '24px', fill: '#00ff00'
        }).setOrigin(0.5);

        this.add.text(600, 118, 'Jogador 2', {
            fontSize: '24px', fill: '#00ff00'
        }).setOrigin(0.5);

        // Guardar estado
        this.jogador1Selecionado = null;
        this.jogador2Selecionado = null;
        this.charImgs1 = [];
        this.charImgs2 = [];

        const espacoX = 80, espacoY = 110;
        const inicioX1 = 80, inicioX2 = 480, inicioY = 200;

        for (let i = 0; i < 8; i++) {
            const col = i % 4;
            const row = Math.floor(i / 4);

            const x1 = inicioX1 + col * espacoX;
            const y = inicioY + row * espacoY;
            const x2 = inicioX2 + col * espacoX;

            const img1 = this.add.image(x1, y, 'char' + (i + 1)).setScale(0.28).setInteractive();
            const img2 = this.add.image(x2, y, 'char' + (i + 1)).setScale(0.28).setInteractive();

            this.charImgs1.push(img1);
            this.charImgs2.push(img2);

            img1.on('pointerdown', () => {
                this.redimensionarPersonagem(this.charImgs1, this.jogador1Selecionado, i);
                this.jogador1Selecionado = i;
                this.atualizarSelecao();
            });

            img2.on('pointerdown', () => {
                this.redimensionarPersonagem(this.charImgs2, this.jogador2Selecionado, i);
                this.jogador2Selecionado = i;
                this.atualizarSelecao();
            });
        }

        // Botão "Começar Jogo"
        this.botaoJogar = this.add.image(400, 380, 'startBtn')
            .setScale(0.6)
            .setInteractive()
            .setVisible(false);

        this.botaoJogar.on('pointerdown', () => {
            this.scene.start("Cena2", {
                p1: this.jogador1Selecionado + 1,
                p2: this.jogador2Selecionado + 1
            });
        });
    }

    redimensionarPersonagem(lista, anterior, novo) {
        if (anterior !== null) {
            lista[anterior].setScale(0.28); // voltar ao normal
        }
        lista[novo].setScale(0.35); // destaque
    }

    atualizarSelecao() {
        if (this.jogador1Selecionado !== null && this.jogador2Selecionado !== null) {
            this.botaoJogar.setVisible(true);
        }
    }
}
