
import { Map } from 'immutable';
import undoable from 'redux-undo';

import * as types from '../actionTypes';
import { initialStore } from '../store';

const initStore = (state) => {
  return state.merge(initialStore);
};

const gameReducer = (state = Map(), action) => {
  switch (action.type) {
    case types.TICK:
      return state.update('ticks', (x) => x + 1 );
    case types.INIT_STORE:
      return initStore(state);
    default:
      return state;
  }
};

const undoConfig = {
  filter: (action, currentState, previousHistory) => {
    return true;
  },
  limit: 15
};

export default undoable(gameReducer, undoConfig);
