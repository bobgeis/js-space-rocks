
import { Map } from 'immutable';
import undoable from 'redux-undo';

import * as types from '../action-types';
import * as modes from '../mode-types';
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
    // the game should only tick and snapshot in play mode
    if (currentState.get('mode') !== modes.PLAY) {
      return false;
    }
    // 60 ticks per second, save one frame out of 60
    if (currentState.get('ticks') % 60 !== 0) {
      return false;
    }
    return true;
  },
  // this means that the 14th snapshot is the present, the past will have length = 13
  limit: 14
};

export default undoable(gameReducer, undoConfig);
