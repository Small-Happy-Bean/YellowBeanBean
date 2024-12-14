// Game Loader

// Game object
let game;
// Game config
let gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#3b2826",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 1200,
    fullscreenTarget: "bean-game",
  },
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      debug: false,
    },
  },
  parent: "bean-game",
  scene: [GameStart, GamePlay, GameShop],
  title: "Yellow Bean Bean",
  version: "1.0.0",
  url: "",
  banner: {
    text: "#ffffff",
    background: ["#000000", "#ffcb30"],
    hidePhaser: false,
  },
};
// Load the game
game = new Phaser.Game(gameConfig);
