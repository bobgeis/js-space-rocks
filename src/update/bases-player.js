
import { areColliding } from './physics';
import * as SHIP from '../constants/ship-constants';
import * as mode from '../mode-types';

const modeList = [
  mode.PLAY
];

export const collidePlayerBases = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  let cargo = newState.get('cargo').asMutable();
  let score = newState.get('score').asMutable();
  let amount = 0;

  const player = newState.get('player');
  const bases = newState.get('bases');

  bases.map((base) => {
    if (base.get('type') === 'med' && areColliding(player, base)) {
      amount = cargo.get('lifepod');
      score = score.update('lifepod', (lifepod) => lifepod + amount);
      cargo = cargo.set('lifepod', 0);
    } else if (base.get('type') === 'guild' && areColliding(player, base)) {
      amount = cargo.get('crystal');
      score = score.update('crystal', (crystal) => crystal + amount);
      cargo = cargo.set('crystal', 0);
    }
  });

  if (amount > 0) {
    newState = newState.set('cargo', cargo.asImmutable())
      .set('score', score.asImmutable())
      .update('shipTimer', (timer) => Math.max(SHIP.MIN_SPAWN_DELAY, Math.floor(timer - amount * SHIP.SPAWN_SPEEDUP)));
  }

  return newState;
};
