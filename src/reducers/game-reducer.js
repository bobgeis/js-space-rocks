
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
    return true;
  },
  limit: 15
};

export default undoable(gameReducer, undoConfig);
