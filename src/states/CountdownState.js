import State from './State';

class CountdownState extends State {
  constructor(scene, sm) {
    super(scene);
    this.scene = scene;
    this.sm = sm;
    this.count = 3;
    this.countdownTime = 0.75;
    this.timer = 0;
  }

  create() {
    this.countdown = this.scene.add
      .bitmapText(-1000, -1000, 'hugefont', '')
      .setOrigin(0, 0);
  }

  enter() {
    this.count = 3;
    this.timer = 0;
  }

  exit() {
    this.countdown.x = -1000;
    this.countdown.y = -1000;
  }

  update(dt) {
    this.timer += dt;
    if (this.timer > this.countdownTime) {
      this.timer = this.timer % this.countdownTime;
      this.count = this.count - 1;
      if (this.count == 0) {
        this.sm.change('play');
      }
    }
  }

  render() {
    this.countdown.text = `${this.count}`;
    this.countdown.x = 100 - this.countdown.width / 2;
    this.countdown.y = 100 - this.countdown.height / 2;
    console.log(this.count);
  }
}

export default CountdownState;
