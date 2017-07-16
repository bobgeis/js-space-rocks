
import { Map } from 'immutable';

import { wrap } from './physics';
import * as mode from '../mode-types';
import { CANVAS, ROCK_SIZE_TO_RADIUS } from '../constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];


export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update('rocks', (rocks) =>  rocks.map(updateRock));
};

const updateRock = (rock) => {
  return rock.asMutable()
    .update('x', (x) => wrap(x + rock.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + rock.get('vy'), CANVAS.HEIGHT))
    .asImmutable();
};

export const newRock = (x, y, vx, vy, size) => {
  return Map({
    x,
    y,
    size,
    r: ROCK_SIZE_TO_RADIUS[size],
    vx,
    vy
  });
};
