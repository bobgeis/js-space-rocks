
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { CANVAS } from '../constants';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export const collideRocksBullets = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  let rocks = state.get('rocks');
  let bullets = state.get('bullets');
  const calves = [];
  const newLoot = [];
  const newBooms = [];

  rocks = rocks.filter((rock) => {
    let alive = true;
    bullets = bullets.filter((bullet) => {
      if (areColliding(rock, bullet)) {
        alive = false;
        pushCalves(calves, rock);
        pushLoot(newLoot, rock);
        pushBooms(newBooms, rock);
        return false;
      } else {
        return true;
      }
    });
    return alive;
  });
  if (calves.length > 0) {
    rocks = rocks.concat(calves);
  }
  if (newLoot.length > 0) {
    newState = newState.update('loot', (loot) => loot.concat(newLoot));
  }
  if (newBooms.length >0) {
    newState = newState.update('booms', (booms) => booms.concat(newBooms));
  }
  return newState.set('rocks', rocks).set('bullets', bullets);
};

const pushCalves = (calves, rock) => {
  // TODO
  return;
};

const pushLoot = (loot, rock) => {
  // TODO
  return;
};

const pushBooms = (booms, rock) => {
  // TODO
  return;
};
