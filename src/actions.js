
import * as types from './actionTypes';
import { ActionCreators as UndoActions } from 'redux-undo';

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
  return UndoActions.jumpToPast(13);
};


export const keyAction = (e) => {
  return {
    type: types.KEY_ACTION,
    key: e.code,
    value: e.type === 'keydown'
  };
};
