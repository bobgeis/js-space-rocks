
import React from 'react';

import { CANVAS } from '../constants';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }


  render() {
    // console.log(this.props);
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
