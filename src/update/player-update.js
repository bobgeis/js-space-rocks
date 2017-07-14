
import { CANVAS } from '../constants';
import { getVecX, getVecY, wrap } from './physics';

export const update = (state, keys) => {
  if ( state.get('mode') !== 'play' || !state.get('player') ) {
    return state;
  }
  let player = state.get('player').asMutable();
  player =  player
    .update('va', (va) => {
      if (keys.get('left')) {
        return player.get('turn');
      } else if(keys.get('right')) {
        return -player.get('turn');
      }
      return 0;
    })
    .update('acc', (acc) => {
      if (keys.get('up')) {
        return player.get('thrust');
      } else if(keys.get('down')) {
        return -player.get('thrust')/4;
      }
      return 0;
    })
    .update('vx', (vx) => {
      return vx + player.get('acc') * getVecX(player.get('a'));
    })
    .update('vy', (vy) => {
      return vy - player.get('acc') * getVecY(player.get('a'));
    })
    .update('x', (x) => wrap(x + player.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + player.get('vy'), CANVAS.HEIGHT))
    .update('a', (a) => a + player.get('va'));
  return state.set('player', player.asImmutable());
};
