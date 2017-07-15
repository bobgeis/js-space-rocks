
import { updateAngle } from './physics';
import * as mode from '../mode-types';

export const update = (state) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state;
};


const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

