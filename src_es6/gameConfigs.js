// Game Configs

// About special items
/* 
SPECIAL_ITEMS_EFFECTS:
HAPPY_BE_LAZY: Erase one line in a round, no bounce and cannot get item!
JUST_WANT_IT: Get coins as the number of blocks you broke
DOUBLE_BEANS_RUN: Double the number to reduce in collision of the balls in a round with bounce
ALL_YOU_FROZEN: Freeze all the shape line for a round, no bounce.
CYBER_IKUZO: Break the shapes in think shooting line, no bounce.
RED_TEMPER_BOMB: Bomb out the shapes around, no bounce
AKAMI_MAGIC: Pick up a random item from id 0~5
*/
const SPECIAL_ITEMS = {
  HAPPY_BE_LAZY: 0,
  JUST_WANT_IT: 1,
  DOUBLE_BEANS_RUN: 2,
  ALL_YOU_FROZEN: 3,
  CYBER_IKUZO: 4,
  RED_TEMPER_BOMB: 5,
  AKAMI_MAGIC: 6,
};

const SPECIAL_ITEM_TIP = [
  {
    HAPPY_BE_LAZY: "偷懒了~嘻嘻~",
    JUST_WANT_IT: "有钱真好啊~",
    DOUBLE_BEANS_RUN: "双人成行的美好时光~",
    ALL_YOU_FROZEN: "冻结时间！",
    CYBER_IKUZO: "勇者，出击！",
    RED_TEMPER_BOMB: "红温了！",
    AKAMI_MAGIC: "阿卡莱斯魔术，启动！",
  },
  {
    HAPPY_BE_LAZY: "Enjoy lazy time~",
    JUST_WANT_IT: "I am money love~",
    DOUBLE_BEANS_RUN: "Be Friend Forever!",
    ALL_YOU_FROZEN: "Freezing Time!",
    CYBER_IKUZO: "Cyber BEAMMMM!",
    RED_TEMPER_BOMB: "BOOM!",
    AKAMI_MAGIC: "AKAMI MAGIC! START!",
  },
  {
    HAPPY_BE_LAZY: "眠たいなぁ～",
    JUST_WANT_IT: "お金、欲しい！",
    DOUBLE_BEANS_RUN: "いつでも仲良し！",
    ALL_YOU_FROZEN: "これは、風吹雪",
    CYBER_IKUZO: "勇者、行くぞ！",
    RED_TEMPER_BOMB: "怒るだよ！",
    AKAMI_MAGIC: "アカミマジック！スタート！",
  },
];
// Font Styles
// ForPanelNumber: For the number data of the top and bottom panel
// ForTopPanelText: For the text of the top panel
// ForBottomPanelText: For the text of the bottom panel
// ForShopNumber: For the number data of the goods sold in the market
// ForShopText: Fot the text of the goods sold in the market
// ForShopTitleBefore: For the transition of the market before
// ForShopTitleAfter: For the transtion of the market after
// ForMerchantWords: For the words said by the merchant
// ForHangWords: For the hanging words at top of the market space
const FONT_STYLES = [
  {
    ForPanelNumber: {
      fontSize: 36,
      fontFamily: "Impact",
    },
    ForTopPanelText: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
    },
    ForBottomPanelText: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
    },
    ForShopNumber: {
      fontSize: 30,
      fontFamily: "Impact",
    },
    ForShopText: {
      fontSize: 24,
      fontFamily: "AlibabaFangYuan",
    },
    ForShopTitleBefore: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
      backgroundColor: "transparent",
      color: "white",
    },
    ForShopTitleAfter: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForMerchantWords: {
      fontSize: 24,
      fontFamily: "AlibabaFangYuan",
      color: "#000000",
    },
    ForHangWords: {
      fontSize: 28,
      fontFamily: "AlibabaFangYuan",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForAboutusText: {
      fontSize: 24,
      fontFamily: "AlibabaFangYuan",
    },
    ForEstiamtionTitle: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
    },
    ForEstimationText: {
      fontSize: 30,
      fontFamily: "AlibabaFangYuan",
      color: "#ffe945",
    },
    ForItemUsed: {
      fontSize: 36,
      fontFamily: "AlibabaFangYuan",
    },
    ForAudioDisplay: {
      fontSize: 24,
      fontFamily: "AlibabaFangYuan",
    },
  },
  {
    ForPanelNumber: {
      fontSize: 36,
      fontFamily: "Impact",
    },
    ForTopPanelText: {
      fontSize: 32,
      fontFamily: "Comic Sans MS",
    },
    ForBottomPanelText: {
      fontSize: 24,
      fontFamily: "Comic Sans MS",
      padding: 4,
    },
    ForShopNumber: {
      fontSize: 30,
      fontFamily: "Impact",
    },
    ForShopText: {
      fontSize: 16,
      fontFamily: "Comic Sans MS",
    },
    ForShopTitleBefore: {
      fontSize: 20,
      fontFamily: "Comic Sans MS",
      backgroundColor: "transparent",
      color: "white",
    },
    ForShopTitleAfter: {
      fontSize: 20,
      fontFamily: "Comic Sans MS",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForMerchantWords: {
      fontSize: 24,
      fontFamily: "Comic Sans MS",
      color: "#000000",
    },
    ForHangWords: {
      fontSize: 28,
      fontFamily: "Comic Sans MS",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForAboutusText: {
      fontSize: 24,
      fontFamily: "Comic Sans MS",
    },
    ForEstiamtionTitle: {
      fontSize: 22,
      padding: 6,
      fontFamily: "Comic Sans MS",
    },
    ForEstimationText: {
      fontSize: 28,
      fontFamily: "Comic Sans MS",
      color: "#ffe945",
    },
    ForItemUsed: {
      fontSize: 36,
      fontFamily: "Comic Sans MS",
      padding: 8,
    },
  },
  {
    ForPanelNumber: {
      fontSize: 36,
      fontFamily: "Impact",
    },
    ForTopPanelText: {
      fontSize: 32,
      fontFamily: "HGGothicE",
    },
    ForBottomPanelText: {
      fontSize: 30,
      fontFamily: "HGGothicE",
      padding: 4,
    },
    ForShopNumber: {
      fontSize: 30,
      fontFamily: "Impact",
    },
    ForShopText: {
      fontSize: 22,
      fontFamily: "HGGothicE",
    },
    ForShopTitleBefore: {
      fontSize: 36,
      fontFamily: "HGGothicE",
      backgroundColor: "transparent",
      color: "white",
    },
    ForShopTitleAfter: {
      fontSize: 36,
      fontFamily: "HGGothicE",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForMerchantWords: {
      fontSize: 24,
      fontFamily: "HGGothicE",
      color: "black",
    },
    ForHangWords: {
      fontSize: 28,
      fontFamily: "HGGothicE",
      backgroundColor: "white",
      color: "#3b2820",
    },
    ForAboutusText: {
      fontSize: 24,
      fontFamily: "HGGothicE",
    },
    ForEstiamtionTitle: {
      fontSize: 32,
      fontFamily: "HGGothicE",
      padding: 4,
    },
    ForEstimationText: {
      fontSize: 30,
      fontFamily: "HGGothicE",
      color: "#ffe945",
    },
    ForItemUsed: {
      fontSize: 32,
      fontFamily: "HGGothicE",
    },
  },
];

// Game Start Scene Texts
const LANG_TITLES = ["语言", "LANG", "言語設定"];
const LANG_OPTION_TEXTS = [
  ["中文", "英语", "日语"],
  ["CN", "EN", "JP"],
  ["中国語", "英語", "日本語"],
];
const ABOUT_US_TITLES = ["关于", "ABOUT", "関して"];
const ABOUT_US_TEXTS = [
  "谨以纪念黄豆小组的愉快时光。",
  "To Remember Happy Days \nin Yellow Bean Team.",
  "「豆」チームに楽しい日々を\n記念する為に…",
];

// Game Shop Scene Texts
const LIGHT_SHOP_TITLE = [
  "黄豆海鲜市场",
  "YellowBean SeaFood Shop",
  "表・豆豆屋",
];
const DARK_SHOP_TITLE = [
  "黑豆咩咩市场",
  "BlackBean Maa-Maa Shop",
  "裏・豆豆屋",
];
const LIGHT_SHOP_HANG_WORD = [
  "点击道具即可购买！记得有钱！",
  "Click the item to purchase in~",
  "クリックして買える、お金あったら！",
];
const DARK_SHOP_HANG_WORD = [
  "点击商品即可入手捏~有钱的话~",
  "Click the power to purchase in~",
  "クリックしてゲットだ～お金足りだか？",
];
const CURRENT_ITEMS_TITLE = ["持有道具", "Current Items", "持ちアイテム"];
const CURRENT_POWERS_TITLE = [
  ["持有黄豆", "持有方块", "持有音效"],
  ["Current Bean", "Current Block", "Current Sound"],
  ["持ち豆", "持ちブロック", "持ち音"],
];
const LIGHT_MERCHANT_WORDS = [
  [
    "人生像浓豆浆\n一样一团浆糊......",
    "好玩吗？这不好\n玩，单纯是你太\n无聊了而已。",
    "我们不过是\n舞台上的摆设\n，想扔就扔......",
    "我想抽却不\n能抽你~没有\n你世界只剩死寂~",
    "买道具要适度\n！打完一把就走！",
    "我顶飞你啊！\n",
  ],
  [
    "Life is just a\n mess like\n bean salad",
    "Do you think\n this game\n interesting?\n Perhaps not!",
    "We are NPCs,\n remembered \n or forgotten...",
    "Do you feel\n better today?",
    "Special items\n can be good,\n but cost money!",
    "***Filterd***",
  ],
  [
    "悲劇を避ける\n為に、今から\n悪いことしないで\nほうがいいよ．．．",
    "いい世、来い？\nかもしれませんね。",
    "苦しいけど、\n出来るなら\n出来るまで\n生きている．．．",
    "一生で忘れない、\nそんな話、\nちょっと悲しみを\n感じるちゃん．．．",
    "8時間眠できる\nはいい文明だぞ！",
    "好き人いなら\n告白しよう？",
  ],
];
const DARK_MERCHANT_WORDS = [
  [
    "哼！居然被你\n发现了咩咩市场！\n买了皮肤也不能\n让你强大哦！",
    "给了足够的钱\n才能开放好玩的\n东西哦！\n再玩几下吧~",
    "苦痛的生活也要\n坚强起来啊......\n活下去吧亲。",
  ],
  [
    "I don't think\n how you deed\n any relation\n with the cover...",
    "No enough coin~ \nHow dare you\n to open one?",
    "Already go so\n far... Be brave,\n and may\n you good life~",
  ],
  [
    "ある時、実力は\n使い物の形とは\n関係ない、かも\nしれませんね。",
    "お金が足りて、\n面白いことを\n開放されでき\nだなぁ！",
    "悲しいですか？\n諦めないで、\n人生はまだ\n終わらない！",
  ],
];
const LIGHT_TIP_WORDS = [
  "豆币不够诶！",
  "Coin no enough!",
  "コイン、足りないだぞ？",
];
const DARK_TIP_WORDS = [
  "豆币不够\n可以去挣哦？",
  "Maybe you need more coins~",
  "コイン足りない\nよ？頑張ってね！",
];
const LIGHT_FINAL_WORDS = [
  "该去咩咩市场找\n安慰哦？你这\n没礼貌的家伙......",
  "So rude! Go\n Maa-Maa Shop\n for comforts,\n please?",
  "失礼よお前．．．\n裏・豆豆屋に\nほうがいいぞ．．．",
];
const DARK_FINAL_WORDS = [
  "愿你的内心\n如梦境般安宁......\n我亲爱的勇者\n大人......",
  "May you heart\n peace like dream.\n My Dear Mr.\n Adventurer...",
  "心の中、夢のよう\nな、穏やかなに、\nいいですよね．．．\n我らの勇者様．．．",
];
// Only for Chinese! The name of the audios
const AUDIO_NAME = ["默认", "吉吉国\n的谜之声", "草场最\n可爱的一集"];
// Name of the special items
const SPECIAL_ITEM_NAME = [
  [
    "偷懒是好文明",
    "好想要有钱啊",
    "俩黄豆跑得快",
    "塞可罗吉之雪",
    "勇者光炮出击",
    "红温的爆爆爆",
    "阿卡莱斯魔术",
  ],
  [
    "HAPPY_BE_LAZY",
    "JUST_WANT_IT",
    "DOUBLE_BEANS_RUN",
    "ALL_YOU_FROZEN",
    "CYBER_IKUZO",
    "RED_TEMPER_BOMB",
    "AKAMI_MAGIC",
  ],
  [
    "眠たいね～",
    "千兆円欲しい！",
    "お二つは走るよ",
    "凍るだよ？",
    "勇者、行くぞ！",
    "怒るなぁ俺！",
    "アカミマジック",
  ],
];

// Game Play Scene Texts and Options
// Panel texts
const COIN_TITLE = ["豆币", "Coin", "コイン"];
const SCORE_TITLE = ["得分", "Score", "スコア"];
const BEAN_TITLE = ["黄豆", "Bean", "豆"];
const ITEM_TITLE = ["道具", "Item", "アイテム"];
const HISTORY_HIGHEST_TITLE = ["历史最高", "History Highest", "歴史最高"];
const CURRENT_SCORE_TITLE = ["本次得分", "Current Score", "今回点数"];
// Game options
const GAME_OPTIONS = {
  BALL_SIZE: 0.09,
  BALL_SPEED: 2000,
  SHAPES_PER_LINE: 8,
  SHAPES_ALL_LINES: 10,
  MAX_SHAPES_NUM_PER_LINE: 4,
  EXTRA_BEAN_PROBABILITY: 80,
  PREDICTIVE_SHOOTING_TRAIL_LENGTH: 2000,
  SPECIAL_ITEM_SIZE: 0.1,
  SPECIAL_ITEM_PROBABILTIY: 20,
};
// Game states for state machine
const GAME_STATES = {
  WAITING_FOR_SHOOTING: 0,
  PLAYER_AIMING: 1,
  BALL_FLYING: 2,
  BALL_COLLPSING: 3,
  RECYCLING_FOR_NEXT: 4,
  BOOM_FLYING: 5,
  BEAM_FLYING: 6,
};
// Rand tint colors for blocks
const COLOR_TINTS = [
  "0x8a2c24",
  "0xffdd6e",
  "0x66c204",
  "0x03aba8",
  "0x0099bf",
  "0x8a3b94",
  "0x82003d",
];
// Words for Estimation Time
const ESTIMATION_WORDS = [
  {
    0: [
      "杂鱼杂鱼~才打这么点~",
      "YOU DIED（菜就多练）",
      "会认可这样草率的结局吗......",
    ],
    100: ["这样啊......", "旅途才刚刚开始哦~", "要加油哦，勇者大人！"],
    300: [
      "要奖励你一块小蛋糕吗？",
      "有时候不要太勉强自己哦？",
      "变强可不是一天\n就能完成的事情呢。",
    ],
    500: [
      "点个火吧。\n让我们休息一会儿...",
      "回过头来，\n没有后悔药了呢。",
      "我们会打败那里的风车吗？",
    ],
    1000: [
      "据说新王会在信念中诞生哦？",
      "已经走了这么远了啊......",
      "很厉害了啊，\n像那迫近的风暴.....",
    ],
    3000: ["心怀着希望前进吧。", "真乃勇士也......", "强大，无需多言。"],
    5000: [
      "好像解锁了神秘的地方？",
      "传说，出现了啊。",
      "辛苦了。\n为您献上一杯卡布奇诺~",
    ],
    10000: [
      "在此见证新王的诞生......",
      "已经到这里了，\n还要战斗下去吗？",
      "或许不会是最后的结局......",
    ],
  },
  {
    0: [
      "Better to take it seriously?",
      "YOU DIED (Joke)",
      "Not mind ending so fast?...",
    ],
    100: [
      "So it goes...",
      "Trip just begins here~",
      "Fighting, Mr.Adventurer!",
    ],
    300: [
      "A piece of cake for you?",
      "Sometimes do not do\n what out of your ability...",
      "Rome is not built in a day...",
    ],
    500: [
      "Lit a fire.\n Let's take a break.",
      "Look back,\n no chance for regret.",
      "Do you think we could\n defeat the windmill there?",
    ],
    1000: [
      "It's said, New Lord would\n be born in the belief, right?",
      "Already gone so far...\n Brave man...",
      "Like the storm approaching,\n in my eyes...",
    ],
    3000: [
      "Go ahead! With hope in heart.",
      "You brave adventurer...",
      "So strong. No more words...",
    ],
    5000: [
      "Somewhere unlocked?",
      "Legend, appears now...",
      "Would you like a cup of Latte?\n Just for you.",
    ],
    10000: [
      "Here. Witness\n the born of the New Lord!",
      "Feel tired?\n If so, may you good rest...",
      "Adventure would not end\n here? Maybe... ",
    ],
  },
  {
    0: [
      "雑魚雑魚～弱いかもね？",
      "YOU DIED（大噓）",
      "こんな草な結局、\n受け取っていい？",
    ],
    100: ["そうですね．．．", "旅は、ただ始まるぞ？", "頑張てね！勇者様！"],
    300: [
      "おケーキ、食べ欲しい？\nこれ、差しれ～",
      "ある時、\n無理しないでください。",
      "強いになることは、\n一日中できないですよ～",
    ],
    500: [
      "焚き火をつけて、\n少々休みましょう．．．",
      "振り返って、\n後悔の機会がないぞ？",
      "我らは、あそこの風車を\n倒すこと、できるか？",
    ],
    1000: [
      "新しいの王様は、\n信念の中で現れるかもよ？",
      "もう、ここにいるか．．．",
      "すごいな．．．\n嵐のように．．．",
    ],
    3000: [
      "希望を持って、\n前に歩き行こう．．．",
      "さすが勇者様だ．．．",
      "強さを、\nもう言えない．．．",
    ],
    5000: [
      "ある場所は\n開放でしょうか．．．",
      "伝説が、始まる．．．",
      "お疲れ様です。モカ\nコーヒー、いかがですか？",
    ],
    10000: [
      "ここに、\n新しいの王様がある。",
      "ちょっと、疲れた．．．",
      "ここは、\n最後の結局ですか？",
    ],
  },
];

export {
  SPECIAL_ITEMS,
  SPECIAL_ITEM_TIP,
  FONT_STYLES,
  LANG_TITLES,
  LANG_OPTION_TEXTS,
  ABOUT_US_TITLES,
  ABOUT_US_TEXTS,
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
  SCORE_TITLE,
  BEAN_TITLE,
  ITEM_TITLE,
  HISTORY_HIGHEST_TITLE,
  CURRENT_SCORE_TITLE,
  GAME_OPTIONS,
  GAME_STATES,
  COLOR_TINTS,
  ESTIMATION_WORDS,
};


