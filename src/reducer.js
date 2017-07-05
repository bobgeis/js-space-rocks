
import { Map } from 'immutable';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import * as types from './actionTypes';
import { initialStore } from './store';
import { KEYS_TO_COMMANDS } from './constants';

const initStore = (state) => {
  return state.merge(initialStore);
};

// does the key state need to be a Map?
const keyReducer = (state = Map(), action) => {
  switch (action.type) {
    case types.KEY_ACTION:
      return state.set(KEYS_TO_COMMANDS[action.key], action.value);
    default:
      return state;
  }
};

const gameReducer = (state = Map(), action) => {
  switch (action.type) {
    case types.TICK:
      return state;
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

const undoableGameReducer = undoable(gameReducer, undoConfig);

export default combineReducers({
  game: undoableGameReducer,
  keys: keyReducer
});
