import State from './states/State';
import TitleState from './states/TitleState';
import PlayState from './states/PlayState';
import ScoreState from './states/ScoreState';
import CountdownState from './states/CountdownState';

class StateMachine {
  constructor(scene) {
    this.scene = scene;
    this.state = new State(scene);
    this.states = new Map();
    let state = new TitleState(this.scene, this);
    this.states.set('title', state);

    state = new PlayState(this.scene, this);
    this.states.set('play', state);

    state = new ScoreState(this.scene, this);
    this.states.set('score', state);

    state = new CountdownState(this.scene, this);
    this.states.set('countdown', state);

    this.change('title', {});
  }

  create() {
    this.states.forEach((state, key) => {
      state.create();
    });
  }

  update(dt) {
    this.state.update(dt);
  }

  change(state, args) {
    this.state.exit();
    this.state = this.states.get(state);
    this.state.enter(args);
  }

  render() {
    this.state.render();
  }
}

export { StateMachine };
