
import React from 'react';

import * as CANVAS from '../constants/canvas-constants';

export default class Score extends React.PureComponent {

  render() {
    const shipString = `Ships protected: ${this.props.score.get('ship')}`;
    const lifepodString = `Lifepods rescued: ${this.props.score.get('lifepod')}`;
    const crystalString = `Crystals delivered: ${this.props.score.get('crystal')}`;
    const spacerString = '            ';
    return (
      <span style={mainStyle}>
        <span style={innerStyle}>
          {shipString}
        </span>
        {spacerString}
        <span style={innerStyle}>
          {lifepodString}
        </span>
        {spacerString}
        <span style={innerStyle}>
          {crystalString}
        </span>
      </span>
    )
  }
}

const mainStyle = {
  "zIndex": 2,
  "position": "absolute",
  "top": 10,
  "left": CANVAS.WIDTH/2,
  "transform": "translate(-50%, 0)",
  "textAlign": "center",
  "fontSize": "small",
  "whiteSpace": "pre"
};

const innerStyle = {
  "padding": 5,
  "backgroundColor": "rgba(0,0,50,0.5)",
  "borderRadius": "10px"
};
