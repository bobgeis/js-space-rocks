
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
    const spacerString = '  ';
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
        <p style={mainHiScoreStyle}>
          <strong style={innerHiScoreStyle}>
            High Scores
          </strong> <br /> <br />
          <span style={innerHiScoreStyle}>
            Most Ships protected: {this.props.hiScore.ship}
          </span>
          {spacerString}
          <span style={innerHiScoreStyle}>
            Most Lifepods rescued: {this.props.hiScore.lifepod}
          </span>
          {spacerString}
          <span style={innerHiScoreStyle}>
            Most Crystals delivered: {this.props.hiScore.crystal}
          </span>
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

const styleHide = {
  "position": "absolute",
  "visibility": "hidden"
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

const mainHiScoreStyle = {
  "zIndex": 2,
  "position": "absolute",
  "top": 520,
  "left": CANVAS.WIDTH/2,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "small",
  "whiteSpace": "pre"
};

const innerHiScoreStyle = {
  "padding": 5,
  "position": "relative",
  "backgroundColor": "rgba(0,0,50,0.5)",
  "borderRadius": "10px"
};
