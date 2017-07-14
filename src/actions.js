
import { ActionCreators as UndoActions } from 'redux-undo';

import * as types from './action-types';

// actions
export const initStore = () => {
  return {
    type: types.INIT_STORE
  };
};

export const startGame = () => {
  return {
    type: types.START_GAME
  };
};

export const tick = (keys) => {
  return {
    type: types.TICK,
    keys
  };
};

export const omega13 = () => {
  return UndoActions.jumpToPast(0);
};

export const keyAction = (e) => {
  return {
    type: types.KEY_ACTION,
    key: e.code,
    value: e.type === 'keydown'
  };
};
