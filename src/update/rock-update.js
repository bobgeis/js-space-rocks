
import { updateAngle, updatePos, wrap } from './physics';
import * as mode from '../mode-types';
import { CANVAS } from '../constants';

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.asMutable()
    .update('rocks', (rocks) =>  rocks.map(flow));
};

const flow = (rock) => {
  return updatePos(rock.asMutable())
    .update('x', (x) => wrap(x, CANVAS.WIDTH))
    .update('y', (y) => wrap(y, CANVAS.HEIGHT))
    .asImmutable();
};

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];
