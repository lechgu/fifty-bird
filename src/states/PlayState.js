import { Bird, Pipe } from '../obects';
import { collides } from '../utils';
import State from './State';

class PlayState extends State {
  constructor(scene, sm) {
    super(scene);
    this.scene = scene;
    this.sm = sm;
    this.opts = this.scene.opts;
    this.bird = new Bird(this.scene);
    this.pipes = new Map();

    this.score = 0;
  }

  enter() {
    this.pipes.forEach((pipe) => {
      pipe.destroy();
    });
    this.pipes.clear();
    this.spawnInterval = 0;
    this.lastY = this.opts.h / 2;
    this.score = 0;
    this.bird.reset();
    this.scene.keysPressed.clear();
    this.music.play({ loop: true, volume: 0.5 });
  }

  exit() {
    this.music.stop();
    this.bird.x = -1000;
    this.bird.y = -1000;
    this.bird.render();
    this.pipes.forEach((pipe) => {
      pipe.x = -1000;
      pipe.y = -1000;
      pipe.render();
    });
  }

  create() {
    this.bird.create();
    this.scoreText = this.scene.add.bitmapText(-1000, -1000, 'mediumfont', '');
    this.scoreText.depth = 80;
    this.music = this.scene.sound.add('mario');
  }
  update(dt) {
    this.spawnInterval += dt;
    if (this.spawnInterval > this.opts.pipeSpawn) {
      const pipe = new Pipe(this.scene, this.opts.w, this.lastY);
      pipe.create();
      this.pipes.set(pipe, pipe);
      this.spawnInterval = 0;
      this.lastY += Phaser.Math.FloatBetween(-30, 30);
      this.lastY = Phaser.Math.Clamp(
        this.lastY,
        this.opts.h / 4,
        (this.opts.h / 4) * 3
      );
    }

    this.pipes.forEach((pipe) => {
      pipe.update(dt);
      if (pipe.x < -pipe.w) {
        this.pipes.delete(pipe);
        pipe.destroy();
      }
    });
    this.bird.update(dt);

    const birdRc = this.bird.getRect();
    birdRc.x += 2;
    birdRc.w -= 4;
    birdRc.y += 2;
    birdRc.h -= 4;

    this.pipes.forEach((pipe) => {
      pipe.update(dt);
      pipe.render();
      const bottomRc = pipe.getBottomRect();
      const topRc = pipe.getTopRect();

      if (collides(birdRc, bottomRc) || collides(birdRc, topRc)) {
        this.scene.sound.play('explosion');
        this.sm.change('score', { score: this.score });
      }
      if (!pipe.scored) {
        if (birdRc.x > pipe.x + pipe.w) {
          this.score += 1;
          pipe.scored = true;
          this.scene.sound.play('score');
        }
      }
    });
    if (birdRc.y > this.scene.opts.h - birdRc.h) {
      this.scene.sound.play('explosion');
      this.sm.change('score', { score: this.score });
    }

    if (birdRc.y < 0) {
      this.score = 0;
    }
  }

  render() {
    this.pipes.forEach((pipe) => {
      pipe.render();
    });
    this.bird.render();
    this.scoreText.text = `Score: ${this.score}`;
    this.scoreText.x = 8;
    this.scoreText.y = 8;
  }
}

export default PlayState;
