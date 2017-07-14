
import { connect } from 'react-redux';

import Game from '../components/game-component';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    data: state.game.present,
    keys: state.keys,
    omegaReady: state.game.past.length >= 13,
    omegaCount: state.game.past.length
  };
};

export default connect(mapStateToProps, actions)(Game);
