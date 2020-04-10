import './index.css';
import Phaser from 'phaser';
import background_png from './assets/background.png';
import ground_png from './assets/ground.png';
import bird_png from './assets/bird.png';
import pipe_png from './assets/pipe.png';
import smallfont_png from './assets/smallfont.png';
import smallfont_fnt from './assets/smallfont.fnt';
import mediumfont_png from './assets/mediumfont.png';
import mediumfont_fnt from './assets/mediumfont.fnt';
import flappyfont_png from './assets/flappyfont.png';
import flappyfont_fnt from './assets/flappyfont.fnt';
import hugefont_png from './assets/hugefont.png';
import hugefont_fnt from './assets/hugefont.fnt';
import marios_way_mp3 from './assets/marios_way.mp3';
import explosion_wav from './assets/explosion.wav';
import hurt_wav from './assets/hurt.wav';
import jump_wav from './assets/jump.wav';
import score_wav from './assets/score.wav';
import { StateMachine } from './StateMachine';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    this.sm = new StateMachine(this);
    this.sm.collides = () => {
      this.scrolling = false;
    };

    this.backgroundScroll = 0;
    this.groundScroll = 0;

    this.keysPressed = new Map();
    this.scrolling = true;
  }

  preload() {
    this.load.image('background', background_png);
    this.load.image('ground', ground_png);
    this.load.image('bird', bird_png);
    this.load.image('pipe', pipe_png);
    this.load.bitmapFont('smallfont', smallfont_png, smallfont_fnt);
    this.load.bitmapFont('mediumfont', mediumfont_png, mediumfont_fnt);
    this.load.bitmapFont('flappyfont', flappyfont_png, flappyfont_fnt);
    this.load.bitmapFont('hugefont', hugefont_png, hugefont_fnt);
    this.load.audio('mario', marios_way_mp3);
    this.load.audio('explosion', explosion_wav);
    this.load.audio('jump', jump_wav);
    this.load.audio('hurt', hurt_wav);
    this.load.audio('score', score_wav);
  }

  create() {
    this.background = this.add.image(1000, -1000, 'background').setOrigin(0, 0);
    this.background.depth = 0;
    this.ground = this.add.image(-1000, -1000, 'ground').setOrigin(0, 0);
    this.ground.depth = 100;

    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.sm.create();
  }

  update(tm, dt) {
    if (this.scrolling) {
      dt /= 1000;
      if (
        this.keySpace.isDown ||
        this.keyEnter.isDown ||
        this.input.activePointer.isDown
      ) {
        this.keysPressed.set('enter', 1);
      }

      this.sm.update(dt);

      this.backgroundScroll += this.opts.backgroundScrollSpeed * dt;
      this.backgroundScroll %= this.opts.backgroundLoopingPoint;
      this.background.x = -this.backgroundScroll;
      this.background.y = 0;
      this.groundScroll += this.opts.groundScrollSpeed * dt;
      this.groundScroll %= this.opts.w;
      this.ground.x = -this.groundScroll;
      this.ground.y = this.opts.h - 16;
      this.sm.render();
    }

    this.keysPressed.clear();
  }
}

window.onload = () => {
  const resizeGame = () => {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  };

  const opts = {
    w: 512,
    h: 288,
    backgroundScrollSpeed: 30,
    groundScrollSpeed: 60,
    backgroundLoopingPoint: 413,
    gravity: 5,
    antigravity: 0.4,
    pipeSpawn: 2,
    pipeSpeed: 70,
    pipeGap: 100,
  };

  const mainScene = new MainScene(opts);

  const config = {
    width: opts.w,
    height: opts.h,
    backgroundColor: '#000000',
    type: Phaser.CANVAS,

    scene: [mainScene],
  };
  const game = new Phaser.Game(config);
  window.focus();
  resizeGame();
  window.addEventListener('resize', resizeGame);
};
