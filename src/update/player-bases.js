
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { CANVAS } from '../constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export const collidePlayerBases = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  let cargo = newState.get('cargo').asMutable();
  let score = newState.get('score').asMutable();
  let updated = false;

  const player = newState.get('player');
  const bases = newState.get('bases');

  bases.map((base) => {
    if (base.get('type') === 'med' && areColliding(player, base)) {
      score = score.update('lifepod', (lifepod) => lifepod + cargo.get('lifepod'));
      cargo = cargo.set('lifepod', 0);
      updated = true;
    } else if (base.get('type') === 'guild' && areColliding(player, base)) {
      score = score.update('crystal', (crystal) => crystal + cargo.get('crystal'));
      cargo = cargo.set('crystal', 0);
      updated = true;
    }
  });

  if (updated) {
    newState = newState.set('cargo', cargo.asImmutable())
      .set('score', score.asImmutable());
  }

  return newState;
};
