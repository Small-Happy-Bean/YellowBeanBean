// Game Loader
import * as Phaser from "phaser";
import { GamePlay } from "./scenes/gamePlay.js";
import { GameShop } from "./scenes/gameShop.js";
import { GameStart } from "./scenes/gameStart.js";

// Game config
const gameConfig = {
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
  scene: [GameStart, GameShop, GamePlay],
  title: "Yellow Bean Bean",
  version: "1.0.0",
  url: "",
  banner: {
    text: "#ffffff",
    background: ["#000000", "#ffcb30"],
    hidePhaser: false,
  },
};

window.addEventListener("load", () => {
  const game = new Phaser.Game(gameConfig);
  window.game = game;
});
