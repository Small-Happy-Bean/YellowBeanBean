// GamePlay Scene
/* Reference Notes:
References mainly from Mr. Emanuele Feronato's blog.
Here marks which function refers and which one slightly created by myself.
*/
/* Referred functions:
addShape -> addBlock, addBean -> addBall, addShapeLine -> addBlockLine
getBallPosition -> getBallPosition
aimingShapes -> startAiming
adjustShooting -> adjustAim
addToFieldSegments -> addTofieldSegments
shootBean -> shootBall
checkBeanBoundCollision -> checkBoundCollision
moveBeans -> moveBalls, moveBlocks -> moveBlocks, moveExtraBeans -> moveExtraBalls
handleBeanVsShape -> handleBallVsBlock, handleBeanVsExtra -> handleBallVsExtra

Details of where differs can be seen in:
https://www.emanueleferonato.com/2020/10/13/html5-ballz-prototype-built-with-phaser-3-now-features-predictive-trajectory/
https://www.emanueleferonato.com/2024/11/05/html5-ballz-engine-powered-by-phaser-and-typescript-a-better-way-to-show-ball-trajectory/

Sorry if anything referred ignored to list...
*/
/* Slightly created functions:
1. AddElement:
  addBoomOrBeam, addSpecialItem
2. Adjust the shooting:
  adjustBoomShooting & adjustBeamShooting,
3. The shooting action:
  shootBoom & shootBeam,
4. Collision checker:
  handleBeanVsSpecialItem, handleBoomVsShape, handleBeamVsAll
  checkBoomBoundCollision & checkBeamBoundCollision,
5. Element movement:
  moveSpecialItems,
6. For special items:
  eraseBlockLine, greedyTime, doubleShooting, freezeBlockLine, beamTime, boomTime,
  pickRandomSpecialItem, selectSpecialItem, addSpecialItemTweens
7. State machine reset:
  resetStates, resetInput
8. Scene change:
  backtoHome, turnToShop, restartTheTurn
9. Add other elements:
  createOverlayMask
  showSettingModal, showPauseModal, showRestartModel 
  destroySettingModal, destroyPauseModal 
10. Set enabled:
  enableMainElements, setIsAudioPlayable

These functions is mainly created by myself with a shallow understanding of the api of Phaser Doc.
Any bugs would be marked and corrected when meeting and ponting them out.
*/
/* About the reference:
Thanks for the reference of the blog a lot! This is my first time to make a HTML5 game.
But perhaps it's not good to refer code at first... 
If thinking me not do proper can issue me at the GitHub, though rewriting the function of
the game would take some time even if no new projects on hand.
Lastly, here to express my thanks to Mr. Emanuele Feronato. 
Really help a lot and cannot thank any more..... >_< 
*/

class GamePlay extends Phaser.Scene {
  constructor() {
    super("GamePlay");
  }
  preload() {
    // Bean
    this.load.image("bean0", "../assets/images/beans/bean0.png");
    this.load.image("bean1", "../assets/images/beans/bean1.png");
    this.load.image("bean2", "../assets/images/beans/bean2.png");
    // Block
    this.load.image("block0", "../assets/images/blocks/block0.png");
    this.load.image("block1", "../assets/images/blocks/block1.png");
    this.load.image("block2", "../assets/images/blocks/block2.png");
    // Point for aiming
    this.load.image("point", "../assets/images/point.png");
    this.load.image("beampoint", "../assets/images/beampoint.png");
    // Special items
    this.load.image("item0", "../assets/images/special_items/item0.png");
    this.load.image("item1", "../assets/images/special_items/item1.png");
    this.load.image("item2", "../assets/images/special_items/item2.png");
    this.load.image("item3", "../assets/images/special_items/item3.png");
    this.load.image("item4", "../assets/images/special_items/item4.png");
    this.load.image("item5", "../assets/images/special_items/item5.png");
    this.load.image("item6", "../assets/images/special_items/item6.png");
    // Coin
    this.load.image("coin", "../assets/images/coin.png");
    this.load.image("lightcoin", "../assets/images/lightCoin.png");
    // Panel
    this.load.image("panel", "../assets/images/panel.png");
    // Icon
    this.load.image("home", "../assets/images/icons/home.png");
    this.load.image("play", "../assets/images/icons/play.png");
    this.load.image("shop", "../assets/images/icons/shop.png");
    this.load.image("pause", "../assets/images/icons/pause.png");
    this.load.image("setting", "../assets/images/icons/setting.png");
    this.load.image("restart", "../assets/images/icons/restart.png");
    this.load.image("close", "../assets/images/icons/close.png");
    this.load.image("sound", "../assets/images/icons/sound.png");
    this.load.image("nosound", "../assets/images/icons/nosound.png");
    // Audio
    this.load.audio("bgm", "../assets/audios/bgm.mp3");
    this.load.audio("ding", "../assets/audios/ding.mp3");
    this.load.audio("forblock0", "../assets/audios/forblock/block0.mp3");
    this.load.audio("forblock1", "../assets/audios/forblock/block1.mp3");
    this.load.audio("forblock2", "../assets/audios/forblock/block2.mp3");
    this.load.audio("forbeam0", "../assets/audios/forbeam/beam0.mp3");
    this.load.audio("forbeam1", "../assets/audios/forbeam/beam1.mp3");
    this.load.audio("forbeam2", "../assets/audios/forbeam/beam2.mp3");
    this.load.audio("forboom0", "../assets/audios/forboom/boom0.mp3");
    this.load.audio("forboom1", "../assets/audios/forboom/boom1.mp3");
    this.load.audio("forboom2", "../assets/audios/forboom/boom2.mp3");
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
    // Preset audio setting
    this.isBgmPlay =
      localStorage.getItem("isBgmPlay") != null
        ? JSON.parse(localStorage.getItem("isBgmPlay"))
        : false;
    this.isSePlay =
      localStorage.getItem("isSePlay") != null
        ? JSON.parse(localStorage.getItem("isSePlay"))
        : true; // IS GAME OVER?
    this.gameOver = false;
    // Coins & Score & Highest history
    this.coins =
      localStorage.getItem("coin") != null
        ? JSON.parse(localStorage.getItem("coin"))
        : 0;
    this.score = 0;
    this.highestHistoryScore = localStorage.getItem("historyHighest")
      ? localStorage.getItem("historyHighest")
      : 0;
    // GAME STATE
    this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
    // Keys of special items
    this.specialItemKeys = Object.keys(SPECIAL_ITEMS);
    // Words for estimation
    this.estimationWord = Object(ESTIMATION_WORDS[this.langIndex]);
    // Special item effects
    this.isFrozen = false;
    this.isGreedy = false;
    this.isDouble = false;
    this.isBeamTime = false;
    this.isBoomTime = false;
    // Audio Player
    this.audioPlayer = document.querySelector(".bgm-audio");
    // Is any modal open?
    this.isAnyModalOpen = false;
    // Level for estimation
    this.estimatedLevel = 0;
    // Game level
    this.level = 0;
    // Counted bean number
    this.beanCount = 1;
    // Recycled blocks array
    this.recycledBlocks = [];
    // Define block size, game field height and empty space for panel image
    this.blockSize = game.config.width / GAME_OPTIONS.SHAPES_PER_LINE;
    this.gameFieldHeight = this.blockSize * GAME_OPTIONS.SHAPES_ALL_LINES;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    // World bounds
    this.physics.world.setBounds(
      0,
      this.emptySpace / 2,
      game.config.width,
      this.gameFieldHeight
    );
    // Groups of blocks, beans, extra beans, special items and current special items.
    this.blockGroup = this.physics.add.group();
    this.beanGroup = this.physics.add.group();
    this.extraBeanGroup = this.physics.add.group();
    this.specialItemGroup = this.physics.add.group();
    this.currentSpecialItemGroup = this.physics.add.group();
    // If localstorage sets bought items then get them into group
    if (localStorage.getItem("myItems") != null) {
      let myItems = localStorage.getItem("myItems").split(",");
      myItems.forEach((itemKey, index) => {
        let initItem = this.currentSpecialItemGroup
          .create(100 * (index + 1) + 200, 1200, itemKey)
          .setScale(0.3)
          .setDepth(1)
          .setInteractive({ useHandCursor: true });
        initItem.on("pointerdown", () => {
          this.selectSpecialItem(itemKey);
          let tempAllItems = this.currentSpecialItemGroup.getChildren();
          let tempIndex = tempAllItems.indexOf(initItem);
          let toTweenItem = tempAllItems.slice(
            tempIndex + 1,
            tempAllItems.length
          );
          this.tweens.add({
            targets: toTweenItem,
            x: "-=100",
            duration: 300,
          });
          initItem.destroy();
        });
      });
    }
    this.tweens.add({
      targets: this.currentSpecialItemGroup.getChildren(),
      y: "-=100",
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Top panel
    this.topPanel = this.add.sprite(game.config.width / 2, 0, "panel");
    this.topPanel.displayWidth = game.config.width;
    this.topPanel.displayHeight = this.emptySpace / 2;
    this.topPanel.setOrigin(0.5, 0);
    // Pause button
    this.pauseButton = this.add
      .image(60, 100, "pause")
      .setScale(0.6)
      .setInteractive({
        useHandCursor: true,
      });
    // Setting button
    this.settingButton = this.add
      .image(game.config.width - 60, 100, "setting")
      .setScale(0.6)
      .setInteractive({
        useHandCursor: true,
      });
    // Coin example
    this.coinExample = this.add.image(130, 0, "coin").setScale(0.2);
    this.tweens.add({
      targets: this.coinExample,
      y: 100,
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Coin text and data
    this.coinText = this.add.text(
      160,
      0,
      COIN_TITLE[this.langIndex],
      FONT_STYLES[this.langIndex]["ForTopPanelText"]
    );
    this.coinData = this.add.text(
      200,
      0,
      this.coins,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    // Score text and data
    this.scoreText = this.add.text(
      game.config.width - 260,
      0,
      SCORE_TITLE[this.langIndex],
      FONT_STYLES[this.langIndex]["ForTopPanelText"]
    );
    this.scoreData = this.add.text(
      game.config.width - 220,
      0,
      this.score,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    this.tweens.add({
      targets: [this.coinText, this.scoreText],
      y: 80,
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    this.tweens.add({
      targets: [this.coinData, this.scoreData],
      y: 130,
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Bottom panel
    this.bottomPanel = this.add.sprite(
      game.config.width / 2,
      game.config.height,
      "panel"
    );
    this.bottomPanel.displayWidth = game.config.width;
    this.bottomPanel.displayHeight = this.emptySpace / 2;
    this.bottomPanel.setOrigin(0.5, 1);

    // Bean example
    this.beanExample = this.add
      .image(100, game.config.height + 20, "bean" + this.beanIndex)
      .setScale(0.3)
      .setDepth(1);
    // Counted bean number
    this.beanData = this.add.text(
      180,
      game.config.height,
      this.beanCount,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    // Special item circle background
    let graphics1 = this.add.circle(100, game.config.height + 20, 48, 0x3b2820);
    let graphics2 = this.add.circle(300, game.config.height + 20, 48, 0x3b2820);
    let graphics3 = this.add.circle(400, game.config.height + 20, 48, 0x3b2820);
    let graphics4 = this.add.circle(500, game.config.height + 20, 48, 0x3b2820);
    this.tweens.add({
      targets: [
        graphics1,
        graphics2,
        graphics3,
        graphics4,
        this.beanExample,
        this.beanData,
      ],
      y: "-=120",
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Bean text
    this.beanText = this.add
      .text(
        60,
        game.config.height,
        BEAN_TITLE[this.langIndex],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setDepth(2);
    // Special item text
    this.itemText = this.add
      .text(
        360,
        game.config.height,
        ITEM_TITLE[this.langIndex],
        FONT_STYLES[this.langIndex]["ForBottomPanelText"]
      )
      .setDepth(2);
    this.tweens.add({
      targets: [this.beanText, this.itemText],
      y: "-=200",
      duration: 1500,
      repeat: 0,
      ease: "back.out",
    });
    // Ball size
    this.ballSize = game.config.width * GAME_OPTIONS.BALL_SIZE;
    // Trajectory Graphics
    this.trajectoryGraphics = this.add.graphics();
    // Add first bean
    this.addBean(
      game.config.width / 2,
      game.config.height - this.bottomPanel.displayHeight - this.ballSize / 2,
      false
    );
    // For shoot point
    this.shootPointGroup = this.add.group();
    for (let i = 0; i < 12; i++) {
      let shootPoint = this.add
        .image(
          game.config.width / 2,
          game.config.height - this.bottomPanel.displayHeight - 32,
          "point"
        )
        .setScale(0.1)
        .setDepth(-1);
      this.shootPointGroup.add(shootPoint);
    }
    this.shootPointGroup.setVisible(false);
    // For boom shoot point
    this.shootBoomGroup = this.add.group();
    for (let i = 0; i < 8; i++) {
      let shootBoom = this.add
        .image(
          game.config.width / 2,
          game.config.height - this.bottomPanel.displayHeight - 32,
          "point"
        )
        .setScale(0.3)
        .setDepth(-1);
      this.shootBoomGroup.add(shootBoom);
    }
    this.shootBoomGroup.setVisible(false);
    // For beam shoot point
    this.shootBeamGroup = this.add.group();
    for (let i = 0; i < 16; i++) {
      let shootBeamBar = this.add
        .image(
          game.config.width / 2,
          game.config.height - this.bottomPanel.displayHeight - 32,
          "beampoint"
        )
        .setScale(0.5)
        .setDepth(-1);
      this.shootBeamGroup.add(shootBeamBar);
    }
    this.shootBeamGroup.setVisible(false);
    // Add first shape line
    this.addShapeLine();
    // Add listeners
    this.pauseButton.on("pointerdown", () => {
      this.createOverlayMask();
      this.showPauseModal();
    });
    this.settingButton.on("pointerdown", () => {
      this.createOverlayMask();
      this.showSettingModal();
    });
    // Input listener
    // Aim - Shoot - Adjust
    this.input.on("pointerdown", this.aimingShapes, this);
    this.input.on("pointerup", this.shootBean, this);
    this.input.on("pointermove", this.adjustShooting, this);
    this.input.on("dragstart", this.aimingShapes, this);
    this.input.on("dragend", this.shootBean, this);
    this.input.on("drag", this.adjustShooting, this);
    // World bounds listener
    this.physics.world.on("worldbounds", this.checkBeanBoundCollision, this);

    // For restart modal test
    // this.createOverlayMask()
    // this.showRestartModal()
  }
  // Update on game states
  update() {
    if (
      this.gameState == GAME_STATES.BALL_COLLPSING ||
      (this.gameState == GAME_STATES.BALL_FLYING &&
        this.landedBalls == this.beanGroup.getChildren().length)
    ) {
      if (
        this.gameState == GAME_STATES.BALL_FLYING
        // ||
        // this.gameState == GAME_STATES.BOOM_FLYING ||
        // this.gameState == GAME_STATES.BEAM_FLYING
      ) {
        this.gameState = GAME_STATES.BALL_COLLPSING;
      } else {
        this.gameState = GAME_STATES.RECYCLING_FOR_NEXT;
        if (!this.isFrozen) {
          this.moveBlocks();
          this.moveExtraBeans();
          this.moveSpecialItems();
        }
        if (this.firstBallToLand != undefined) this.moveBeans();
        // Coin calculation

        this.resetStates();
      }
    }
    // Bean time, handling the collision of beans
    if (this.gameState == GAME_STATES.BALL_FLYING) {
      this.handleBeanVsShape();
      this.handleBeanVsExtra();
      this.handleBeanVsSpecialItem();
    }
    // Boom time, handling the collision of the boom
    if (this.gameState == GAME_STATES.BOOM_FLYING) {
      this.handleBoomVsShape();
    }
    // Beam time, handling the overlapping of the beam
    if (this.gameState == GAME_STATES.BEAM_FLYING) {
      this.handleBeamVsAll();
    }
  }
  // Add Shape
  // TODO: Next version, the shape might not be limited as blocks.
  // New shapes, like round, triangle, might be added.
  addShape(x, y, isRecycled, randColor) {
    let block = isRecycled
      ? this.recycledBlocks.shift()
      : this.blockGroup.create(x, y, "block" + this.blockIndex);
    block.displayWidth = this.blockSize;
    block.displayHeight = this.blockSize;
    block.value = this.level;
    block.row = 1;
    block.setTint(randColor);
    if (isRecycled) {
      block.x = x;
      block.y = y;
      block.text.setText(block.value);
      block.text.x = block.x;
      block.text.y = block.y;
      block.setVisible(true);
      block.text.setVisible(true);
      this.blockGroup.add(block);
    } else {
      let text = this.add.text(block.x, block.y, block.value, {
        font: "normal 32px Impact",
        align: "center",
        color: "#ffffff",
      });
      text.setOrigin(0.5);
      block.text = text;
    }
    block.body.immovable = true;
  }
  // Add shooting bean or extra bean
  addBean(x, y, isExtraBean) {
    let bean = isExtraBean
      ? this.extraBeanGroup.create(x, y, "bean" + this.beanIndex)
      : this.beanGroup.create(x, y, "bean" + this.beanIndex);
    bean.displayWidth = this.ballSize;
    bean.displayHeight = this.ballSize;
    bean.body.setCircle(128);
    bean.body.setBounce(1, 1);
    if (isExtraBean) {
      bean.row = 1;
      bean.collected = false;
    }
    bean.body.collideWorldBounds = true;
    bean.body.onWorldBounds = true;
  }
  // Add a boom or beam, when using the bomb or beam special item
  addBoomOrBeam(x, y, isBoom, isBeam) {
    if (isBoom) {
      this.boom = this.beanGroup.create(x, y, "item5");
      this.boom.displayWidth = this.ballSize * 2;
      this.boom.displayHeight = this.ballSize * 2;
      this.boom.body.setCircle(128);
      this.boom.body.setBounce(1, 1);
      this.boom.body.collideWorldBounds = true;
      this.boom.body.onWorldBounds = true;
    }
    if (isBeam) {
      this.beam = this.beanGroup.create(x, y, "item4");
      this.beam.displayWidth = this.ballSize * 4;
      this.beam.displayHeight = this.ballSize * 4;
      this.beam.body.setCircle(128);
      this.beam.body.setBounce(1, 1);
      this.beam.body.collideWorldBounds = true;
      this.beam.body.onWorldBounds = true;
    }
  }
  // Add special item
  addSpecialItem(x, y) {
    let randomSpecialItemIndex = Phaser.Math.Between(
      0,
      this.specialItemKeys.length - 1
    );
    let specialItemName = "item" + randomSpecialItemIndex;
    let specialItem = this.specialItemGroup.create(x, y, specialItemName);
    specialItem.displayWidth = this.ballSize;
    specialItem.displayHeight = this.ballSize;
    specialItem.body.setCircle(128);
    specialItem.body.setBounce(1, 1);
    specialItem.body.collideWorldBounds = true;
    specialItem.body.onWorldBounds = true;
  }
  // The function to add the line of the shapes
  addShapeLine() {
    this.level++;
    let placedBlocks = [];
    let randColor = COLOR_TINTS[Math.floor(Math.random() * COLOR_TINTS.length)];
    let placeExtraBean =
      Phaser.Math.Between(0, 100) < GAME_OPTIONS.EXTRA_BEAN_PROBABILITY;
    let placeSpecialItem =
      Phaser.Math.Between(0, 100) < GAME_OPTIONS.SPECIAL_ITEM_PROBABILTIY;
    for (let i = 0; i < GAME_OPTIONS.MAX_SHAPES_NUM_PER_LINE; i++) {
      let blockPosition = Phaser.Math.Between(
        0,
        GAME_OPTIONS.SHAPES_PER_LINE - 1
      );
      if (placedBlocks.indexOf(blockPosition) == -1) {
        placedBlocks.push(blockPosition);
        if (placeExtraBean) {
          placeExtraBean = false;
          this.addBean(
            blockPosition * this.blockSize + this.blockSize / 2,
            this.blockSize / 2 + this.emptySpace / 2,
            true
          );
        } else if (placeSpecialItem) {
          placeSpecialItem = false;
          this.addSpecialItem(
            blockPosition * this.blockSize + this.blockSize / 2,
            this.blockSize / 2 + this.emptySpace / 2
          );
        } else {
          if (this.recycledBlocks.length == 0) {
            this.addShape(
              blockPosition * this.blockSize + this.blockSize / 2,
              this.blockSize / 2 + this.emptySpace / 2,
              false,
              randColor
            );
          } else {
            this.addShape(
              blockPosition * this.blockSize + this.blockSize / 2,
              this.blockSize / 2 + this.emptySpace / 2,
              true,
              randColor
            );
          }
        }
      }
      this.fieldSegments = [];
      // get physics world bounds
      let boundRectangle = new Phaser.Geom.Rectangle(
        0,
        this.emptySpace / 2,
        game.config.width,
        this.gameFieldHeight
      );
      this.addToFieldSegments(boundRectangle);
      Phaser.Actions.Call(
        this.blockGroup.getChildren(),
        function (block) {
          let rectangle = block.getBounds();
          this.addToFieldSegments(rectangle);
        },
        this
      );
    }
  }
  // Get (x, y) position of the ball
  getBallPosition() {
    let children = this.beanGroup.getChildren();
    return new Phaser.Geom.Point(children[0].x, children[0].y);
  }
  // Preparation for aiming
  aimingShapes() {
    if (this.gameState == GAME_STATES.WAITING_FOR_SHOOTING) {
      this.legalAngleOfFire = false;
      this.gameState = GAME_STATES.PLAYER_AIMING;
    }
  }
  // Adjust the shooting direction of the bean
  adjustShooting(e) {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      let distY = e.y - e.downY;
      if (distY > 10) {
        this.legalAngleOfFire = true;
        this.direction = Phaser.Math.Angle.Between(e.x, e.y, e.downX, e.downY);
        this.shootPointGroup.setVisible(true);
        this.tweens.addCounter({
          from: 0,
          to: 40,
          duration: 1000,
          repeat: -1,
          onUpdate: (tween) => {
            this.shootPointGroup.getChildren().forEach((point, index) => {
              let distance = index * 40 + tween.getValue();
              point.setPosition(
                this.beanGroup.getChildren()[0].x +
                  distance * Math.cos(this.direction),
                this.beanGroup.getChildren()[0].y +
                  distance * Math.sin(this.direction)
              );
            });
          },
        });
      } else {
        this.legalAngleOfFire = false;
        this.trajectoryGraphics.clear();
      }
    }
  }
  // Adjust shooting direction of the boom
  adjustBoomShooting(e) {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      let distY = e.y - e.downY;
      if (distY > 10) {
        this.legalAngleOfFire = true;
        this.direction = Phaser.Math.Angle.Between(e.x, e.y, e.downX, e.downY);
        this.shootBoomGroup.setVisible(true);
        this.tweens.addCounter({
          from: 0,
          to: 60,
          duration: 1000,
          repeat: -1,
          onUpdate: (tween) => {
            this.shootBoomGroup.getChildren().forEach((boom, index) => {
              let distance = index * 60 + tween.getValue();
              boom.setPosition(
                this.beanGroup.getChildren()[0].x +
                  distance * Math.cos(this.direction),
                this.beanGroup.getChildren()[0].y +
                  distance * Math.sin(this.direction)
              );
            });
          },
        });
      } else {
        this.legalAngleOfFire = false;
        this.trajectoryGraphics.clear();
      }
    }
  }
  // Adjust shooting direction of the beam
  adjustBeamShooting(e) {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      let distY = e.y - e.downY;
      if (distY > 10) {
        this.legalAngleOfFire = true;
        this.direction = Phaser.Math.Angle.Between(e.x, e.y, e.downX, e.downY);
        this.shootBeamGroup.setVisible(true);
        this.tweens.addCounter({
          from: 0,
          to: 40,
          duration: 1000,
          repeat: -1,
          onUpdate: (tween) => {
            this.shootBeamGroup.getChildren().forEach((beam, index) => {
              let distance = index * 40 + tween.getValue();
              beam.setPosition(
                this.beanGroup.getChildren()[0].x +
                  distance * Math.cos(this.direction),
                this.beanGroup.getChildren()[0].y +
                  distance * Math.sin(this.direction)
              );
              beam.setRotation(Math.cos(this.direction));
            });
          },
        });
      } else {
        this.legalAngleOfFire = false;
        this.trajectoryGraphics.clear();
      }
    }
  }
  // ?
  addToFieldSegments(rectangle) {
    this.fieldSegments.push(rectangle.getLineA());
    this.fieldSegments.push(rectangle.getLineB());
    this.fieldSegments.push(rectangle.getLineC());
    this.fieldSegments.push(rectangle.getLineD());
  }
  // Shoot beans
  shootBean() {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      this.trajectoryGraphics.clear();
      this.shootPointGroup.setVisible(false);
      if (this.legalAngleOfFire) {
        this.gameState = GAME_STATES.BALL_FLYING;
        this.landedBalls = 0;
        this.beanGroup.getChildren().forEach(
          function (bean, index) {
            this.time.addEvent({
              delay: 100 * index,
              callbackScope: this,
              callback: function () {
                bean.body.setVelocity(
                  GAME_OPTIONS.BALL_SPEED * Math.cos(this.direction),
                  GAME_OPTIONS.BALL_SPEED * Math.sin(this.direction)
                );
              },
            });
          }.bind(this)
        );
      } else {
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
      }
    }
  }
  // Shoot boom
  shootBoom() {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      this.trajectoryGraphics.clear();
      this.shootBoomGroup.setVisible(false);
      if (this.legalAngleOfFire) {
        this.gameState = GAME_STATES.BOOM_FLYING;
        this.time.addEvent({
          delay: 100,
          callbackScope: this,
          callback: function () {
            this.boom.body.setVelocity(
              GAME_OPTIONS.BALL_SPEED * Math.cos(this.direction),
              GAME_OPTIONS.BALL_SPEED * Math.sin(this.direction)
            );
          },
        });
      } else {
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
      }
    }
  }
  // Shoot beam
  shootBeam() {
    if (this.gameState == GAME_STATES.PLAYER_AIMING) {
      this.trajectoryGraphics.clear();
      this.shootBeamGroup.setVisible(false);
      if (this.legalAngleOfFire) {
        this.gameState = GAME_STATES.BEAM_FLYING;
        this.time.addEvent({
          delay: 100,
          callbackScope: this,
          callback: function () {
            this.beam.body.setVelocity(
              GAME_OPTIONS.BALL_SPEED * Math.cos(this.direction) * 2,
              GAME_OPTIONS.BALL_SPEED * Math.sin(this.direction) * 2
            );
          },
        });
      } else {
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
      }
    }
  }
  // Check collision between the bean and the world bound
  checkBeanBoundCollision(bean, up, down, left, right) {
    if (down && this.gameState == GAME_STATES.BALL_FLYING) {
      bean.setVelocity(0);
      this.landedBalls++;
      if (this.landedBalls == 1) {
        this.firstBallToLand = bean;
      }
    }
  }
  // Check collision between the boom and the world bound
  checkBoomBoundCollision(boom, up, down, left, right) {
    if (
      (up && this.gameState == GAME_STATES.BOOM_FLYING) ||
      (left && this.gameState == GAME_STATES.BOOM_FLYING) ||
      (right && this.gameState == GAME_STATES.BOOM_FLYING)
    ) {
      this.boom.destroy();

      setTimeout(() => {
        this.beanGroup.setVisible(true);
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
        this.resetInput();
      }, 300);
    }
  }
  // Check collision between the beam and the world bound
  checkBeamBoundCollision(beam, up, down, left, right) {
    if (
      (up && this.gameState == GAME_STATES.BEAM_FLYING) ||
      (left && this.gameState == GAME_STATES.BEAM_FLYING) ||
      (right && this.gameState == GAME_STATES.BEAM_FLYING)
    ) {
      this.beam.destroy();
      setTimeout(() => {
        this.beanGroup.setVisible(true);
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
        this.resetInput();
      }, 300);
    }
  }
  // Move all blocks down a row
  moveBlocks() {
    this.tweens.add({
      targets: this.blockGroup.getChildren(),
      props: {
        y: {
          getEnd: function (target) {
            return target.y + target.displayHeight;
          },
        },
      },
      callbackScope: this,
      onUpdate: function (tween, target) {
        target.text.y = target.y;
      },
      onComplete: function () {
        this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
        Phaser.Actions.Call(
          this.blockGroup.getChildren(),
          function (block) {
            block.row++;
            if (block.row == GAME_OPTIONS.SHAPES_ALL_LINES) {
              this.gameOver = true;
            }
          },
          this
        );
        this.addShapeLine();
        if (this.gameOver) {
          this.input.off("pointermove");
          this.createOverlayMask();
          this.showRestartModal();
          if (this.score > this.highestHistoryScore)
            localStorage.setItem("historyHighest", this.score);
          localStorage.setItem("coin", this.coins);
          let realCurrentItemKeys = [];
          this.currentSpecialItemGroup.getChildren().forEach((item) => {
            realCurrentItemKeys.push(item.texture.key);
          });
          localStorage.setItem("myItems", realCurrentItemKeys);
        }
      },
      duration: 500,
      ease: "Cubic.easeInOut",
    });
  }
  // Move recycled beans to x position of the first landed bean
  moveBeans() {
    this.tweens.add({
      targets: this.beanGroup.getChildren(),
      x: this.firstBallToLand.gameObject.x,
      duration: 300,
      ease: "Cubic.easeInOut",
    });
  }
  // Move extra balls to the down bound of the world
  moveExtraBeans() {
    Phaser.Actions.Call(this.extraBeanGroup.getChildren(), function (bean) {
      if (bean.row == GAME_OPTIONS.blockLines) {
        bean.collected = true;
      }
    });
    this.tweens.add({
      targets: this.extraBeanGroup.getChildren(),
      props: {
        x: {
          getEnd: function (target) {
            return target.collected
              ? target.scene.firstBallToLand.gameObject.x
              : target.x;
          },
        },
        y: {
          getEnd: function (target) {
            return target.collected
              ? target.scene.firstBallToLand.gameObject.y
              : target.y + target.scene.blockSize;
          },
        },
      },
      callbackScope: this,
      onComplete: function () {
        Phaser.Actions.Call(
          this.extraBeanGroup.getChildren(),
          function (bean) {
            if (!bean.collected) {
              bean.row++;
            } else {
              this.extraBeanGroup.remove(bean);
              this.beanGroup.add(bean);
              bean.body.collideWorldBounds = true;
              bean.body.onWorldBounds = true;
              bean.body.setBounce(1, 1);
              this.beanCount = this.beanGroup.children.entries.length;
              this.beanData.text = this.beanCount;
            }
          },
          this
        );
      },
      duration: 300,
      ease: "Cubic.easeInOut",
    });
  }
  // Move special items down a row
  moveSpecialItems() {
    this.tweens.add({
      targets: this.specialItemGroup.getChildren(),
      props: {
        x: {
          getEnd: function (target) {
            return target.collected
              ? target.scene.firstBallToLand.gameObject.x
              : target.x;
          },
        },
        y: {
          getEnd: function (target) {
            return target.collected
              ? target.scene.firstBallToLand.gameObject.y
              : target.y + target.scene.blockSize;
          },
        },
      },
      callbackScope: this,
      onComplete: function () {
        Phaser.Actions.Call(
          this.specialItemGroup.getChildren(),
          function (specialItem) {
            if (!specialItem.collected) {
              specialItem.row++;
            } else {
              this.specialItemGroup.remove(specialItem);
            }
          },
          this
        );
      },
      duration: 300,
      ease: "Cubic.easeInOut",
    });
  }
  // Handle collision between bean and shape
  handleBeanVsShape() {
    this.physics.world.collide(
      this.beanGroup,
      this.blockGroup,
      function (bean, block) {
        if (this.isSePlay) {
          this.sound.play("ding");
        }
        if (this.isDouble) {
          block.value -= 2;
        } else {
          block.value--;
        }
        this.score += 1;
        if (block.value <= 0) {
          this.recycledBlocks.push(block);
          this.blockGroup.remove(block);
          block.visible = false;
          block.text.visible = false;
          if (this.isSePlay) {
            this.sound.play("forblock" + this.audioIndex);
          }

          this.coins = this.isGreedy ? this.coins + 2 : this.coins + 1;
          this.coinData.setText(this.coins);
        } else {
          block.text.setText(block.value);
        }
        this.scoreData.setText(this.score);
      },
      null,
      this
    );
  }
  // Handle collision between boom and shape
  handleBoomVsShape() {
    this.physics.world.collide(
      this.boom,
      this.blockGroup,
      function (booom, block) {
        if (this.isSePlay) {
          let music = this.sound.add("forboom" + this.audioIndex, {
            volume: 0.6,
          });
          music.play();
        }
        this.tweens.add({
          targets: booom,
          scale: 0.6,
          duration: 100,
          onComplete: () => {
            this.score += block.value;
            this.recycledBlocks.push(block);
            this.blockGroup.remove(block);
            block.visible = false;
            block.text.visible = false;
            this.scoreData.setText(this.score);
            this.coins = this.isGreedy ? this.coins + 2 : this.coins + 1;
            this.coinData.setText(this.coins);
          },
        });
        // this.score += block.value;
        // this.recycledBlocks.push(block);
        // this.blockGroup.remove(block);
        // block.visible = false;
        // block.text.visible = false;
        // this.scoreData.setText(this.score);
        // setTimeout(() => {
        //   this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
        //   this.resetInput();
        // }, 500);
      },
      null,
      this
    );
  }
  // Handle overlapping between beam and all in the game zone
  handleBeamVsAll() {
    this.physics.world.overlap(
      this.beam,
      this.blockGroup,
      function (beeam, block) {
        if (this.isSePlay) {
          let music = this.sound.add("forbeam" + this.audioIndex, {
            volume: 0.4,
          });
          music.play();
        }
        this.score += block.value;
        this.recycledBlocks.push(block);
        this.blockGroup.remove(block);
        block.visible = false;
        block.text.visible = false;
        block.text.setText(block.value);

        this.scoreData.setText(this.score);
      },
      null,
      this
    );
    this.physics.world.overlap(
      this.beam,
      this.extraBeanGroup,
      function (beeam, extraBean) {
        this.extraBeanGroup.remove(extraBean);
        extraBean.destroy();
      },
      null,
      this
    );
    this.physics.world.overlap(
      this.beam,
      this.specialItemGroup,
      function (beeam, specialItem) {
        this.specialItemGroup.remove(specialItem);
        specialItem.destroy();
      },
      null,
      this
    );
  }
  // Handle overlapping between bean and extra bean
  handleBeanVsExtra() {
    this.physics.world.overlap(
      this.beanGroup,
      this.extraBeanGroup,
      function (bean, extraBall) {
        extraBall.collected = true;
        this.tweens.add({
          targets: extraBall,
          y:
            game.config.height -
            this.bottomPanel.displayHeight -
            extraBall.displayHeight / 2,
          duration: 200,
          ease: "Cubic.easeOut",
        });
      },
      null,
      this
    );
  }
  // Handle overlapping between bean and special item
  handleBeanVsSpecialItem() {
    this.physics.world.overlap(
      this.beanGroup,
      this.specialItemGroup,
      function (bean, specialItem) {
        let currentItems = this.currentSpecialItemGroup.getChildren();
        let currentItemNum = currentItems.length;
        this.specialItemGroup.remove(specialItem);
        this.currentSpecialItemGroup.add(specialItem);
        specialItem
          .setInteractive({ useHandCursor: true })
          .on("pointerdown", () => {
            this.selectSpecialItem(specialItem.texture.key);
            let tempAllItems = this.currentSpecialItemGroup.getChildren();
            let tempIndex = tempAllItems.indexOf(specialItem);
            let toTweenItem = tempAllItems.slice(
              tempIndex + 1,
              tempAllItems.length
            );
            this.tweens.add({
              targets: toTweenItem,
              x: "-=100",
              duration: 300,
            });
            this.currentSpecialItemGroup.remove(specialItem);
            specialItem.destroy();
          });
        if (currentItemNum < 3) {
          specialItem.setPosition(100 * (currentItemNum + 1) + 200, 1100, 0, 0);
          specialItem.setScale(0.3);
        }
        if (currentItemNum >= 3) {
          specialItem.setPosition(500, game.config.height, 0, 0);
          specialItem.setScale(0.3);
          let firstSpecialItems = currentItems.slice(
            0,
            currentItems.length - 3
          );
          let leftItems = currentItems.slice(
            currentItems.length - 3,
            currentItems.length - 1
          );
          this.tweens.add({
            targets: firstSpecialItems,
            y: "+=180",
            duration: 300,
            onComplete: () => {
              this.currentSpecialItemGroup.remove(firstSpecialItems);
              for (let firstSpecialItem of firstSpecialItems)
                firstSpecialItem.destroy();
            },
          });
          this.tweens.add({
            targets: leftItems,
            x: "-=100",
            duration: 300,
          });
          this.tweens.add({
            targets: specialItem,
            y: "-=100",
            duration: 300,
          });
        }
      },
      null,
      this
    );
  }
  // Special item: BE_LAZY_IS_HAPPY
  eraseBlockLine() {
    let toEraseBlocks = this.blockGroup.getChildren();
    let toErase = [];
    this.addSpecialItemTweens(
      "HAPPY_BE_LAZY",
      game.config.width / 2 - 100,
      game.config.height / 2,
      "+=80"
    );
    if (toEraseBlocks.length != 0) {
      let bottomRowIndex = toEraseBlocks[0].row;
      toEraseBlocks.forEach((elem) => {
        if (elem.row === bottomRowIndex) {
          toErase.push(elem);
        }
      });
      toErase.forEach((elem) => {
        elem.destroy();
        elem.text.destroy();
      });
      let tempBlock = this.add
        .image(
          0,
          this.emptySpace / 2 +
            this.blockSize * bottomRowIndex -
            this.blockSize / 2,
          "block" + this.blockIndex
        )
        .setScale(0.4)
        .setTint(0xfff67d);
      tempBlock.displayWidth = this.blockSize;
      tempBlock.displayHeight = this.blockSize;
      this.tweens.add({
        targets: tempBlock,
        x: game.config.width,
        duration: 500,
        onComplete: () => {
          tempBlock.destroy();
        },
      });
    }
  }
  // Special item: JUST_WANT_IT
  greedyTime() {
    this.isGreedy = true;
    this.coinExample.setTexture("lightcoin");
    this.addSpecialItemTweens(
      "JUST_WANT_IT",
      game.config.width / 2 - 100,
      game.config.height / 2,
      "+=80"
    );
  }
  // Special item: DOUBLE_BEANS_RUN
  doubleShooting() {
    this.isDouble = true;
    this.beanExample.setTexture("item2");
    this.addSpecialItemTweens(
      "DOUBLE_BEANS_RUN",
      game.config.width / 2 - 180,
      game.config.height / 2,
      "+=80"
    );
  }
  // Special item: ALL_YOU_FROZEN
  freezeBlockLine() {
    this.isFrozen = true;
    this.blockGroup.getChildren().forEach((block) => {
      block.setTint(0x618ffa);
    });
    this.addSpecialItemTweens(
      "ALL_YOU_FROZEN",
      game.config.width / 2 - 80,
      game.config.height / 2,
      "+=80"
    );
  }
  // Special item: CYBER_IKUZO
  beamTime() {
    if (this.isBoomTime) {
      this.isBoomTime = false;
      this.boom.destroy();
    }
    this.addSpecialItemTweens(
      "CYBER_IKUZO",
      game.config.width / 2 - 200,
      game.config.height / 2,
      "+=80"
    );
    this.beanGroup.setVisible(false);
    this.isBeamTime = true;
    this.input.off("pointermove", this.adjustShooting, this);
    this.input.on("pointermove", this.adjustBeamShooting, this);
    this.input.off("pointerup", this.shootBean, this);
    this.input.on("pointerup", this.shootBeam, this);
    this.physics.world.off("worldbounds", this.checkBeanBoundCollision, this);
    this.physics.world.on("worldbounds", this.checkBeamBoundCollision, this);
    this.firstBallTempLocate = this.beanGroup.getChildren()[0];
    this.addBoomOrBeam(
      this.firstBallTempLocate.x,
      this.firstBallTempLocate.y,
      false,
      true
    );
  }
  // Special item: RED_TEMPERATURE_BOMB
  boomTime() {
    if (this.isBeamTime) {
      this.isBeamTime = false;
      this.beam.destroy();
    }
    this.beanGroup.setVisible(false);
    this.addSpecialItemTweens(
      "RED_TEMPER_BOMB",
      game.config.width / 2 - 100,
      game.config.height / 2,
      "+=80"
    );
    this.isBoomTime = true;
    this.input.off("pointermove", this.adjustShooting, this);
    this.input.on("pointermove", this.adjustBoomShooting, this);
    this.input.off("pointerup", this.shootBean, this);
    this.input.on("pointerup", this.shootBoom, this);
    this.physics.world.off("worldbounds", this.checkBeanBoundCollision, this);
    this.physics.world.on("worldbounds", this.checkBoomBoundCollision, this);
    this.firstBallTempLocate = this.beanGroup.getChildren()[0];
    this.addBoomOrBeam(
      this.firstBallTempLocate.x,
      this.firstBallTempLocate.y,
      true,
      false
    );
  }

  // Special item: AKAMI_MAGIC
  // ! Tip: Minus 2 to avoid AKAMI_MAGIC loop
  pickRandomSpecialItem() {
    this.addSpecialItemTweens(
      "AKAMI_MAGIC",
      game.config.width / 2 - 180,
      game.config.height / 2 - 120,
      "+=0"
    );
    // ! To avoid loop of 7
    let randomSpecialItemIndex = Phaser.Math.Between(
      0,
      this.specialItemKeys.length - 2
    );
    let magicItemIndex = "item" + randomSpecialItemIndex;
    this.selectSpecialItem(magicItemIndex);
  }
  // Reset the states every level
  resetStates() {
    this.isFrozen = false;
    this.isGreedy = false;
    this.isDouble = false;
    this.isBoomTime = false;
    this.isBeamTime = false;
    this.resetInput();
    this.gameState = GAME_STATES.WAITING_FOR_SHOOTING;
    this.coinExample.setTexture("coin");
    this.beanExample.setTexture("bean" + this.beanIndex);
  }
  resetInput() {
    this.input.off("pointermove");
    this.input.off("pointerup");
    this.input.on("pointermove", this.adjustShooting, this);
    this.input.on("pointerup", this.shootBean, this);
    this.physics.world.off("worldbounds");
    this.physics.world.on("worldbounds", this.checkBeanBoundCollision, this);
  }
  // Select a item from current ones
  selectSpecialItem(keyvalue) {
    switch (keyvalue) {
      case "item0":
        this.eraseBlockLine();
        break;
      case "item1":
        this.greedyTime();
        break;
      case "item2":
        this.doubleShooting();
        break;
      case "item3":
        this.freezeBlockLine();
        break;
      case "item4":
        this.beamTime();
        break;
      case "item5":
        this.boomTime();
        break;
      case "item6":
        this.pickRandomSpecialItem();
        break;
    }
  }
  // Back to GameStart Scene
  backToHome() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GamePlay");
        this.scene.start("GameStart");
      });
  }
  // Turn to GameShop Scene
  turnToShop() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GamePlay");
        this.scene.start("GameShop");
      });
  }
  // Restart the turn
  restartTheTurn() {
    this.cameras.main
      .fadeOut(300, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop("GamePlay");
        this.scene.start("GamePlay");
      });
  }
  // Create an overlay mask
  createOverlayMask() {
    if (!this.isAnyModalOpen) {
      this.enableMainElements(false);
      this.overlay = this.add.graphics();
      this.overlay
        .fillStyle(0x000000, 0.3)
        .fillRect(0, 0, game.config.width, game.config.height)
        .setDepth(3);
    }
  }
  // Make whether button enabled
  enableMainElements(isEnabled) {
    this.pauseButton.input.enabled = isEnabled;
    this.settingButton.input.enabled = isEnabled;
    this.currentSpecialItemGroup.getChildren().forEach((item) => {
      item.input.enabled = isEnabled;
    });
  }
  // Setting Modal for audio setting
  showSettingModal() {
    if (!this.isAnyModalOpen) {
      this.isAnyModalOpen = true;
      this.input.off("pointermove");
      let bgmTexture = this.isBgmPlay ? "sound" : "nosound";
      let seTexture = this.isSePlay ? "sound" : "nosound";
      this.settingModalContainer = this.add
        .container(0, 0)
        .setSize(400, 160)
        .setDepth(4);
      this.settingModalContent = this.add
        .rectangle(
          game.config.width / 2,
          game.config.height / 2,
          400,
          160,
          0x4b3830
        )
        .setStrokeStyle(16, 0x4b3830);
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
        .setInteractive({ useHandCursor: true });
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
        .setInteractive({ useHandCursor: true });
      let exitButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "close"
        )
        .setScale(0.4)
        .setInteractive({ useHandCursor: true });
      Phaser.Display.Align.In.QuickSet(
        bgmText,
        this.settingModalContent,
        4,
        -20,
        0
      );
      Phaser.Display.Align.In.QuickSet(
        this.bgmButton,
        this.settingModalContent,
        4,
        -100,
        0
      );
      Phaser.Display.Align.In.QuickSet(
        seText,
        this.settingModalContent,
        8,
        -100,
        0
      );
      Phaser.Display.Align.In.QuickSet(
        this.seButton,
        this.settingModalContent,
        8,
        -10,
        0
      );
      Phaser.Display.Align.In.QuickSet(
        exitButton,
        this.settingModalContent,
        2,
        20,
        20
      );
      this.settingModalContainer.add([
        this.settingModalContent,
        bgmText,
        this.bgmButton,
        seText,
        this.seButton,
        exitButton,
      ]);
      exitButton.on("pointerdown", () => {
        this.destroySettingModal();
      });
      this.bgmButton.on("pointerdown", () => {
        this.setIsAudioPlayable("BGM", !this.isBgmPlay);
      });
      this.seButton.on("pointerdown", () => {
        this.setIsAudioPlayable("SE", !this.isSePlay);
      });
    }
  }
  destroySettingModal() {
    if (this.settingModalContainer) {
      this.enableMainElements(true);
      this.input.on("pointermove", this.adjustShooting, this);
      this.settingModalContainer.destroy();
      this.overlay.destroy();
      this.isAnyModalOpen = false;
    }
  }
  // Pause modal to stop game temporarily
  showPauseModal() {
    if (!this.isAnyModalOpen) {
      this.isAnyModalOpen = true;
      this.input.off("pointermove");
      this.pauseModalContainer = this.add
        .container(0, 0)
        .setSize(400, 200)
        .setDepth(4);
      this.pauseModalContent = this.add
        .rectangle(
          game.config.width / 2,
          game.config.height / 2,
          400,
          160,
          0x4b3830
        )
        .setStrokeStyle(16, 0x4b3830);
      let homeButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "home"
        )
        .setScale(0.8)
        .setInteractive({ useHandCursor: true });
      let playButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "play"
        )
        .setScale(0.8)
        .setInteractive({ useHandCursor: true });
      let restartButton = this.add
        .image(
          game.config.width / 2 + 100,
          game.config.height / 2 - 100,
          "restart"
        )
        .setScale(0.8)
        .setInteractive({ useHandCursor: true });
      Phaser.Display.Align.In.QuickSet(
        homeButton,
        this.pauseModalContent,
        4,
        -24,
        0
      );
      Phaser.Display.Align.In.QuickSet(playButton, this.pauseModalContent, 6);
      Phaser.Display.Align.In.QuickSet(
        restartButton,
        this.pauseModalContent,
        8,
        -24,
        0
      );
      this.pauseModalContainer.add([
        this.pauseModalContent,
        homeButton,
        playButton,
        restartButton,
      ]);
      playButton.on("pointerdown", () => {
        this.destroyPauseModal();
      });
      homeButton.on("pointerdown", () => {
        this.backToHome();
      });
      restartButton.on("pointerdown", () => {
        this.restartTheTurn();
      });
    }
  }
  destroyPauseModal() {
    if (this.pauseModalContainer) {
      this.enableMainElements(true);
      this.input.on("pointermove", this.adjustShooting, this);
      this.pauseModalContainer.destroy();
      this.overlay.destroy();
      this.isAnyModalOpen = false;
    }
  }
  // turnToShop modal, for restarting the game
  showRestartModal() {
    this.isAnyModalOpen = true;
    this.restartModalContainer = this.add
      .container(0, 0)
      .setSize(400, 300)
      .setDepth(4);
    this.restartModalContent = this.add
      .rectangle(
        game.config.width / 2,
        game.config.height / 2,
        400,
        300,
        0x4b3830
      )
      .setStrokeStyle(16, 0x4b3830);

    // Estimated level judgement
    if (this.score >= 10000) {
      this.estimatedLevel = 10000;
    } else if (this.score >= 5000 && this.score < 10000) {
      this.estimatedLevel = 5000;
      localStorage.setItem("isDarkUnlocked", true);
    } else if (this.score >= 3000 && this.score < 5000) {
      this.estimatedLevel = 3000;
    } else if (this.score >= 1000 && this.score < 3000) {
      this.estimatedLevel = 1000;
    } else if (this.score >= 500 && this.score < 1000) {
      this.estimatedLevel = 500;
    } else if (this.score >= 300 && this.score < 500) {
      this.estimatedLevel = 300;
    } else if (this.score >= 100 && this.score < 300) {
      this.estimatedLevel = 100;
    } else {
      this.estimatedLevel = 0;
    }
    let currentEstimationGroup = this.estimationWord[this.estimatedLevel];
    let randomEstimateWord =
      currentEstimationGroup[
        (currentEstimationGroup.length * Math.random()) | 0
      ];
    let currentEstimationWord = this.add.text(
      game.config.width / 2 + 100,
      game.config.height / 2 - 100,
      randomEstimateWord,
      FONT_STYLES[this.langIndex]["ForEstimationText"]
    );
    let currentScoreText = this.add.text(
      game.config.width / 2 - 120,
      game.config.height / 2 - 75,
      CURRENT_SCORE_TITLE[this.langIndex],
      FONT_STYLES[this.langIndex]["ForEstiamtionTitle"]
    );
    let currentScoreData = this.add.text(
      game.config.width / 2 + 60,
      game.config.height / 2 - 75,
      this.score,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    let highestScoreText = this.add.text(
      game.config.width / 2 - 120,
      game.config.height / 2 - 125,
      HISTORY_HIGHEST_TITLE[this.langIndex],
      FONT_STYLES[this.langIndex]["ForEstiamtionTitle"]
    );
    let highestScoreData = this.add.text(
      game.config.width / 2 + 60,
      game.config.height / 2 - 125,
      this.highestHistoryScore,
      FONT_STYLES[this.langIndex]["ForPanelNumber"]
    );
    let homeButton = this.add
      .image(game.config.width / 2 + 100, game.config.height / 2 - 100, "home")
      .setScale(0.7)
      .setInteractive({ useHandCursor: true });
    let shopButton = this.add
      .image(game.config.width / 2 + 100, game.config.height / 2 - 100, "shop")
      .setScale(0.7)
      .setInteractive({ useHandCursor: true });
    let restartButton = this.add
      .image(
        game.config.width / 2 + 100,
        game.config.height / 2 - 100,
        "restart"
      )
      .setScale(0.7)
      .setInteractive({ useHandCursor: true });
    Phaser.Display.Align.In.QuickSet(
      currentEstimationWord,
      this.restartModalContent,
      6,
      0,
      10
    );
    Phaser.Display.Align.In.QuickSet(
      homeButton,
      this.restartModalContent,
      10,
      -30,
      -10
    );
    Phaser.Display.Align.In.QuickSet(
      shopButton,
      this.restartModalContent,
      11,
      0,
      -10
    );
    Phaser.Display.Align.In.QuickSet(
      restartButton,
      this.restartModalContent,
      12,
      -30,
      -10
    );
    this.restartModalContainer.add([
      this.restartModalContent,
      currentEstimationWord,
      highestScoreText,
      highestScoreData,
      currentScoreText,
      currentScoreData,
      homeButton,
      shopButton,
      restartButton,
    ]);
    homeButton.on("pointerdown", () => {
      this.backToHome();
    });
    shopButton.on("pointerdown", () => {
      this.turnToShop();
    });
    restartButton.on("pointerdown", () => {
      this.restartTheTurn();
    });
  }
  // Add text tween for special item when used
  addSpecialItemTweens(key, textX, textY, forY) {
    try {
      let screenText = this.add
        .text(
          textX,
          textY,
          SPECIAL_ITEM_TIP[this.langIndex][key],
          FONT_STYLES[this.langIndex]["ForItemUsed"]
        )
        .setStroke("#000000", 16);
      this.tweens.add({
        targets: screenText,
        y: forY,
        duration: 1500,
        onComplete: () => {
          screenText.destroy();
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  // Set audio in modal
  setIsAudioPlayable(setType, isPlayable) {
    let currentTexture = isPlayable ? "sound" : "nosound";
    if (setType == "BGM") {
      this.bgmButton.setTexture(currentTexture);
      this.isBgmPlay = isPlayable;
      localStorage.setItem("isBgmPlay", isPlayable);
      if (isPlayable) {
        this.audioPlayer.play();
      } else {
        this.audioPlayer.pause();
      }
    }
    if (setType == "SE") {
      this.seButton.setTexture(currentTexture);
      this.isSePlay = isPlayable;
      localStorage.setItem("isSePlay", isPlayable);
    }
  }
}
