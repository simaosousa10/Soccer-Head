class Cena2 extends Phaser.Scene {
  constructor() {
    super("Cena2");
  }

  create(data) {
    const { p1, p2 } = data;
    this.p1 = p1;
    this.p2 = p2;
    const escalaBaliza = 0.36;
    this.emOvertime = false;

    this.add.image(400, 200, 'background').setDepth(-3).setDisplaySize(800, 400);

    // Baliza esquerda
    this.add.image(-2, 287, 'goalBack').setScale(escalaBaliza).setDepth(-2);
    this.add.image(2, 297, 'goalSide').setScale(escalaBaliza).setDepth(-1);
    this.add.image(32, 271, 'goalSide').setScale(escalaBaliza).setDepth(-3);
    this.add.image(33, 220, 'goalTop').setScale(escalaBaliza).setDepth(0);
    const topLeft = this.add.rectangle(31, 209, 70, 7, 0x000000, 0);
    this.physics.add.existing(topLeft, true);
    topLeft.angle = -20;

    // Baliza direita
    this.add.image(802, 287, 'goalBack').setScale(escalaBaliza).setFlipX(true).setDepth(-2);
    this.add.image(798, 297, 'goalSide').setScale(escalaBaliza).setFlipX(true).setDepth(-1);
    this.add.image(768, 271, 'goalSide').setScale(escalaBaliza).setFlipX(true).setDepth(-3);
    this.add.image(767, 220, 'goalTop').setScale(escalaBaliza).setFlipX(true).setDepth(0);
    const topRight = this.add.rectangle(769, 209, 70, 7, 0x000000, 0);
    this.physics.add.existing(topRight, true);
    topRight.angle = 20;

    this.goalImage = this.add.image(400, 200, 'goalImage')
      .setOrigin(0.5)
      .setVisible(false)
      .setDepth(5)
      .setScale(0.5);

    ground = this.add.zone(400, 425, 800, 123);
    this.physics.add.existing(ground, true);
    this.physics.world.setBounds(0, 0, 800, 400);

    player1 = this.physics.add.sprite(120, 315, 'char' + p1).setBounce(0.1).setCollideWorldBounds(true).setScale(0.3);
    player1.body.setSize(122, 210).setOffset(120, 89);

    player2 = this.physics.add.sprite(680, 315, 'char' + p2).setBounce(0.1).setCollideWorldBounds(true).setScale(0.3).setFlipX(true);
    player2.body.setSize(122, 210).setOffset(120, 89);

    ball = this.physics.add.sprite(400, 200, 'ball').setBounce(0.9).setCollideWorldBounds(true).setScale(0.3);
    ball.body.setCircle(65);
    ball.body.setMaxVelocityY(600);
    ball.setOrigin(0.5);
    ball.body.setOffset(ball.width / 2 - 65, ball.height / 2 - 65);

    this.physics.add.collider(player1, ground);
    this.physics.add.collider(player1, player2);
    this.physics.add.collider(player2, ground);
    this.physics.add.collider(ball, ground);
    this.physics.add.collider(ball, player1);
    this.physics.add.collider(ball, player2);
    this.physics.add.collider(ball, topLeft);
    this.physics.add.collider(ball, topRight);
    this.physics.add.collider(player1, topRight);
    this.physics.add.collider(player2, topRight);

    cursors = this.input.keyboard.addKeys({ left: 'A', right: 'D', up: 'W' });
    keysPlayer2 = this.input.keyboard.createCursorKeys();
    cursors.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keysPlayer2.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    goalLeft = this.add.zone(20, 300, 25, 125);
    this.physics.world.enable(goalLeft);
    goalLeft.body.setAllowGravity(false).setImmovable(true);

    goalRight = this.add.zone(780, 300, 25, 125);
    this.physics.world.enable(goalRight);
    goalRight.body.setAllowGravity(false).setImmovable(true);

    this.physics.add.overlap(ball, goalLeft, () => this.marcarGolo('direita'), null, this);
    this.physics.add.overlap(ball, goalRight, () => this.marcarGolo('esquerda'), null, this);

    this.add.image(400, 60, 'Contador').setScale(0.4).setDepth(-1);

    scoreTextLeft = this.add.text(315, 50, '0', {
      fontSize: '48px', fill: '#00ff00', fontFamily: 'Arial Black'
    });

    scoreTextRight = this.add.text(445, 50, '0', {
      fontSize: '48px', fill: '#00ff00', fontFamily: 'Arial Black'
    });

    timerText = this.add.text(397, 43, '60', {
      fontSize: '32px', fill: '#ffffff', fontFamily: 'Arial Black'
    }).setOrigin(0.5, 0);

    this.player1AExecutarAnimacao = false;
    this.player2AExecutarAnimacao = false;

    this.overtimeBanner = this.add.image(400, 200, 'Overtime')
      .setVisible(false)
      .setDepth(6)
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (!jogoAtivo) return;

        if (!this.emOvertime) {
          tempoRestante--;
          timerText.setText(tempoRestante);
        } else {
          timerText.setText("0");
        }

        if (tempoRestante <= 0 && !this.emOvertime) {
          if (scoreLeft === scoreRight) {
            this.emOvertime = true;
            timerText.setText("0");

            this.overtimeBanner
              .setScale(0.4)
              .setPosition(400, 200)
              .setVisible(true)
              .setAlpha(0);

            this.tweens.add({
              targets: this.overtimeBanner,
              alpha: 1,
              duration: 400,
              onComplete: () => {
                this.time.delayedCall(1500, () => {
                  this.tweens.add({
                    targets: this.overtimeBanner,
                    scale: 0.08,
                    y: 137,
                    duration: 600,
                    ease: 'Power2',
                    onComplete: () => {
                      this.overtimeBanner.setAlpha(1);
                      this.overtimeBanner.setPosition(400, 137);
                      ball.setPosition(400, 200).setVelocity(0, 0).setVisible(true);
                      player1.setPosition(120, 315);
                      player2.setPosition(680, 315);
                      jogoAtivo = true;
                    }
                  });
                });
              }
            });

            jogoAtivo = false;
          } else {
            this.terminarJogo();
          }
        }
      },
      loop: true
    });

    this.input.keyboard.on('keydown-F', () => {
      this.scene.start('CenaFim', {
        vencedor: 'p2',
        charP1: this.p1,
        charP2: this.p2
      });
    });
  }

  terminarJogo() {
    let vencedor = 'empate';
    if (scoreLeft > scoreRight) vencedor = 'p1';
    else if (scoreRight > scoreLeft) vencedor = 'p2';

    this.scene.start('CenaFim', {
      vencedor,
      charP1: this.p1,
      charP2: this.p2
    });
  }

  marcarGolo(lado) {
    if (!jogoAtivo) return;
    jogoAtivo = false;
    ball.setVisible(false);

    if (lado === 'esquerda') {
      scoreLeft++;
      scoreTextLeft.setText(scoreLeft);
    } else {
      scoreRight++;
      scoreTextRight.setText(scoreRight);
    }

    this.goalImage.setAlpha(0).setScale(0.3).setVisible(true);
    this.tweens.add({
      targets: this.goalImage,
      alpha: 1, scale: 0.7, duration: 500,
      ease: 'Power2', yoyo: true, hold: 800,
      onComplete: () => {
        this.goalImage.setVisible(false);
        ball.setPosition(400, 200).setVelocity(0, 0).setVisible(true);
        player1.setPosition(120, 315);
        player2.setPosition(680, 315);

        if (this.emOvertime) this.terminarJogo();
        else jogoAtivo = true;
      }
    });
  }

    update() {
    if (!jogoAtivo) return;

    // PLAYER 1
    player1.setVelocityX(0);
    let moving1 = false;

    if (!this.player1AExecutarAnimacao) {
    if (cursors.left.isDown) {
        player1.setVelocityX(-160);
        player1.play('move_back_' + String(this.p1).padStart(2, '0'), true);
        moving1 = true;
    } else if (cursors.right.isDown) {
        player1.setVelocityX(160);
        player1.play('move_forward_' + String(this.p1).padStart(2, '0'), true);
        moving1 = true;
    }

    if (cursors.up.isDown && player1.body.touching.down) {
        player1.setVelocityY(-350);
        player1.play('jump_' + String(this.p1).padStart(2, '0'), true);
        this.player1AExecutarAnimacao = true;

        this.time.delayedCall(500, () => {
        this.player1AExecutarAnimacao = false;
        });

        moving1 = true;
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.kick)) {
        const d = Phaser.Math.Distance.Between(player1.x, player1.y, ball.x, ball.y);
        if (d < 80) {
        const dx = ball.x - player1.x;
        const fx = Phaser.Math.Clamp(dx * 8, -500, 500);
        ball.setVelocity(fx, -500);
        player1.play('kick_' + String(this.p1).padStart(2, '0'), true);
        this.player1AExecutarAnimacao = true;

        this.time.delayedCall(600, () => {
            this.player1AExecutarAnimacao = false;
        });
        }
    }
    }

    if (!this.player1AExecutarAnimacao && !moving1 && player1.body.touching.down) {
    player1.play('idle_' + String(this.p1).padStart(2, '0'), true);
    }



    // PLAYER 2
player2.setVelocityX(0);
let moving2 = false;

if (!this.player2AExecutarAnimacao) {
  if (keysPlayer2.left.isDown) {
    player2.setVelocityX(-160);
    player2.play('move_forward_' + String(this.p2).padStart(2, '0'), true);
    moving2 = true;
  } else if (keysPlayer2.right.isDown) {
    player2.setVelocityX(160);
    player2.play('move_back_' + String(this.p2).padStart(2, '0'), true);
    moving2 = true;
  }

  if (keysPlayer2.up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-350);
    player2.play('jump_' + String(this.p2).padStart(2, '0'), true);
    this.player2AExecutarAnimacao = true;
    this.time.delayedCall(500, () => {
      this.player2AExecutarAnimacao = false;
    });
    moving2 = true;
  }

  if (Phaser.Input.Keyboard.JustDown(keysPlayer2.kick)) {
    const d = Phaser.Math.Distance.Between(player2.x, player2.y, ball.x, ball.y);
    if (d < 80) {
      const dx = ball.x - player2.x;
      const fx = Phaser.Math.Clamp(dx * 8, -500, 500);
      ball.setVelocity(fx, -500);
      player2.play('kick_' + String(this.p2).padStart(2, '0'), true);
      this.player2AExecutarAnimacao = true;

      // Duração da animação de remate (ajusta conforme necessário)
      this.time.delayedCall(600, () => {
        this.player2AExecutarAnimacao = false;
      });
    }
  }
}

// Importante: idle só toca se não estiver a executar animações
if (!this.player2AExecutarAnimacao && !moving2 && player2.body.touching.down) {
  player2.play('idle_' + String(this.p2).padStart(2, '0'), true);
}

    }
}
