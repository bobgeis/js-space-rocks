
import { connect } from 'react-redux';

import Game from '../components/game';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    data: state.present,
    omegaReady: state.past.length > 13
  };
};

export default connect(mapStateToProps, actions)(Game);
