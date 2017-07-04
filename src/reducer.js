
import { Map } from 'immutable';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import * as types from './actionTypes';
import { initialStore } from './store';


const initStore = (state) => {
  return state.merge(initialStore);
};


const mainReducer = (state = Map(), action) => {
  switch (action.type) {
    case types.TICK:
      return state;
    case types.KEY_DOWN:
      return state;
    case types.KEY_UP:
      return state;
    case types.INIT_STORE:
      return initStore(state);
    default:
      return state;
  }
};

const undoConfig = {
  filter: (action, currentState, previousHistory) => {
    return false;
  },
  limit: 13
};

export default undoable(mainReducer, undoConfig);
