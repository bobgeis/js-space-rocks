
import { areColliding } from './physics';
import * as mode from '../mode-types';
import {
  ROCK_SIZE_STEP,
  ROCK_CALF_SPEED,
  LOOT_TYPE_CRYSTAL,
  CRYSTAL_SPEED,
  CRYSTAL_CHANCE,
  CRYSTAL_SPIN
} from '../constants';
import { newRock } from './rock-update';
import { newLoot } from './loot-update';

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
  const newSize = ROCK_SIZE_STEP[rock.get('size')];
  if (!newSize) {
    return;
  }
  const a = Math.random() * Math.PI * 2;
  const dv = Math.random() * ROCK_CALF_SPEED;
  const dvx = dv * Math.cos(a);
  const dvy = dv * Math.sin(a);
  const x = rock.get('x');
  const y = rock.get('y');
  const vx = rock.get('vx');
  const vy = rock.get('vy');
  calves.push(newRock(x, y, vx + dvx, vy + dvy, newSize));
  calves.push(newRock(x, y, vx - dvx, vy - dvy, newSize));
};

const pushLoot = (loot, rock) => {
  if (Math.random() > CRYSTAL_CHANCE) {
    return;
  }
  const a = Math.random() * Math.PI * 2;
  const va = (Math.random() * 2 - 1) * CRYSTAL_SPIN;
  const dv = Math.random() * CRYSTAL_SPEED;
  const dvx = dv * Math.cos(a);
  const dvy = dv * Math.sin(a);
  const x = rock.get('x');
  const y = rock.get('y');
  const vx = rock.get('vx');
  const vy = rock.get('vy');
  loot.push(newLoot(x, y, vx + dvx, vy + dvy, va, LOOT_TYPE_CRYSTAL));
  return;
};

const pushBooms = (booms, rock) => {
  // TODO
  return;
};
