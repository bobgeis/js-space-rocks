
import React from 'react';


export default class Omega extends React.PureComponent {

  render() {
    const omegaString = this.props.omegaReady ? "Omega13 Ready!" : `Charging: ${this.props.omegaCount}`;
    return (
      <span style={{"color": this.props.omegaReady ? "#00FF00" : "#FF0000"}}>
        {omegaString}
      </span>
    );
  }
}
