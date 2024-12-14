// Game Loading
// ! Abandoned
// ! Reference from ZENVA
// Details in https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
// ! The progress bar performs clearly when we have to load a relatively big set of files or some too large files.
// ! (Commonly at least the number of 100) Or the bar would complete in very short seconds beyond our reaction.
// ! So if just have several small files maybe the bar is not a must.
/* // GameLoading scene
import { Scene } from "phaser";

class GameLoading extends Scene {
  constructor() {
    super("GameLoading");
  }
  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
      console.log(file);
    });
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // Game title images
    this.load.image("gametitle0", "../assets/images/minigametitle0.png");
    this.load.image("gametitle1", "../assets/images/minigametitle1.png");
    this.load.image("gametitle2", "../assets/images/minigametitle2.png");
    // Panel image
    this.load.image("panel", "../assets/images/panel.png");
    // Icon images for icon buttons
    this.load.image("play", "../assets/images/icons/play.png");
    this.load.image("shop", "../assets/images/icons/shop.png");
    this.load.image("setting", "../assets/images/icons/setting.png");
    this.load.image("close", "../assets/images/icons/close.png");
    this.load.image("sound", "../assets/images/icons/sound.png");
    this.load.image("nosound", "../assets/images/icons/nosound.png");

    for (var i = 0; i < 5000; i++) {
      this.load.image("logo" + i, "zenvalogo.png");
    }
  }
  create() {
    console.log("ok");
  }
}
 */
