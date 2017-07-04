
import React from 'react';

import { CANVAS, KEYS } from '../constants';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    // if we don't bind 'this' then we won't have access to props in the handler
    window.addEventListener('keyup', this.handleKeys.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  handleKeys(e) {
    // i don't like that we're handling this here,
    // but i wasn't sure of a better way to do this.
    if (e.code === 'KeyZ' && this.props.omegaReady) {
      this.props.omega13();
    // there are a whole lot of keys we don't care about
    } else if (KEYS.includes(e.code)) {
      this.props.keyAction(e);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <span>Hello world!</span>
        <canvas ref="canvas"
          width={CANVAS.WIDTH}
          height={CANVAS.HEIGHT}
        />
      </div>
    );
  }
}
