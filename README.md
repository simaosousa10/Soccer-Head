# Cabeça Soccer

**Cabeça Soccer** é um jogo 2D local desenvolvido com Phaser para o TP2 de Phaser. O projecto implementa uma partida de futebol arcade para dois jogadores no mesmo teclado, com selecção de personagens, física de bola, golos, marcador, temporizador, prolongamento em caso de empate e ecrã final com opções para repetir a partida ou regressar ao menu.

O repositório contém uma aplicação web estática: não existe processo de build, backend ou gestor de dependências configurado. O Phaser está incluído directamente no repositório através do ficheiro `phaser.min.js`.

## Funcionalidades principais

- Menu inicial com opção para jogar e ver instruções.
- Painel de instruções com os controlos de cada jogador.
- Ecrã de selecção de personagens para Jogador 1 e Jogador 2.
- Oito personagens disponíveis, com sprites e animações.
- Jogo local para dois jogadores no mesmo teclado.
- Movimento, salto e remate para ambos os jogadores.
- Bola com física Arcade, colisões e ressaltos.
- Balizas com detecção de golo.
- Marcador para os dois jogadores.
- Temporizador de 60 segundos.
- Prolongamento quando a partida termina empatada.
- Ecrã de fim de jogo com personagem vencedora, botão para jogar novamente e botão para voltar ao menu.

## Controlos

| Jogador | Movimento | Saltar | Rematar |
| --- | --- | --- | --- |
| Jogador 1 | `A` / `D` | `W` | `S` |
| Jogador 2 | Setas esquerda/direita | Seta para cima | Seta para baixo |

## Tecnologias usadas

- **HTML5**: estrutura da página do jogo.
- **JavaScript**: lógica das cenas, estados e mecânicas.
- **Phaser**: motor de jogo 2D usado para renderização, cenas, input, animações e física.
- **Phaser Arcade Physics**: gravidade, colisões, bola, jogadores, chão e balizas.
- **Assets PNG/JPG**: personagens, cenário, botões, bola, balizas e elementos visuais.

## Arquitectura

O jogo está organizado em cenas Phaser:

- `Cena1`: pré-carregamento dos assets e criação das animações das personagens.
- `CenaMenu`: menu inicial e painel de instruções.
- `CenaSelecao`: escolha das personagens para os dois jogadores.
- `Cena2`: cena principal da partida, com física, controlos, golos, marcador, temporizador e prolongamento.
- `CenaFim`: ecrã de fim de jogo, vencedor e navegação para repetir ou voltar ao menu.

O ficheiro `game.js` inicializa o jogo Phaser com resolução `800x600`, activa a física Arcade e regista as cenas principais.

## Estrutura de pastas

```text
.
├── Assets/              # Imagens, botões, estádio, bola, balizas e sprites das personagens
├── cenas/               # Cenas Phaser do menu, selecção, jogo e fim de jogo
├── game.js              # Configuração principal do Phaser e variáveis globais do jogo
├── index.html           # Página HTML que carrega Phaser e os scripts do jogo
├── phaser.min.js        # Biblioteca Phaser incluída localmente
└── .gitattributes
```

## Como executar

Como o projecto carrega scripts e assets locais, recomenda-se executar através de um servidor HTTP estático a partir da raiz do repositório.

Com Python:

```bash
python -m http.server 8000
```

Depois, abrir no browser:

```text
http://localhost:8000
```

Também pode ser usado qualquer outro servidor estático, por exemplo a extensão Live Server do VS Code.

Nota: em ambientes sensíveis a maiúsculas/minúsculas, confirme que os caminhos usados no `index.html` correspondem ao nome real da pasta das cenas.

## Variáveis de ambiente

Não foram identificadas variáveis de ambiente no código. A aplicação é estática e não depende de configuração externa para arrancar.

## Screenshots

Não foi encontrada uma pasta `docs/screenshots` neste repositório. Por isso, este README não inclui capturas de ecrã.

## Estado do projecto

Projecto académico desenvolvido para o TP2 de Phaser. A implementação presente no repositório cobre a estrutura base de um jogo Phaser com cenas, assets, animações, física Arcade e jogabilidade local para dois jogadores.

## Autor

- [simaosousa10](https://github.com/simaosousa10)
