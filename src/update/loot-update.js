
import { Map } from 'immutable';

import { wrap } from './physics';
import * as mode from '../mode-types';
import * as CANVAS from '../constants/canvas-constants';
import * as LOOT from '../constants/loot-constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];


export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update('loot', (loot) => loot
    .filter((loot) => loot.get('life') > 0)
    .map(updateLoot));
};

const updateLoot = (loot) => {
  return loot.asMutable()
    .update('x', (x) => wrap(x + loot.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + loot.get('vy'), CANVAS.HEIGHT))
    .update('a', (a) => a + loot.get('va'))
    .update('life', (life) => life - 1)
    .asImmutable();
};

export const newLoot = (x, y, vx, vy, va, type) => {
  return Map({
    x,
    y,
    a: Math.random() * 2 * Math.PI,
    vx,
    vy,
    va,
    type,
    r: LOOT.RADIUS,
    life: LOOT.TYPES_TO_LIFETIMES[type]
  });
};

