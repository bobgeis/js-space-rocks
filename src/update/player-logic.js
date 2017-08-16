
import {
  THRUST,
  RETRO,
  TURN,
  WPN_COOLDOWN,
  DAMP,
  GLOW_MAX,
  GLOW_THRUST,
  GLOW_BANG
} from '../constants/player-constants';
import * as mode from '../mode-types';
import { getVecX, getVecY, wrap } from './physics';
import { newBullet } from './bullet-logic';
import * as CANVAS from '../constants/canvas-constants';

const modeList = [
  mode.PLAY
];

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode')) || !state.get('player') ) {
    return state;
  }

  let newState = state;
  let player = state.get('player').asMutable();

  const acc = keys.get('up') ? THRUST : keys.get('down') ? -RETRO : 0;
  const turn = keys.get('left') ? TURN : keys.get('right') ? -TURN : 0;
  const bang = keys.get('fire') && player.get('cd') === 0;

  player = player
    .update('vx', (vx) => vx + acc * getVecX(player.get('a')))
    .update('vy', (vy) => vy - acc * getVecY(player.get('a')))
    .update('a', (a) => a + turn)
    .update('x', (x) => wrap(x + player.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + player.get('vy'), CANVAS.HEIGHT))
    .update('vx', (vx) => vx * DAMP)
    .update('vy', (vy) => vy * DAMP)
    .update('glow', (glow) => {
      if (bang) {
        return GLOW_MAX * GLOW_BANG;
      } else if (acc !== 0) {
        return Math.max(glow, GLOW_MAX * GLOW_THRUST);
      } else {
        return Math.max(glow - 1, 0);
      }
    })
    .update('cd', (cd) => {
      return bang ? WPN_COOLDOWN : Math.max(cd - 1, 0);
    });
  newState = newState.set('player', player.asImmutable());

  if(bang) {
    const bullet = newBullet(player);
    newState = newState.update('bullets', (bullets) => bullets.push(bullet));
  }

  return newState;
};
