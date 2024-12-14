// Icon Button
class IconButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, event) {
    // scale
    super(scene, x, y, texture);
    this.setInteractive({
      useHandCursor: true,
    });
    // this.iconButton = this.add.image(x, y, texture);
    scene.add.existing(this);
  }
}
