
import { Map } from 'immutable';

import { wrap } from './physics';
import {
  BOOM_LIFETIMES
} from '../constants';
import * as CANVAS from '../constants/canvas-constants';
import * as mode from '../mode-types';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update(
    'booms',
    (booms) => booms
      .filter((boom) => boom.get('life') > 0)
      .map(updateBoom)
  );
};

const updateBoom = (boom) => {
  return boom.asMutable()
    .update('x', (x) => wrap(x + boom.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + boom.get('vy'), CANVAS.HEIGHT))
    .update('life', (life) => life - 1)
    .asImmutable();
};

export const newBoom = (x, y, vx, vy, type) => {
  return Map({
    x,
    y,
    vx,
    vy,
    type,
    life: BOOM_LIFETIMES[type]
  });
};
