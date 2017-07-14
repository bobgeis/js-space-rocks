
import { Map } from 'immutable';
import undoable from 'redux-undo';

import * as types from '../action-types';
import { initialStore } from '../store';
import { updateGame } from '../update/game-update';

const gameReducer = (state = Map(), action) => {
  switch (action.type) {
    case types.TICK:
      return updateGame(state, action.keys);
    case types.INIT_STORE:
      return state.merge(initialStore);
    default:
      return state;
  }
};

const undoConfig = {
  filter: (action, currentState, previousHistory) => {
    if (currentState.get('mode') !== 'PLAY') {
      return false;
    }
    if (currentState.get('ticks') % 60 !== 0) {
      return false;
    }
    return true;
  },
  limit: 14
};

export default undoable(gameReducer, undoConfig);
