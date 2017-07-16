
import React from 'react';

import { CANVAS } from '../constants';
import * as mode from '../mode-types';

export default class Description extends React.PureComponent {

  render() {
    if (!modeList.includes(this.props.gameMode)) {
      return (
        <div style={styleHide} />
      );
    }

    return (
      <div>
        <p style={styleShow}>
          <strong>Controls:</strong> <br />
          Arrow keys to move <br />
          Space to fire <br />
          Z to use the Omega-13 <br />
          P to pause <br />
          Enter to play! <br />
        </p>
      </div>
    );
  }
}

const modeList = [
  mode.SPLASH,
  mode.GAMEOVER,
  mode.PAUSE
];

const styleShow = {
  "zIndex": 2,
  "position": "absolute",
  "padding": 5,
  "top": 40,
  "left": CANVAS.WIDTH/2 - 100,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "x-small",
  "backgroundColor": "rgba(0,0,50,0.7)"
};

const styleHide = {
  "position": "absolute",
  "visibility": "hidden"
};
