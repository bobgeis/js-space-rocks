
import React from 'react';
import Immutable from 'immutable';
import Redux from 'redux';

import { CANVAS } from './constant';

export class Game extends React.Component {
  constructor() {
    super();
    this.x = 1;
  }

  render() {
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
