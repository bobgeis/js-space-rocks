
import * as imm from 'immutable';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import { type } from './action';

const initialState = imm.fromJS({
  player: {}
});

export const reducer = undoable(
  (state = initialState, action) => {
    switch (action.type) {
      case type.TICK:
        return state;
      case type.KEY_DOWN:
        return state;
      case type.KEY_UP:
        return state;
      default:
        return state;
    }
  },
  {
    filter: (action, currentState, previousHistory) => {
      return false;
    }
  }
);

