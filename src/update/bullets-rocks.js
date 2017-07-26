
import { areColliding } from './physics';
import * as mode from '../mode-types';
import { newRock, getPoints } from './rock-logic';
import { newLoot } from './loot-logic';
import { newBoom } from './boom-logic';

import * as util from '../util';
import * as ROCK from '../constants/rock-constants';
import * as LOOT from '../constants/loot-constants';
import * as BOOM from '../constants/boom-constants';

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
  const newSize = ROCK.SIZE_STEP[rock.get('size')];
  if (!newSize) {
    return;
  }
  const va = util.randCtrRange(ROCK.VA);
  const a = Math.random() * Math.PI * 2;
  const dv = Math.random() * ROCK.CALF_SPEED;
  const dvx = dv * Math.cos(a);
  const dvy = dv * Math.sin(a);
  const x = rock.get('x');
  const y = rock.get('y');
  const vx = rock.get('vx');
  const vy = rock.get('vy');
  const type = rock.get('type');
  const color = rock.get('color');
  calves.push(newRock(x, y, vx + dvx, vy + dvy, a, va, newSize, getPoints(), type, color));
  calves.push(newRock(x, y, vx - dvx, vy - dvy, a, -va, newSize, getPoints(), type, color));
};

const pushLoot = (loot, rock) => {
  if (Math.random() > LOOT.CRYSTAL_CHANCE) {
    return;
  }
  const a = Math.random() * Math.PI * 2;
  const va = (Math.random() * 2 - 1) * LOOT.CRYSTAL_SPIN;
  const dv = Math.random() * LOOT.CRYSTAL_SPEED;
  const dvx = dv * Math.cos(a);
  const dvy = dv * Math.sin(a);
  const x = rock.get('x');
  const y = rock.get('y');
  const vx = rock.get('vx');
  const vy = rock.get('vy');
  loot.push(newLoot(x, y, vx + dvx, vy + dvy, va, LOOT.TYPE_CRYSTAL));
  return;
};

const pushBooms = (booms, rock) => {
  booms.push(newBoom(
    rock.get('x'),
    rock.get('y'),
    rock.get('vx'),
    rock.get('vy'),
    BOOM.TYPE_ROCK_EX));
};
