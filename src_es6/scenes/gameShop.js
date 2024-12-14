// GameShop scene
import * as Phaser from "phaser";
import {
  SPECIAL_ITEMS,
  FONT_STYLES,
  LIGHT_SHOP_TITLE,
  DARK_SHOP_TITLE,
  LIGHT_SHOP_HANG_WORD,
  DARK_SHOP_HANG_WORD,
  CURRENT_ITEMS_TITLE,
  CURRENT_POWERS_TITLE,
  LIGHT_MERCHANT_WORDS,
  DARK_MERCHANT_WORDS,
  LIGHT_TIP_WORDS,
  DARK_TIP_WORDS,
  LIGHT_FINAL_WORDS,
  DARK_FINAL_WORDS,
  AUDIO_NAME,
  SPECIAL_ITEM_NAME,
  COIN_TITLE,
  GAME_OPTIONS,
} from "../gameConfigs.js";
import pickRandomElemFromArray from "../gameUtils.js";

export  class GameShop extends Phaser.Scene {
  constructor() {
    super("GameShop");
  }
  preload() {
    // Panel
    this.load.image("panel", "../assets/images/panel.png");
    // Table
    this.load.image("table", "../assets/images/table.png");
    this.load.image("darktable", "../assets/images/darktable.png");
    // Coin
    this.load.image("coin", "../assets/images/coin.png");
    // Beans
    this.load.image("bean0", "../assets/images/beans/bean0.png");
    this.load.image("bean1", "../assets/images/beans/bean1.png");
    this.load.image("bean2", "../assets/images/beans/bean2.png");
    // Blocks
    this.load.image("block0", "../assets/images/blocks/block0.png");
    this.load.image("block1", "../assets/images/blocks/block1.png");
    this.load.image("block2", "../assets/images/blocks/block2.png");
    // Items
    this.load.image("item0", "../assets/images/special_items/item0.png");
    this.load.image("item1", "../assets/images/special_items/item1.png");
    this.load.image("item2", "../assets/images/special_items/item2.png");
    this.load.image("item3", "../assets/images/special_items/item3.png");
    this.load.image("item4", "../assets/images/special_items/item4.png");
    this.load.image("item5", "../assets/images/special_items/item5.png");
    this.load.image("item6", "../assets/images/special_items/item6.png");
    // Merchant
    this.load.image(
      "tencyou01",
      "../assets/images/tencyou/minigameShopMan01.png"
    );
    this.load.image(
      "tencyou02",
      "../assets/images/tencyou/minigameShopMan02.png"
    );
    this.load.image(
      "tencyou03",
      "../assets/images/tencyou/minigameShopMan03.png"
    );
    this.load.image(
      "tencyou04",
      "../assets/images/tencyou/minigameShopMan04.png"
    );
    this.load.image(
      "tencyou05",
      "../assets/images/tencyou/minigameShopMan05.png"
    );
    this.load.image(
      "tencyou06",
      "../assets/images/tencyou/minigameShopMan06.png"
    );
    // Merchant dialog
    this.load.image("tencyouWords", "../assets/images/tencyou/shopDialog.png");
    // Icon images for icon buttons
    this.load.image("home", "../assets/images/icons/home.png");
    this.load.image("play", "../assets/images/icons/play.png");
    //
  }
  create() {
    // Preset indexes
    this.beanIndex =
      localStorage.getItem("bean") != null
        ? localStorage.getItem("bean").replace("bean", "")
        : 0;
    this.blockIndex =
      localStorage.getItem("block") != null
        ? localStorage.getItem("block").replace("block", "")
        : 0;
    this.audioIndex =
      localStorage.getItem("audio") != null
        ? localStorage.getItem("audio").replace("audio", "")
        : 0;
    this.langIndex =
      localStorage.getItem("lang") != null ? localStorage.getItem("lang") : 0;
    // Audio setting
    this.isBgmPlay =
      localStorage.getItem("isBgmPlay") != null
        ? localStorage.getItem("isBgmPlay")
        : true;
    this.isSePlay =
      localStorage.getItem("isSePlay") != null
        ? localStorage.getItem("isSePlay")
        : true;
    // Is dark market unlocked?
    this.isDarkUnlocked = localStorage.getItem("isDarkUnlocked")
      ? JSON.parse(localStorage.getItem("isDarkUnlocked"))
      : false;
    // Keys of special items
    this.specialItemKeys = Object.keys(SPECIAL_ITEMS);
    // Time of clicking the merchant
    // If more than 20 then the merchant would change expression
    this.lightMerchantClickTimes = 0;
    this.darkMerchantClickTimes = 0;
    // To restrict the tween of changing the scene
    this.isTweenLocked = true;
    // The titles of light shop and dark shop
    this.lightShopTitle = LIGHT_SHOP_TITLE[this.langIndex];
    this.darkShopTitle = DARK_SHOP_TITLE[this.langIndex];
    // The names of the special items
    this.itemNames = SPECIAL_ITEM_NAME[this.langIndex];
    // Define block size, game field height and empty space for panel image
    this.blockSize = game.config.width / GAME_OPTIONS.SHAPES_PER_LINE;
    this.gameFieldHeight = this.blockSize * GAME_OPTIONS.SHAPES_ALL_LINES;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    // Prices for single item and single game power
    this.singleItemPrice = 100;
    this.singlePowerPrice = 1000;
    // Init the random text of the merchant
    let lightRandomWord = pickRandomElemFromArray(
      LIGHT_MERCHANT_WORDS[this.langIndex]
    );
    let darkRandomWord = pickRandomElemFromArray(
      DARK_MERCHANT_WORDS[this.langIndex]
    );
    // Coins
    this.coins =
      localStorage.getItem("coin") != null
        ? localStorage.getItem("coin")
        : 1000;
    // Current special items
    this.currentSpecialItems = [];
    this.currentSpecialItemGroup = this.add.group();
    // If get localstorage of having items then add to the group
    if (localStorage.getItem("myItems") != null) {
      let myItems = localStorage.getItem("myItems").split(",");
      myItems.forEach((itemKey, index) => {
        this.currentSpecialItemGroup
          .create((index + 1) * 150, 1100, itemKey)
          .setScale(0.4)
          .setDepth(1);
      });
    }
    // Top panels
    this.lightTopShopPanel = this.add.image(game.config.width / 2, 0, "panel");
    this.lightTopShopPanel.displayWidth = game.config.width;
    this.lightTopShopPanel.displayHeight = this.emptySpace / 2;
    this.lightTopShopPanel.setOrigin(0.5, 0);
    this.darkTopShopPanel = this.add.image(
      game.config.width / 2 - game.config.width,
      0,
      "panel"
    );
    this.darkTopShopPanel.displayWidth = game.config.width;
    this.darkTopShopPanel.displayHeight = this.emptySpace / 2;
    this.darkTopShopPanel.setOrigin(0.5, 0);
    this.darkTopShopPanel.setTint(0x000000);
    // Bottom panels
    this.lightBottomShopPanel = this.add.image(
      game.config.width / 2,
      game.config.height,
      "table"
    );
    this.lightBottomShopPanel.displayWidth = game.config.width;
    this.lightBottomShopPanel.displayHeight = this.emptySpace / 2;
    this.lightBottomShopPanel.setOrigin(0.5, 1);
    this.darkBottomShopPanel = this.add.image(
      game.config.width / 2 - game.config.width,
      game.config.height,
      "darktable"
    );
    this.darkBottomShopPanel.displayWidth = game.config.width;
    this.darkBottomShopPanel.displayHeight = this.emptySpace / 2;
    this.darkBottomShopPanel.setOrigin(0.5, 1);
    // Button to home
    this.backToStartButton = this.add
      .image(80, 100, "home")
      .setScale(0.6)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.backToHome();
      });
    // Button to game
    this.toNewTurnButton = this.add
      .image(game.config.width - 80, 100, "play")
      .setScale(0.6)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.playNewTurn();
      });
    // Coin example display
    this.toShopCoinsExample = this.add.image(210, 0, "coin").setScale(0.2);
    this.addSingleTweens(
      this.toShopCoinsExample,
      "+=0",
      100,
      1500,
      0,
      "back.out"
    );
    // Coin text display
    this.toShopCoinsText = this.add.text(
      250,
      0,
      COIN_TITLE[this.langIndex],
      FONT_STYLES[this.langIndex]["ForTopPanelText"]
    );
    // Coin data display
    this.toShopCoinsData = this.add.text(
      360,
      0,
      this.coins,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    this.tweens.add({
      targets: [this.toShopCoinsText, this.toShopCoinsData],
      y: 80,
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Shop title display
    this.shopTitleText = this.add
      .text(
        40,
        160,
        this.lightShopTitle,
        FONT_STYLES[this.langIndex]["ForShopTitleAfter"]
      )
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.shopTitleText.setStyle(
          FONT_STYLES[this.langIndex]["ForShopTitleAfter"]
        );
        this.darkShopTitleText.setStyle(
          FONT_STYLES[this.langIndex]["ForShopTitleBefore"]
        );
        this.turnToTheOtherMarket(false);
      });
    // For dark shop title
    if (this.isDarkUnlocked == false) {
      this.darkShopTitleText = this.add.text(
        game.config.width - 280,
        160,
        "?******?",
        FONT_STYLES[this.langIndex]["ForShopTitleBefore"]
      );
    } else {
      this.darkShopTitleText = this.add
        .text(
          game.config.width - 280,
          160,
          this.darkShopTitle,
          FONT_STYLES[this.langIndex]["ForShopTitleBefore"]
        )
        .setInteractive({
          useHandCursor: true,
        })
        .on("pointerdown", () => {
          this.darkShopTitleText.setStyle(
            FONT_STYLES[this.langIndex]["ForShopTitleAfter"]
          );
          this.shopTitleText.setStyle(
            FONT_STYLES[this.langIndex]["ForShopTitleBefore"]
          );
          this.turnToTheOtherMarket(true);
        });
    }
    // Hang text
    this.hangText = this.add.text(
      40,
      240,
      LIGHT_SHOP_HANG_WORD[this.langIndex],
      FONT_STYLES[this.langIndex]["ForHangWords"]
    );
    this.darkhangText = this.add.text(
      40 - game.config.width,
      240,
      DARK_SHOP_HANG_WORD[this.langIndex],
      FONT_STYLES[this.langIndex]["ForHangWords"]
    );
    // Arrays for loop generation
    this.goodItems = [];
    this.goodPrices = [];
    this.displayItems = [];
    this.powerPrices = [];
    this.bgCircles = [];
    // Adding elements with loop
    for (let i1 = 0; i1 < this.specialItemKeys.length - 1; i1++) {
      // Col and Row indexes
      let colIndex = (i1 % 3) + 1;
      let rowIndex = (i1 - colIndex + 1) / 3 + 1;
      // Item texts
      this.goodItems[i1] = this.add.text(
        colIndex * 160 - 90,
        rowIndex * 200 + 210,
        this.itemNames[i1],
        FONT_STYLES[this.langIndex]["ForShopText"]
      );
      // Price texts
      this.goodPrices[i1] = this.add.text(
        colIndex * 150 - 25,
        rowIndex * 200 + 250,
        this.singleItemPrice,
        FONT_STYLES[this.langIndex]["ForShopNumber"]
      );
      // Item images
      this.displayItems[i1] = this.add
        .image(colIndex * 150, rowIndex * 200 + 150, "item" + i1)
        .setScale(0.4)
        .setInteractive({
          useHandCursor: true,
        })
        .on("pointerdown", () => {
          this.purchaseTheSpecialItemInLight(i1);
        });
      // Circle parts
      if (i1 < 3) {
        this.bgCircles[i1] = this.add.circle(
          colIndex * 150,
          game.config.height - 100,
          56,
          "0x3b2820"
        );
      }
    }
    // The merchant
    // Light merchant
    this.lightBeanMerchant = this.add
      .image(game.config.width - 80, game.config.height - 220, "tencyou01")
      .setInteractive({
        useHandCursor: true,
      })
      .setOrigin(1)
      .setDepth(-1)
      .on("pointerdown", () => {
        this.merchantSayWords();
      });
    this.lightBeanMerchant.displayHeight = 240;
    this.lightBeanMerchant.displayWidth = 240;
    this.tweens.add({
      targets: this.lightBeanMerchant,
      scaleY: 0.49,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
    // Light merchant dialog
    this.lightBeanMerchantDialog = this.add
      .image(150, game.config.height - 360, "tencyouWords")
      .setInteractive({
        useHandCursor: true,
      });

    this.lightBeanMerchantDialog.displayHeight = 240;
    this.lightBeanMerchantDialog.displayWidth = 300;
    // Light merchant word
    this.lightBeanMerchantWord = this.add
      .text(
        36,
        game.config.height - 420,
        lightRandomWord,
        FONT_STYLES[this.langIndex]["ForMerchantWords"]
      )
      .setPadding(12);
    // Tip of current items
    this.itemPurchaseText = this.add
      .text(
        40,
        game.config.height - 220,
        CURRENT_ITEMS_TITLE[this.langIndex],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setPadding(12);
    // Dark merchant
    this.darkBeanMerchant = this.add
      .image(280 - game.config.width, game.config.height - 220, "tencyou05")
      .setInteractive({
        useHandCursor: true,
      })
      .setOrigin(1)
      .setDepth(-1)
      .on("pointerdown", () => {
        this.darkMerchantSayWords();
      });
    this.darkBeanMerchant.displayHeight = 240;
    this.darkBeanMerchant.displayWidth = 240;
    this.tweens.add({
      targets: this.darkBeanMerchant,
      scaleY: 0.49,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
    // Dark merchant dialog
    this.darkBeanMerchantDialog = this.add
      .image(
        game.config.width - 180 - game.config.width,
        game.config.height - 360,
        "tencyouWords"
      )
      .setFlipX(true);
    this.darkBeanMerchantDialog.displayHeight = 240;
    this.darkBeanMerchantDialog.displayWidth = 300;
    // Dark merchant word
    this.darkBeanMerchantWord = this.add
      .text(
        game.config.width - 260 - game.config.width,
        game.config.height - 420,
        darkRandomWord,
        FONT_STYLES[this.langIndex]["ForMerchantWords"]
      )
      .setPadding(12);
    // Texts of current bean, block and sound
    this.darkPowerPurchaseText1 = this.add
      .text(
        20 - game.config.width,
        game.config.height - 220,
        CURRENT_POWERS_TITLE[this.langIndex][0],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setPadding(12);
    this.darkPowerPurchaseText2 = this.add
      .text(
        200 - game.config.width,
        game.config.height - 220,
        CURRENT_POWERS_TITLE[this.langIndex][1],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setPadding(12);
    this.darkPowerPurchaseText3 = this.add
      .text(
        380 - game.config.width,
        game.config.height - 220,
        CURRENT_POWERS_TITLE[this.langIndex][2],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setPadding(12);
    // For dark market
    this.darkBgCircles = [];
    this.displayBeans = [];
    this.displayBlocks = [];
    this.displayAudios = [];
    this.displayTexts = [];
    // Loop tp generate for dark market
    for (let i2 = 0; i2 < 9; i2++) {
      // Col and Row indexes
      let colIndex = (i2 % 3) + 1;
      let rowIndex = (i2 - colIndex + 1) / 3 + 1;
      if (i2 < 3) {
        // Dark Circles
        this.darkBgCircles[i2] = this.add.circle(
          (i2 + 1) * 150 - game.config.width,
          game.config.height - 100,
          56,
          "0x3b2820"
        );
        this.displayBeans[i2] = this.add
          .image((i2 + 1) * 150 - game.config.width, 340, "bean" + i2)
          .setScale(0.3)
          .setDepth(1)
          .setInteractive({
            useHandCursor: true,
          })
          .on("pointerdown", () => {
            this.purchaseTheSpecialItemInDark("bean" + i2);
          });
        this.displayBlocks[i2] = this.add
          .image((i2 + 1) * 150 - game.config.width, 490, "block" + i2)
          .setScale(0.3)
          .setDepth(1)
          .setInteractive({
            useHandCursor: true,
          })
          .on("pointerdown", () => {
            this.purchaseTheSpecialItemInDark("block" + i2);
          });
        // If Chinese then show the audio option
        if (this.langIndex == 0) {
          this.displayAudios[i2] = this.add
            .text(
              (i2 + 1) * 150 - 40 - game.config.width,
              620,
              AUDIO_NAME[i2],
              FONT_STYLES[this.langIndex]["ForAudioDisplay"]
            )
            .setDepth(1)
            .setInteractive({
              useHandCursor: true,
            })
            .on("pointerdown", () => {
              this.purchaseTheSpecialItemInDark("audio" + i2);
            });
        }
      }
      // As above, if Chinese lang then show
      if (this.langIndex == 0) {
        this.displayTexts[i2] = this.add.text(
          colIndex * 150 - 40 - game.config.width,
          rowIndex * 150 + 230,
          this.singlePowerPrice,
          FONT_STYLES[this.langIndex]["ForShopNumber"]
        );
      } else {
        if (i2 < 6) {
          this.displayTexts[i2] = this.add.text(
            colIndex * 150 - 40 - game.config.width,
            rowIndex * 150 + 230,
            this.singlePowerPrice,
            FONT_STYLES[this.langIndex]["ForShopNumber"]
          );
        }
      }
    }
    // Tags for bought powers
    this.boughtTags = [];
    // Preset the bought items if no localstorage
    if (!localStorage.getItem("boughtPowers")) {
      let presetBoughtPowers = ["bean0", "block0", "audio0"];
      localStorage.setItem("boughtPowers", JSON.stringify(presetBoughtPowers));
    }
    let boughtMarks = localStorage.getItem("boughtPowers")
      ? JSON.parse(localStorage.getItem("boughtPowers"))
      : [];
    if (boughtMarks.length != 0) {
      for (let i3 = 0; i3 < boughtMarks.length; i3++) {
        let boughtMark = boughtMarks[i3];
        let boughtMarkIndex;
        let markX;
        let markY;
        if (boughtMark.includes("bean")) {
          boughtMarkIndex = JSON.parse(boughtMark.replace("bean", ""));
          markX = (boughtMarkIndex + 1) * 150 + 20 - game.config.width;
          markY = 380;
          this.boughtTags[i3] = this.add
            .text(markX, markY, "GOT!", {
              fontFamily: "Arial",
              fontSize: 28,
            })
            .setDepth(2)
            .setStroke("#FFBC02", 6);
        }
        if (boughtMark.includes("block")) {
          boughtMarkIndex = JSON.parse(boughtMark.replace("block", ""));
          markX = (boughtMarkIndex + 1) * 150 + 20 - game.config.width;
          markY = 530;
          this.boughtTags[i3] = this.add
            .text(markX, markY, "GOT!", {
              fontFamily: "Arial",
              fontSize: 28,
            })
            .setDepth(2)
            .setStroke("#FFBC02", 6);
        }
        if (boughtMark.includes("audio") && this.langIndex == 0) {
          boughtMarkIndex = JSON.parse(boughtMark.replace("audio", ""));
          markX = (boughtMarkIndex + 1) * 150 + 20 - game.config.width;
          markY = 680;
          this.boughtTags[i3] = this.add
            .text(markX, markY, "GOT!", {
              fontFamily: "Arial",
              fontSize: 28,
            })
            .setDepth(2)
            .setStroke("#FFBC02", 6);
        }
      }
    }
    // The power got
    this.beanPower = this.add
      .image(
        150 - game.config.width,
        game.config.height - 100,
        "bean" + this.blockIndex
      )
      .setScale(0.3)
      .setDepth(1);
    this.blockPower = this.add
      .image(
        150 * 2 - game.config.width,
        game.config.height - 100,
        "block" + this.blockIndex
      )
      .setScale(0.3)
      .setDepth(1);
    // Only for Chinese lang
    if (this.langIndex == 0) {
      this.audioPower = this.add.text(
        150 * 3 - 40 - game.config.width,
        game.config.height - 140,
        AUDIO_NAME[this.audioIndex],
        FONT_STYLES[this.langIndex]["ForAudioDisplay"]
      );
    } else {
      this.audioPower = this.add.text(
        150 * 3 - 30 - game.config.width,
        game.config.height - 120,
        "???",
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      );
    }
  }
  update() {
    // !Temporarily nothing to update in version 1.0.0
  }
  // Back home
  backToHome() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GameShop");
        this.scene.start("GameStart");
      });
  }
  // Start a new turn
  playNewTurn() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GameShop");
        this.scene.start("GamePlay");
      });
  }
  // Click the image to purchase the special item in at light market
  purchaseTheSpecialItemInLight(index) {
    if (this.coins < 100) {
      this.lightBeanMerchantWord.setText(LIGHT_TIP_WORDS[this.langIndex]);
    } else {
      this.coins -= 100;
      this.toShopCoinsData.setText(this.coins);
      let tempKey = "item" + index;
      let currentItemNum = this.currentSpecialItemGroup.getChildren().length;
      if (currentItemNum < 3) {
        let buyitem = this.currentSpecialItemGroup
          .create((currentItemNum + 1) * 150, 1100, tempKey)
          .setScale(0.4)
          .setDepth(1);
      }
      if (currentItemNum == 3) {
        let buyitem = this.currentSpecialItemGroup
          .create(currentItemNum * 150, game.config.height, tempKey)
          .setScale(0.4)
          .setDepth(1);
        let allItems = this.currentSpecialItemGroup.getChildren();
        let firstSpecialItem = allItems[0];
        let leftItems = allItems.slice(1, allItems.length - 1);
        this.tweens.add({
          targets: firstSpecialItem,
          y: "+=100",
          duration: 300,
          onComplete: () => {
            this.currentSpecialItemGroup.remove(firstSpecialItem);
            firstSpecialItem.destroy();
          },
        });
        this.tweens.add({
          targets: leftItems,
          x: "-=150",
          duration: 300,
        });
        this.tweens.add({
          targets: buyitem,
          y: "-=100",
          duration: 300,
        });
      }
      let realCurrentItems = this.currentSpecialItemGroup.getChildren();
      let realCurrentItemKeys = [];
      realCurrentItems.forEach((item) => {
        realCurrentItemKeys.push(item.texture.key);
      });
      realCurrentItemKeys.length < 4
        ? localStorage.setItem("myItems", realCurrentItemKeys)
        : localStorage.setItem(
            "myItems",
            realCurrentItemKeys.slice(1, realCurrentItemKeys.length)
          );
    }
  }
  // Click the image to purchase the special item in at dark market
  purchaseTheSpecialItemInDark(index) {
    if (this.coins < 1000) {
      this.darkBeanMerchantWord.setText(DARK_TIP_WORDS[this.langIndex]);
    } else {
      let isBought = localStorage.getItem("boughtPowers")
        ? JSON.parse(localStorage.getItem("boughtPowers"))
        : [];
      if (isBought.indexOf(index) == -1) {
        this.coins -= 1000;
        this.toShopCoinsData.setText(this.coins);
        isBought.push(index);
        localStorage.setItem("boughtPowers", JSON.stringify(isBought));
      }
      if (index.includes("bean")) {
        localStorage.setItem("bean", index);
        this.beanPower.setTexture(index);
      }
      if (index.includes("block")) {
        localStorage.setItem("block", index);
        this.blockPower.setTexture(index);
      }
      if (index.includes("audio")) {
        localStorage.setItem("audio", index);
        let subIndex = index.replace("audio", "");
        this.audioPower.setText(AUDIO_NAME[subIndex]);
      }
    }
  }
  // If click time more than 20 then show a Easter Egg?
  // Else just randomly change the merchant
  merchantSayWords() {
    if (this.lightMerchantClickTimes > 20) {
      this.lightBeanMerchant.setTexture("tencyou04");
      this.lightBeanMerchantWord.setText(LIGHT_FINAL_WORDS[this.langIndex]);
    } else {
      let randomWord = pickRandomElemFromArray(
        LIGHT_MERCHANT_WORDS[this.langIndex]
      );
      this.lightBeanMerchantWord.setText(randomWord);
      this.lightMerchantClickTimes++;
      let randMerchantIndex = Math.floor(Math.random() * 3) + 1;
      let randMerchantTexture = "tencyou0" + randMerchantIndex;
      this.lightBeanMerchant.setTexture(randMerchantTexture);
    }
  }
  // So does the dark shop merchant
  darkMerchantSayWords() {
    if (this.darkMerchantClickTimes > 20) {
      this.darkBeanMerchant.setTexture("tencyou06");
      this.darkBeanMerchantWord.setText(DARK_FINAL_WORDS[this.langIndex]);
    } else {
      let randomWord = pickRandomElemFromArray(
        DARK_MERCHANT_WORDS[this.langIndex]
      );
      this.darkBeanMerchantWord.setText(randomWord);
      this.darkMerchantClickTimes++;
    }
  }
  // Turn to the dark market with the tween
  turnToTheOtherMarket(isDark) {
    // 2D array to 1D
    let rawTweenTargets = [
      this.darkBeanMerchant,
      this.darkBeanMerchantDialog,
      this.darkBeanMerchantWord,
      this.darkPowerPurchaseText1,
      this.darkPowerPurchaseText2,
      this.darkPowerPurchaseText3,
      this.darkTopShopPanel,
      this.darkBottomShopPanel,
      this.darkhangText,
      this.beanPower,
      this.blockPower,
      this.audioPower,
      this.powerPrices,
      this.lightBeanMerchant,
      this.lightBeanMerchantDialog,
      this.lightBeanMerchantWord,
      this.lightTopShopPanel,
      this.lightBottomShopPanel,
      this.itemPurchaseText,
      this.hangText,
      this.currentSpecialItemGroup.getChildren(),
      this.bgCircles,
      this.darkBgCircles,
      this.displayBeans,
      this.displayBlocks,
      this.displayAudios,
      this.displayTexts,
      this.displayItems,
      this.goodItems,
      this.goodPrices,
      this.boughtTags,
    ];
    let solvedTweenTargets = [].concat(...rawTweenTargets);
    // When unlocked, if normal market then go dark
    if (isDark && this.isTweenLocked) {
      this.tweens.add({
        targets: solvedTweenTargets,
        x: "+=600",
        duration: 1500,
        ease: "Power4",
        onComplete: () => {
          this.isTweenLocked = false;
        },
      });
    }
    if (!isDark && !this.isTweenLocked) {
      this.tweens.add({
        targets: solvedTweenTargets,
        x: "-=600",
        duration: 1500,
        ease: "Power4",
        onComplete: () => {
          this.isTweenLocked = true;
        },
      });
    }
  }
  // Maybe we should use a function to add a tween?
  addSingleTweens(currentTargets, forX, forY, during, repeatIndex, easeEffect) {
    this.tweens.add({
      targets: currentTargets,
      x: forX,
      y: forY,
      duration: during,
      repeat: repeatIndex,
      ease: easeEffect,
    });
  }
}
