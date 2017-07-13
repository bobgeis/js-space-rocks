
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
    .update('vx', (vx) => vx + player.get('acc') * 0.001)
    .update('vy', (vy) => vy + player.get('acc') * 0)
    .update('x', (x) => x + player.get('vx'))
    .update('y', (y) => y + player.get('vy'))
    .update('a', (a) => a + player.get('va'));
  return state.set('player', player);
};

