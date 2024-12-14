# Yellow Bean Bean

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

- [Yellow Bean Bean](#yellow-bean-bean)
  - [黄豆邦邦（中文）](#黄豆邦邦中文)
    - [简介](#简介)
    - [版本日志](#版本日志)
      - [1.0.0 版本](#100-版本)
    - [关于素材](#关于素材)
    - [参考](#参考)
    - [鸣谢](#鸣谢)
    - [联系](#联系)
  - [Yellow Bean Bean (English)](#yellow-bean-bean-english)
    - [Introduction](#introduction)
    - [Changelog](#changelog)
      - [Ver 1.0.0](#ver-100)
    - [About Materials](#about-materials)
    - [Reference](#reference)
    - [Credits](#credits)
    - [Contact](#contact)
  - [豆豆バンバン（日本語）](#豆豆バンバン日本語)
    - [紹介](#紹介)
    - [変更ログ](#変更ログ)
      - [バージョン 1.0.0](#バージョン-100)
    - [素材について](#素材について)
    - [参考説明](#参考説明)
    - [感謝](#感謝)
    - [連絡について](#連絡について)

---

## 黄豆邦邦（中文）

### 简介

简单的网页小游戏。使用的游戏框架为 **[Phaser](https://phaser.io/)**。本项目遵循 MIT 协议。

**谨以纪念一段美好的时光。希望以后都能一直好下去。**

### 版本日志

#### 1.0.0 版本

初次发布于 2024 年 12 月。大概会有需要改进的地方......

已知的 bug：

1. 部分道具在连点的时候会导致小游戏卡死，或出现道具元素无法删除的情况；
2. 当豆子与多个道具碰撞间隔过短的时候，道具栏中道具会产生重叠；
3. 页面的适配和样式需要优化。

预计 2025 年春抽时间修改。

### 关于素材

除 icons 文件夹中的图标（来自 Google Fonts）以外，小游戏中其他所有的图像素材均为**自己独立绘制！** 音频文件中的 bgm.mp3 为**自己独立编曲！**

icons 文件夹中图标素材的相关信息如下。

|   文件名    | Google Fonts 对应名称 |     样式     |
| :---------: | :-------------------: | :----------: |
|  close.png  |         Close         |   Rounded    |
|  home.png   |         Home          | Fill,Rounded |
| nosound.png |       No Sound        | Fill,Rounded |
|  pause.png  |         Pause         | Fill,Rounded |
|  play.png   |      Play Arrow       | Fill,Rounded |
| restart.png |        Refresh        |   Rounded    |
| setting.png |       Settings        | Fill,Rounded |
|  shop.png   |     Shopping Cart     | Fill,Rounded |
|  sound.png  |    Brand Awareness    | Fill,Rounded |

除 bgm.mp3 文件外，使用到的音频文件素材的相关信息如下：

|   文件名   |             原名称             |          链接           |
| :--------: | :----------------------------: | :---------------------: |
| beam0.mp3  |       激光炮火力 HV.385        | <https://www.aigei.com> |
| beam1.mp3  |        电棍-不可以（）         | <https://www.aigei.com> |
| beam2.mp3  |         东海帝皇“wow”          | <https://www.aigei.com> |
| block0.mp3 |             叮咚~              | <https://www.aigei.com> |
| block1.mp3 |       欧内的手 好汉 (2)        | <https://www.aigei.com> |
| block2.mp3 |          诗歌剧-曼波           | <https://www.aigei.com> |
| boom0.mp3  |           击中-爆炸            | <https://www.aigei.com> |
| boom1.mp3  |         75750-电棍冲刺         | <https://www.aigei.com> |
| boom2.mp3  | 阿米诺斯啊米诺斯赛马娘东海帝皇 | <https://www.aigei.com> |
|  ding.mp3  |        游戏小球对象木打        | <https://www.aigei.com> |

为支持多语言，使用到的字体的相关信息如下：

|   语言   |          字体          |
| :------: | :--------------------: |
| 简体中文 | 阿里巴巴方圆体, Impact |
|   英语   | Comic Sans MS, Impact  |
|   日语   |   HGGothicE, Impact    |

以上为小游戏中图像文件、音频文件与语言字体的信息说明。如无意侵权，请告知本人！本人会立刻处理替换！谢谢！

此外，若素材文件的使用有争议或不当的地方，请指出。本人会适当考虑处理......

### 参考

小游戏开发的相关参考如下：

1. **Phaser** 游戏框架 API 文档：<https://docs.phaser.io/phaser/getting-started/what-is-phaser/>
2. **Phaser** 游戏框架 API 使用示例：<https://www.emanueleferonato.com/>
3. **Emanuele Feronato 女士的博客**中关于 Ballz 类小游戏的原型制作分享：<https://www.emanueleferonato.com/tag/ballz/>
4. 怎样在 **Phaser** 游戏框架中使用本地定制字体： <https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3>
5. Webpack 文档： <https://webpack.js.org/concepts/>
6. Vite 文档： <https://vite.dev/guide/>

代码部分参考了 **Emanuele Feronato 女士的博客**。（参考部分已注释）简单的动画效果、特殊道具的工作逻辑参考了 **Phaser** 游戏框架的 API 文档与 使用示例。定制字体方面则是采取了 Stack Overflow 中的解决方案。最后是依据 Webpack 和 Vite 的文档，分别尝试对小游戏进行了不同的打包。

### 鸣谢

特别感谢 **Emanuele Feronato 女士** 在博客中关于 H5 小游戏开发的知识分享！让我学到了很多！感谢学习期间，黄豆小组的朋友们的支持与帮助！也感谢 T.A. 老师的相关建议！感谢各位！祝愿一切都好！

### 联系

如果在小游戏游玩过程中遇到 bug，请邮箱联系我并反馈。

另外，如果有好的建议或想法愿意交流，也可以邮箱联系。谢谢~

[(回到顶部)](#yellow-bean-bean)

---

## Yellow Bean Bean (English)

### Introduction

A simple mini-game, developed with [Phaser](https://phaser.io/) framework. Under MIT License.

**To remember the beautiful time with friends in Yellow-Bean Team. May everything well...**

### Changelog

#### Ver 1.0.0

The first version released in December, 2024. Perhaps there some bugs to fix...

Known bugs：

1. If click some item twice or more time then would appear duplication or game stuck;
2. When the interval of bean-vs-special-item collision too short at the item area items would overlap;
3. The style and scale of the game should be promoted.

If available it would be fixed in spring of 2025.

### About Materials

Except icon images in icons folder from Google Material Icons, all of the rest image materials in this game is painted **by myself!** Besides, the audio file bgm.mp3 is also made **by myself!**

Information about images in icons folder as below.

|  Filename   | Original Name in Google Fonts |    Style     |
| :---------: | :---------------------------: | :----------: |
|  close.png  |             Close             |   Rounded    |
|  home.png   |             Home              | Fill,Rounded |
| nosound.png |           No Sound            | Fill,Rounded |
|  pause.png  |             Pause             | Fill,Rounded |
|  play.png   |          Play Arrow           | Fill,Rounded |
| restart.png |            Refresh            |   Rounded    |
| setting.png |           Settings            | Fill,Rounded |
|  shop.png   |         Shopping Cart         | Fill,Rounded |
|  sound.png  |        Brand Awareness        | Fill,Rounded |

Information about audio materials as below.

|  Filename  | Original Name in Website |          Link           |
| :--------: | :----------------------: | :---------------------: |
| beam0.mp3  |    激光炮火力 HV.385     | <https://www.aigei.com> |
| block0.mp3 |          叮咚~           | <https://www.aigei.com> |
| boom0.mp3  |        击中－爆炸        | <https://www.aigei.com> |
|  ding.mp3  |     游戏小球对象木打     | <https://www.aigei.com> |

And here is information about the fonts used in the mini-game to support multi-language.

|      Language      |          Fonts           |
| :----------------: | :----------------------: |
| Simplified Chinese | Alibaba Fangyuan, Impact |
|      English       |  Comic Sans MS, Impact   |
|      Japanese      |    HGGothicE, Impact     |

All above is about how image, audio and font materials used in mini-game. If anything violates indeliberately, please contact me! I'd replace them quickly if that case. Besides you can point it out if there's something not proper. I'd consider it, too.

### Reference

References of the mini-game are as below.

1. Document of **Phaser**: <https://docs.phaser.io/phaser/getting-started/what-is-phaser/>
2. Lab examples of **Phaser**: <https://www.emanueleferonato.com/>
3. Dev shares of Ballz-like mini-game prototypes in **Mr. Emanuele Feronato's blog**: <https://www.emanueleferonato.com/tag/ballz/>
4. How to use a local font in Phaser 3： <https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3>
5. Document of **Webpack**: <https://webpack.js.org/concepts/>
6. Document of **Vite**: <https://vite.dev/guide/>

The code part refers to Mr. Emanuele Feronato's Blog. (Reference part marked already) Simple animation and working logic of special items refer to the API document and examples of **Phaser** framework. Customized font is adopted with the solution in Stack Overflow. Lastly the mini-game is packed in different ways, based on the guidance of Webpack and vite.

### Credits

Special thank Mr. Emanuele Feronato for great shares about H5 game development in blog, which help me a lot and deepen my understanding in games. I like those posts a lot and can not express my thanks more! Thanks for supports and helps of friends in Yellow Bean Team these studying time! And also thanks for Mr. T.A.'s suggestion.

Much appreciated and wish everything well!

### Contact

If any bug when playing mini-game, reflect to me in email, please. If any good suggestion and idea to discuss, email is OK, too. Thanks.

[(Back to Top)](#yellow-bean-bean)

---

## 豆豆バンバン（日本語）

### 紹介

簡単なミニゲーム、一つと申します。使いゲームフレームワークは　[Phaser](https://phaser.io/)　です。MIT ライセンスを従えます。

**あの時の、あのチームの友達の為に、これを作る。皆様、いってらっしゃい。**

### 変更ログ

#### バージョン 1.0.0

最初のリリースです、2024 年 12 月に。バグがあること、かもしれないね。

あるバグがここに申します：

１．アイテムをクリックするのが二回以上時、重複ことかスタックことがあるかもしれないね；
２．アイテムのオーバーラップが発生する、豆豆とアイテムをぶつかる時間短いすぎるならば；
３．様式とか美化することがまだできる。

暇たら２０２５年春でバグフィックスしよう予定です。

### 素材について

このミニゲームには、icons フォルダ中のアイコンを除いて、他の全て画像素材は私に一人で作られだ。それ以外、音声素材の　 bgm.mp3 も一人で完成された。

icons フォルダの画像素材のインフォメーションが、ここに説明します。

| ファイル名  | Google Fonts 中の原ファイル名 |     様式     |
| :---------: | :---------------------------: | :----------: |
|  close.png  |             Close             |   Rounded    |
|  home.png   |             Home              | Fill,Rounded |
| nosound.png |           No Sound            | Fill,Rounded |
|  pause.png  |             Pause             | Fill,Rounded |
|  play.png   |          Play Arrow           | Fill,Rounded |
| restart.png |            Refresh            |   Rounded    |
| setting.png |           Settings            | Fill,Rounded |
|  shop.png   |         Shopping Cart         | Fill,Rounded |
|  sound.png  |        Brand Awareness        | Fill,Rounded |

音声素材のインフォメーションがこちらに説明します。

| ファイル名 |   原ファイル名    |         リンク          |
| :--------: | :---------------: | :---------------------: |
| beam0.mp3  | 激光炮火力 HV.385 | <https://www.aigei.com> |
| block0.mp3 |       叮咚~       | <https://www.aigei.com> |
| boom0.mp3  |    击中－爆炸     | <https://www.aigei.com> |
|  ding.mp3  | 游戏小球对象木打  | <https://www.aigei.com> |

使い字体のインフォメーションもここにあります。

|  言語  |           字体           |
| :----: | :----------------------: |
| 中国語 | Alibaba Fangyuan, Impact |
|  英語  |  Comic Sans MS, Impact   |
| 日本語 |    HGGothicE, Impact     |

以上は、ミニゲームに、画像と音声と字体の利用状況です。コピーライトに違反することあれば、お知らせください。その状況とは、ぜひ素材を変更しよう。他に、不適切なものも指摘されできる。私もそれぞれを考えよう。

### 参考説明

ミニゲームの参考が、ここに説明する。

1. **Phaser** ドキュメント: <https://docs.phaser.io/phaser/getting-started/what-is-phaser/>
2. **Phaser**使用例: <https://www.emanueleferonato.com/>
3. **Mr. Emanuele Feronato**のブログに ballz を相関するポスト: <https://www.emanueleferonato.com/tag/ballz/>
4. **Phaser**で字体の使い方： <https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3>
5. Webpack ドキュメント ： <https://webpack.js.org/concepts/>
6. Vite ドキュメント： <https://vite.dev/guide/>

コードの部分が、Emanuele Feronato 先生のブログのポストに参考しました。（参考の分が、もうマークした）簡単な動画とスペシャルアイテムのロジックが、Phaser フレームワークのドキュメントと例に参照した。多言語の為、Stack Overflow から解決を採用する。最後に、Webpack と Vite のドキュメントによって、コードをパックするのを完成した。

### 感謝

ここ、Mr. Emanuele Feronato に心より感謝申し上げます！ブログに HTML5 ゲーム開発を関するポストは、私をたくさん助けたと思います！それで、豆チームの皆様へ、今までのサポートを、本当にありがとうございます！後で、T.A.先生の意見もありがどう！

感謝の言葉を、もう一つだけ言えない。今後の幸運を、お祈りしています。

### 連絡について

遊ぶ時に、バグがあったら、私までご連絡お願いします。以外に、いい提案かアイデアもあったら、イーメールで連絡するとは、十分にありがとうございます。

[（トップへ戻る）](#yellow-bean-bean)
