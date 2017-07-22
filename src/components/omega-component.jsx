
import React from 'react';

import * as CANVAS from '../constants/canvas-constants';

export default class Omega extends React.PureComponent {

  render() {
    const omegaString = `\u03A9 ${this.props.omegaCount}`;
    return (
      <span style={{
        "color": this.props.omegaReady ? "#00FF00" : "#FF0000",
        "zIndex": 2,
        "position": "absolute",
        "top": CANVAS.HEIGHT - 30,
        "left": CANVAS.WIDTH/2,
        "transform": "translate(-50%, 0)",
        "fontSize": "large"
      }}>
        {omegaString}
      </span>
    );
  }
}

