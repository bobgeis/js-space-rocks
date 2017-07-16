
import React from 'react';

import { CANVAS, KEYS, KEYS_TO_COMMANDS } from '../constants';
import { renderCanvas } from '../canvas/render';
import * as modes from '../mode-types';

import Description from './description-component';
import Omega from './omega-component';
import Score from './score-component';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    // if we don't bind 'this' then we won't have access to props in the handler
    window.addEventListener('keyup', this.handleKeys.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
    // get the canvas context and put it into the React component state,
    // we need to do this, otherwise it gets lost when the state changes!
    this.setState({ context: this.refs.canvas.getContext('2d') });
    // call rAF
    requestAnimationFrame(() => this.updateGame());
  }

  componentWillUnmount() {
    // remove listeners
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  handleKeys(e) {
    // i don't like that we're handling this here,
    // but i wasn't sure of a better way to do this.
    if (this.omegaCheck(e)) {
      this.props.omega13();
    // check the whitelist of keys we care about
    } else if (KEYS.includes(e.code)) {
      this.props.keyAction(e);
    }
  }

  omegaCheck(e) {
    const mode = this.props.data.get('mode')
    return KEYS_TO_COMMANDS[e.code] === 'omega13' && this.props.omegaReady && (mode === modes.GAMEOVER || mode === modes.PLAY);
  }

  updateGame() {
    this.props.tick(this.props.keys);
    renderCanvas(this.state.context, this.props.data);
    requestAnimationFrame(() => this.updateGame());
  }

  render() {
    return (
      <div style={styleBg}>
        <Omega
          omegaCount={this.props.omegaCount}
          omegaReady={this.props.omegaReady}
        />
        <Score
          score={this.props.data.get('score')}
        />
        <Description
          gameMode={this.props.data.get('mode')}
        />
        <canvas ref="canvas"
          width={CANVAS.WIDTH}
          height={CANVAS.HEIGHT}
        />
      </div>
    );
  }
}

const styleBg = {
  "background": "url(./res/img/stars.jpg) no-repeat center",
  "backgroundSize": "cover",
  "width": `${CANVAS.WIDTH}px`,
  "height": `${CANVAS.HEIGHT}px`
};
