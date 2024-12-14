// GameStart Scene
import * as Phaser from "phaser";
import IconButton from "../components/iconButton.js";
import {
  FONT_STYLES,
  GAME_OPTIONS,
  LANG_TITLES,
  ABOUT_US_TITLES,
  LANG_OPTION_TEXTS,
  ABOUT_US_TEXTS,
} from "../gameConfigs.js";

export class GameStart extends Phaser.Scene {
  constructor() {
    super("GameStart");
  }
  preload() {
    // Game title
    this.load.image("gametitle0", "../assets/images/minigametitle0.png");
    this.load.image("gametitle1", "../assets/images/minigametitle1.png");
    this.load.image("gametitle2", "../assets/images/minigametitle2.png");
    // Panel
    this.load.image("panel", "../assets/images/panel.png");
    // For icon buttons
    this.load.image("play", "../assets/images/icons/play.png");
    this.load.image("shop", "../assets/images/icons/shop.png");
    this.load.image("setting", "../assets/images/icons/setting.png");
    this.load.image("close", "../assets/images/icons/close.png");
    this.load.image("sound", "../assets/images/icons/sound.png");
    this.load.image("nosound", "../assets/images/icons/nosound.png");
    // BGM
    this.load.audio("bgm", "../assets/audios/bgm.mp3");
  }
  create() {
    // Lang setting
    this.langIndex =
      localStorage.getItem("lang") != null ? localStorage.getItem("lang") : 0;
    // Audio setting
    this.isBgmPlay =
      localStorage.getItem("isBgmPlay") != null
        ? JSON.parse(localStorage.getItem("isBgmPlay"))
        : false;
    this.isSePlay =
      localStorage.getItem("isSePlay") != null
        ? JSON.parse(localStorage.getItem("isSePlay"))
        : true;
    // Audio player from the DOM
    this.audioPlayer = document.querySelector(".bgm-audio");
    if (this.isBgmPlay) this.audioPlayer.play();
    // Is any modal open?
    this.isAnyModalOpen = false;
    // Define block size, game field height and empty space for panel image
    this.blockSize = game.config.width / GAME_OPTIONS.SHAPES_PER_LINE;
    this.gameFieldHeight = this.blockSize * GAME_OPTIONS.SHAPES_ALL_LINES;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    // Top panel
    this.topPanel = this.add.image(game.config.width / 2, 0, "panel");
    this.topPanel.displayWidth = game.config.width;
    this.topPanel.displayHeight = this.emptySpace / 2;
    this.topPanel.setOrigin(0.5, 0);
    // Bottom panel
    this.bottomPanel = this.add.image(
      game.config.width / 2,
      game.config.height,
      "panel"
    );
    this.bottomPanel.displayWidth = game.config.width;
    this.bottomPanel.displayHeight = this.emptySpace / 2;
    this.bottomPanel.setOrigin(0.5, 1);
    // Game title with current language setting
    this.gameTitle = this.add
      .image(game.config.width / 2, 0, "gametitle" + this.langIndex)
      .setDepth(1);
    this.tweens.add({
      targets: this.gameTitle,
      y: 450,
      duration: 1000,
      repeat: 0,
      ease: "back.out",
    });
    // Game start buttons
    this.playButton = new IconButton(this, 140, 0, "play", null);
    this.shopButton = new IconButton(this, 300, 0, "shop", null);
    this.settingButton = new IconButton(this, 460, 0, "setting", null);
    this.tweens.add({
      targets: [this.playButton, this.shopButton, this.settingButton],
      y: 700,
      duration: 1000,
      repeat: 0,
      ease: "back.out",
    });
    // Lang option button
    this.langSetButton = this.add
      .text(
        40,
        40,
        LANG_TITLES[this.langIndex],
        FONT_STYLES[this.langIndex]["ForTopPanelText"]
      )
      .setPadding(24)
      .setInteractive({
        useHandCursor: true,
      });
    // About us button
    this.aboutusButton = this.add
      .text(
        game.config.width - 40 - 200,
        40,
        ABOUT_US_TITLES[this.langIndex],
        FONT_STYLES[this.langIndex]["ForTopPanelText"]
      )
      .setPadding(24)
      .setInteractive({
        useHandCursor: true,
      });
    // Add listeners
    this.playButton.on("pointerdown", () => {
      this.tweens.add({
        targets: this.playButton,
        y: "+=20",
        duration: 100,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          this.startNewTurn();
        },
      });
    });
    this.shopButton.on("pointerdown", () => {
      this.tweens.add({
        targets: this.shopButton,
        y: "+=20",
        duration: 100,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          this.goItemShopping();
        },
      });
    });
    this.settingButton.on("pointerdown", () => {
      this.tweens.add({
        targets: this.settingButton,
        y: "+=20",
        duration: 100,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          this.createOverlayMask();
          this.showSettingsModal();
        },
      });
    });
    this.langSetButton.on("pointerdown", () => {
      this.createOverlayMask();
      this.showLangOptionModal();
    });
    this.langSetButton
      .on("pointerover", () => {
        this.langSetButton.setBackgroundColor("#3b2820");
      })
      .on("pointerout", () => {
        this.langSetButton.setBackgroundColor("#4b3830");
      });
    this.aboutusButton.on("pointerdown", () => {
      this.createOverlayMask();
      this.showAboutusModal();
    });
    this.aboutusButton
      .on("pointerover", () => {
        this.aboutusButton.setBackgroundColor("#3b2820");
      })
      .on("pointerout", () => {
        this.aboutusButton.setBackgroundColor("#4b3830");
      });
  }
  update() {
    // ! Temporarily nothing to update in version 1.0.0
  }
  // Play a turn
  startNewTurn() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GameStart");
        this.scene.start("GamePlay");
      });
  }
  // Go shopping
  goItemShopping() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GameStart");
        this.scene.start("GameShop");
      });
  }
  // Set whether buttons enabled
  enableMainButtons(isEnabled) {
    this.aboutusButton.input.enabled = isEnabled;
    this.langSetButton.input.enabled = isEnabled;
    this.playButton.input.enabled = isEnabled;
    this.shopButton.input.enabled = isEnabled;
    this.settingButton.input.enabled = isEnabled;
  }
  // Create an overlay mask
  createOverlayMask() {
    if (!this.isAnyModalOpen) {
      this.enableMainButtons(false);
      this.overlay = this.add.graphics();
      this.overlay
        .fillStyle(0x000000, 0.3)
        .fillRect(0, 0, game.config.width, game.config.height)
        .setDepth(1);
    }
  }
  // Show about-us modal
  showAboutusModal() {
    if (!this.isAnyModalOpen) {
      this.isAnyModalOpen = true;
      this.aboutUsContainer = this.add.container(0, 0).setSize(400, 120);
      this.aboutUsContent = this.add
        .rectangle(
          game.config.width / 2,
          game.config.height / 2,
          400,
          120,
          0x4b3830
        )
        .setStrokeStyle(16, 0x4b3830);
      let aboutUsText = this.add.text(
        game.config.width / 2 - 200,
        game.config.height / 2,
        ABOUT_US_TEXTS[this.langIndex],
        FONT_STYLES[this.langIndex]["ForAboutusText"]
      );
      let exitButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "close"
        )
        .setScale(0.4)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.destroyAboutUsModal();
        });
      Phaser.Display.Align.In.QuickSet(
        exitButton,
        this.aboutUsContent,
        2,
        24,
        24
      );
      Phaser.Display.Align.In.QuickSet(
        aboutUsText,
        this.aboutUsContent,
        6,
        0,
        0
      );
      this.aboutUsContainer
        .add([this.aboutUsContent, aboutUsText, exitButton])
        .setDepth(1);
    }
  }
  // Show language option modal
  showLangOptionModal() {
    if (!this.isAnyModalOpen) {
      this.isAnyModalOpen = true;
      this.langContainer = this.add.container(0, 0).setSize(400, 160);
      this.langContent = this.add
        .rectangle(
          game.config.width / 2,
          game.config.height / 2,
          400,
          160,
          0x4b3830
        )
        .setStrokeStyle(16, 0x4b3830);
      let cnOption = this.add
        .text(
          game.config.width / 2 - 100,
          game.config.height / 2,
          LANG_OPTION_TEXTS[this.langIndex][0],
          FONT_STYLES[this.langIndex]["ForTopPanelText"]
        )
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          localStorage.setItem("lang", 0);
          this.scene.start("GameStart");
        });
      let enOption = this.add
        .text(
          game.config.width / 2,
          game.config.height / 2,
          LANG_OPTION_TEXTS[this.langIndex][1],
          FONT_STYLES[this.langIndex]["ForTopPanelText"]
        )
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          localStorage.setItem("lang", 1);
          this.scene.start("GameStart");
        });
      let jpOption = this.add
        .text(
          game.config.width / 2 + 100,
          game.config.height / 2,
          LANG_OPTION_TEXTS[this.langIndex][2],
          FONT_STYLES[this.langIndex]["ForTopPanelText"]
        )
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          localStorage.setItem("lang", 2);
          this.scene.start("GameStart");
        });
      let exitButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "close"
        )
        .setScale(0.4)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.destroyLangOptionModal();
        });

      Phaser.Display.Align.In.QuickSet(exitButton, this.langContent, 2, 24, 24);
      Phaser.Display.Align.In.QuickSet(cnOption, this.langContent, 4, -20, 0);
      Phaser.Display.Align.In.QuickSet(enOption, this.langContent, 6, 0, 0);
      Phaser.Display.Align.In.QuickSet(jpOption, this.langContent, 8, -20, 0);
      this.langContainer
        .add([this.langContent, cnOption, enOption, jpOption, exitButton])
        .setDepth(1);
    }
  }
  // Show audio-setting modal
  showSettingsModal() {
    if (!this.isAnyModalOpen) {
      this.isAnyModalOpen = true;
      this.settingContainer = this.add.container(0, 0).setSize(400, 160);
      this.settingContent = this.add
        .rectangle(
          game.config.width / 2,
          game.config.height / 2,
          400,
          160,
          0x4b3830
        )
        .setStrokeStyle(16, 0x4b3830);
      let bgmTexture = this.isBgmPlay ? "sound" : "nosound";
      let seTexture = this.isSePlay ? "sound" : "nosound";
      let bgmText = this.add.text(
        game.config.width / 2 + 100,
        game.config.height / 2 - 100,
        "BGM",
        FONT_STYLES[this.langIndex]["ForTopPanelText"]
      );
      this.bgmButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          bgmTexture
        )
        .setScale(0.6)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.setIsAudioPlayable("BGM", !this.isBgmPlay);
        });
      let seText = this.add.text(
        game.config.width / 2 + 100,
        game.config.height / 2 - 100,
        "SE",
        FONT_STYLES[this.langIndex]["ForTopPanelText"]
      );
      this.seButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          seTexture
        )
        .setScale(0.6)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.setIsAudioPlayable("SE", !this.isSePlay);
        });
      let exitButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "close"
        )
        .setScale(0.4)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.destroySettingModal();
        });

      Phaser.Display.Align.In.QuickSet(bgmText, this.settingContent, 4, -20, 0);
      Phaser.Display.Align.In.QuickSet(
        this.bgmButton,
        this.settingContent,
        4,
        -100,
        0
      );
      Phaser.Display.Align.In.QuickSet(seText, this.settingContent, 8, -100, 0);
      Phaser.Display.Align.In.QuickSet(
        this.seButton,
        this.settingContent,
        8,
        -10,
        0
      );
      Phaser.Display.Align.In.QuickSet(
        exitButton,
        this.settingContent,
        2,
        20,
        20
      );

      this.settingContainer
        .add([
          this.settingContent,
          bgmText,
          this.bgmButton,
          seText,
          this.seButton,
          exitButton,
        ])
        .setDepth(1);
    }
  }
  // Destroy modals
  destroyLangOptionModal() {
    if (this.langContainer) {
      this.enableMainButtons(true);
      this.langContainer.destroy();
      this.overlay.destroy();
      this.isAnyModalOpen = false;
    }
  }
  destroyAboutUsModal() {
    if (this.aboutUsContainer) {
      this.enableMainButtons(true);
      this.aboutUsContainer.destroy();
      this.overlay.destroy();
      this.isAnyModalOpen = false;
    }
  }
  destroySettingModal() {
    if (this.settingContainer) {
      this.enableMainButtons(true);
      this.settingContainer.destroy();
      this.overlay.destroy();
      this.isAnyModalOpen = false;
    }
  }
  // Audio setting in modal
  setIsAudioPlayable(setType, isPlayable) {
    let currentTexture = isPlayable ? "sound" : "nosound";
    if (setType == "BGM") {
      this.bgmButton.setTexture(currentTexture);
      this.isBgmPlay = isPlayable;
      localStorage.setItem("isBgmPlay", isPlayable);
      isPlayable ? this.audioPlayer.play() : this.audioPlayer.pause();
    }
    if (setType == "SE") {
      this.seButton.setTexture(currentTexture);
      this.isSePlay = isPlayable;
      localStorage.setItem("isSePlay", isPlayable);
    }
  }
}
