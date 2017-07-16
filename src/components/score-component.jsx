
import React from 'react';

import { CANVAS } from '../constants';

export default class Score extends React.PureComponent {

  render() {
    const lifepod = this.props.score.get('lifepod');
    const crystal = this.props.score.get('crystal');
    const ship = this.props.score.get('ship');
    const scoreString = `Ships protected: ${ship} Survivors rescued: ${lifepod} Crystals delivered: ${crystal}`;
    return (
      <span style={style}>
        {scoreString}
      </span>
    );
  }
}

const style = {
  "zIndex": 2,
  "position": "absolute",
  "top": 10,
  "left": CANVAS.WIDTH/2,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "small",
  "backgroundColor": "rgba(0,0,50,0.7)",
  "padding": 5
};
