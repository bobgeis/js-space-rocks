
import { Map } from 'immutable';

import {
  getVecX,
  getVecY,
  wrap
} from './physics';
import * as mode from '../mode-types';
import {
  BULLET_LIFETIME,
  BULLET_SPEED,
  BULLET_RADIUS,
  CANVAS
} from '../constants';

export const update = (state) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update(
    'bullets',
    (bullets) => bullets
      .filter((bullet) => bullet.get('life') > 0)
      .map(updateBullet)
  );
};

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

const updateBullet = (bullet) => {
  return bullet.asMutable()
    .update('x', (x) => wrap(x + bullet.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + bullet.get('vy'), CANVAS.HEIGHT))
    .update('life', (life) => life - 1)
    .asImmutable();
};

export const newBullet = ( player ) => {
  return Map({
    x: player.get('x'),
    y: player.get('y'),
    vx: player.get('vx') + BULLET_SPEED * getVecX(player.get('a')),
    vy: player.get('vy') - BULLET_SPEED * getVecY(player.get('a')),
    r: BULLET_RADIUS,
    life: BULLET_LIFETIME
  });
};
