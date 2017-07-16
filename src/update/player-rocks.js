
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { CANVAS } from '../constants';

const modeList = [
  mode.PLAY
];

export const collidePlayerRocks = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  const player = state.get('player');
  const rocks = state.get('rocks');

  let alive = true;

  rocks.map((rock) => {
    if (areColliding(rock, player)){
      alive = false;
    }
  });

  if (!alive) {
    return state.set('player', player.set('alive', false))
      .set('mode', mode.GAMEOVER);
  }

  return state;
};
