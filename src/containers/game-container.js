
import { connect } from 'react-redux';

import Game from '../components/game-component';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    data: state.game.present,
    keys: state.keys,
    omegaReady: omegaReady(state),
    omegaCount: omegaCount(state)
  };
};

const omegaReady = (state) => {
  return omegaCount(state) >= 13;
};

const omegaCount = (state) => {
  return Math.min(
    state.game.past.length,
    Math.floor(state.game.present.get('ticks') / 60)
  );
};

export default connect(mapStateToProps, actions)(Game);
