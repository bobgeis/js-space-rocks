
import {
  CANVAS,
  THRUST,
  RETRO,
  TURN,
  WPN_COOLDOWN,
  DAMP
} from '../constants';
import * as mode from '../mode-types';
import { getVecX, getVecY, wrap } from './physics';

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode')) || !state.get('player') ) {
    return state;
  }

  const acc = keys.get('up') ? THRUST : keys.get('down') ? -RETRO : 0;
  const turn = keys.get('left') ? TURN : keys.get('right') ? -TURN : 0;
  let player = state.get('player').asMutable();

  let bang = false;
  if (keys.get('fire') && player.get('cd') === 0) {
    bang = true;
    // make a new bullet here
  }

  player = player
    .update('vx', (vx) => {
      return vx + acc * getVecX(player.get('a'));
    })
    .update('vy', (vy) => {
      return vy - acc * getVecY(player.get('a'));
    })
    .update('a', (a) => a + turn)
    .update('x', (x) => wrap(x + player.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + player.get('vy'), CANVAS.HEIGHT))
    .update('cd', (cd) => {
      return bang ? WPN_COOLDOWN : Math.max(cd - 1, 0)
    });
  return state.set('player', player.asImmutable());
};

const modeList = [
  mode.PLAY
];
