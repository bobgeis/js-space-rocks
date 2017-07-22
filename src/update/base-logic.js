
import { updateAngle } from './physics';
import * as mode from '../mode-types';

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update('bases', (bases) =>  bases.map(updateAngle));
};

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];
