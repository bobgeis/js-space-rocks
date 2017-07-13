
import { CANVAS } from '../constants';

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

const getVecX = (a) => {
  return Math.cos(a);
};

const getVecY = (a) => {
  return Math.sin(a);
};

const wrap = (x, dimension) => {
  if (x > dimension) {
    return x - dimension;
  } else if (x < 0) {
    return x + dimension;
  } else {
    return x;
  }
};
