
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { CANVAS, ROCK_SIZES, ROCK_SIZE_STEP, ROCK_CALF_SPEED } from '../constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export const collideShipsRocks = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  let ships = newState.get('ships');
  const rocks = newState.get('rocks');
  const newLoot = [];
  const newBooms = []

  ships = ships.filter((ship) => {
    let alive = true
    rocks.forEach((rock) => {
      if (areColliding(ship, rock)){
        alive = false;
        pushLoot(newLoot, ship);
        pushBooms(newBooms, ship);
        return false;
      }
      return true;
    });
    return alive;
  });
  if(newLoot.length > 0) {
    newState = newState.update('loot', (loot) => loot.concat(newLoot));
  }
  if(newBooms.length > 0) {
    newState = newState.update('booms', (booms) => booms.concat(newBooms));
  }
  return newState.set('ships', ships);
};


const pushLoot = (loot, ship) => {
  // TODO
  return;
};

const pushBooms = (booms, ship) => {
  // TODO
  return;
};
