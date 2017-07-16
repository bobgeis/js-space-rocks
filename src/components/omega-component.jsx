
import React from 'react';


export default class Omega extends React.PureComponent {

  render() {
    const omegaString = `\u03A9 ${this.props.omegaCount}`;
    return (
      <span style={{
        "color": this.props.omegaReady ? "#00FF00" : "#FF0000",
        "zIndex": 2,
        "position": "relative"
      }}>
        {omegaString}
      </span>
    );
  }
}
