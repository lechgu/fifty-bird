import State from './State';

class ScoreState extends State {
  constructor(scene, sm) {
    super(scene);
    this.scene = scene;
    this.sm = sm;
  }

  enter(args) {
    this.score = args.score;
  }

  create() {
    this.scoreText = this.scene.add
      .bitmapText(-1000, -1000, 'flappyfont', '')
      .setOrigin(0, 0);
    this.enterText = this.scene.add
      .bitmapText(-1000, -1000, 'mediumfont', 'SPACE to play again')
      .setOrigin(0, 0);
  }

  exit() {
    this.scoreText.x = -1000;
    this.scoreText.y = -1000;
    this.enterText.x = -1000;
    this.enterText.y = -1000;
  }
  render() {
    this.scoreText.x = (this.scene.opts.w - this.scoreText.width) / 2;
    this.scoreText.y = 64;
    this.scoreText.text = `You lost ! Score: ${this.score}`;
    this.enterText.x = (this.scene.opts.w - this.enterText.width) / 2;
    this.enterText.y = 100;
  }

  update(dt) {
    if (this.scene.keysPressed.has('enter')) {
      this.sm.change('countdown');
    }
  }
}

export default ScoreState;
