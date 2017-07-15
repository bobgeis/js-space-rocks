
import { Map } from 'immutable';

import {
  updateAngle,
  getVecX,
  getVecY
} from './physics';
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

export const newBullet = ( player ) => {
  return Map({
    x: player.get('x'),
    y: player.get('y'),
    vx: player.get('vx') + player.get('a')
  });
};

