import State from './State';

class TitleState extends State {
  constructor(scene, sm) {
    super(scene);
    this.scene = scene;
    this.sm = sm;
  }

  create() {
    this.scoreText = this.scene.add
      .bitmapText(-1000, -1000, 'flappyfont', '')
      .setOrigin(0, 0);
    this.enterText = this.scene.add
      .bitmapText(-1000, -1000, 'mediumfont', 'SPACE to start')
      .setOrigin(0, 0);
  }

  exit() {
    this.scoreText.destroy();
    this.enterText.destroy();
  }
  render() {
    this.scoreText.x = (this.scene.opts.w - this.scoreText.width) / 2;
    this.scoreText.y = 64;
    this.scoreText.texy = `Score: ${this.score}`;
    this.enterText.x = (this.scene.opts.w - this.enterText.width) / 2;
    this.enterText.y = 100;
  }

  update(dt) {
    if (this.scene.keysPressed.has('enter')) {
      this.sm.change('countdown');
    }
  }
}

export default TitleState;
