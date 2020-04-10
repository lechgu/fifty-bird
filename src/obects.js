class Bird {
  constructor(scene) {
    this.scene = scene;
    this.opts = scene.opts;
  }

  reset() {
    this.x = 100;
    this.y = 100;
  }

  create() {
    this.sprite = this.scene.add.image(-1000, -1000, 'bird').setOrigin(0, 0);
    this.sprite.depth = 2;
    this.x = (this.opts.w - this.sprite.width) / 3;
    this.y = (this.opts.h - this.sprite.height) / 2;
    this.dy = 0;
    this.w = this.sprite.width;
    this.h = this.sprite.height;
  }

  update(dt) {
    this.dy += this.opts.gravity * dt;
    if (
      this.scene.keysPressed.has('space') ||
      this.scene.keysPressed.has('enter')
    ) {
      this.dy -= this.opts.antigravity;
      this.scene.sound.play('jump', { volume: 0.1 });
    }
    this.y += this.dy;
  }

  render() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  getRect() {
    return {
      x: this.x + 2,
      y: this.y + 2,
      w: this.w,
      h: this.h,
    };
  }
}

class Pipe {
  constructor(scene, x, y) {
    this.opts = scene.opts;
    this.scene = scene;
    this.x = x;
    this.y = y;
  }

  create() {
    this.topPart = this.scene.add.image(-1000, -1000, 'pipe').setOrigin(0, 0);
    this.topPart.flipY = true;
    this.bottomPart = this.scene.add
      .image(-1000, -1000, 'pipe')
      .setOrigin(0, 0);
    this.bottomPart.depth = 1;
    this.bottomPart.depth = 1;
    this.w = this.bottomPart.width;
    this.h = this.bottomPart.height;
  }

  destroy() {
    this.topPart.destroy();
    this.bottomPart.destroy();
  }

  update(dt) {
    this.x -= this.opts.pipeSpeed * dt;
  }

  render() {
    this.bottomPart.x = this.x;
    this.bottomPart.y = this.y;
    this.topPart.x = this.x;
    this.topPart.y = this.y - this.opts.pipeGap - this.h;
  }

  getBottomRect() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
  }

  getTopRect() {
    return {
      x: this.x,
      y: this.y - this.opts.pipeGap - this.h,
      w: this.w,
      h: this.h,
    };
  }
}

export { Bird, Pipe };
