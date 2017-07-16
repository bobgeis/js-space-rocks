
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { CANVAS, LOOT_TYPE_CRYSTAL, LOOT_TYPE_LIFEPOD } from '../constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export const collideLootPlayer = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  let lootList = newState.get('loot');
  let newLifepods = 0;
  let newCrystals = 0;
  const player = newState.get('player');

  lootList = lootList.filter((loot) => {
    const pickup = areColliding(loot, player);

    if (pickup) {
      loot.get('type') === LOOT_TYPE_CRYSTAL ? newCrystals++ : newLifepods++;
    }
    return !pickup;
  });
  if (newLifepods > 0 || newCrystals > 0) {
    newState = newState.update('cargo', (cargo) =>
      cargo.asMutable()
        .update('crystal', (crystal) => crystal + newCrystals)
        .update('lifepod', (lifepod) => lifepod + newLifepods)
        .asImmutable()
    );
  }
  return newState.set('loot', lootList);
};
