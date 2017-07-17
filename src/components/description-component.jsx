
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
        <p style={styleObjectives}>
          <strong>Lookout! Space rocks!</strong> <br />
          Some hooligans are dumping space rocks.<br />
          Luckily, you're here.<br />
          Bust the rocks so ships can travel safely.<br />
          Bring lifepods to the base in the upper right.<br />
          Bring crystals to the base in the lower left.<br />
          Good luck!<br />
        </p>
        <p style={styleControls}>
          <strong>Controls:</strong> <br />
          Arrows to move <br />
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

const styleControls = {
  "zIndex": 2,
  "position": "absolute",
  "padding": 5,
  "top": 350,
  "left": CANVAS.WIDTH/2,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "small",
  "backgroundColor": "rgba(0,0,50,0.5)",
  "borderRadius": "10px"
};

const styleObjectives = {
  "zIndex": 2,
  "position": "absolute",
  "padding": 5,
  "top": 150,
  "left": CANVAS.WIDTH/2,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "small",
  "backgroundColor": "rgba(0,0,50,0.5)",
  "borderRadius": "10px"
};

const styleHide = {
  "position": "absolute",
  "visibility": "hidden"
};
