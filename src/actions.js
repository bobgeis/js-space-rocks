
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

export const tick = () => {
  return {
    type: types.TICK
  };
};

// export const omega13 = () => {
//   return {
//     type: types.OMEGA13
//   };
// };

export const omega13 = () => {
  return UndoActions.jumpToPast(13);
};

export const keyDown = (key) => {
  return {
    type: types.KEY_DOWN,
    key: key
  };
};

export const keyUp = (key) => {
  return {
    type: types.KEY_UP,
    key: key
  };
};
