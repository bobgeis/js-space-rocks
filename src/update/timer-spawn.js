
import {
  SHIP_SPAWN_CHANCE,
  SHIP_SPAWN_DELAY
} from '../constants';
import * as CANVAS from '../constants/canvas-constants';
import { SHIP_NUM_TYPES } from '../canvas/ship-canvas';
import * as mode from '../mode-types';
import { newShip } from './ship-update';
import { newRock, getPoints } from './rock-update';
import { newBoom } from './boom-update';
import * as ROCK from '../constants/rock-constants';
import * as BOOM from '../constants/boom-constants';
import * as util from '../util';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export default (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  if (state.get('ticks') % SHIP_SPAWN_DELAY === 0 && Math.random() < SHIP_SPAWN_CHANCE) {
    const newShip = spawnRandomShip();
    newState = newState.update('ships', (ships) => ships.push(newShip))
      .update('booms', (booms) => booms.push(newFlashFromObject(newShip,false)));
  }
  if (state.get('ticks') % ROCK.SPAWN_DELAY === 0 && Math.random() < ROCK.SPAWN_CHANCE) {
    const newRock = spawnRandomRock();
    newState = newState.update('rocks', (rocks) => rocks.push(newRock))
      .update('booms', (booms) => booms.push(newFlashFromObject(newRock,true)));
  }
  return newState;
};

const spawnRandomShip = () => {
  const imgKey = Math.floor(Math.random() * SHIP_NUM_TYPES);
  const side = Math.floor(Math.random() * 4);
  let x, y, a;
  if (side === 0) {
    x = 0;
    y = Math.random() * CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) - Math.PI/4;
  } else if (side === 1) {
    x = CANVAS.WIDTH;
    y = Math.random() * CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) + Math.PI * 3/4;
  } else if (side === 2) {
    x = Math.random() * CANVAS.WIDTH;
    y = 0;
    a = (Math.random() * Math.PI/2) - Math.PI * 3/4;
  } else {
    x = Math.random() * CANVAS.WIDTH;
    y = CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) + Math.PI/4;
  }
  return newShip(x, y, a, imgKey);
};

export const spawnRandomRock = () => {
  const size = ROCK.SIZES[ROCK.SIZES.length - 1];
  const side = Math.floor(Math.random() * 4);
  const va = util.randCtrRange(ROCK.VA);
  let x, y, a;
  if (side === 0) {
    x = 0;
    y = Math.random() * CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) - Math.PI/4;
  } else if (side === 1) {
    x = CANVAS.WIDTH;
    y = Math.random() * CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) + Math.PI * 3/4;
  } else if (side === 2) {
    x = Math.random() * CANVAS.WIDTH;
    y = 0;
    a = (Math.random() * Math.PI/2) - Math.PI * 3/4;
  } else {
    x = Math.random() * CANVAS.WIDTH;
    y = CANVAS.HEIGHT;
    a = (Math.random() * Math.PI/2) + Math.PI/4;
  }
  const v = Math.random() * ROCK.SPEED;
  const vx = v * Math.cos(a);
  const vy = v * Math.sin(a);
  return newRock(x, y, vx, vy, a, va, size, getPoints());
};

const newFlashFromObject = (obj, rock) => {
  if (rock) {
    return newBoom(obj.get('x'), obj.get('y'), 0, 0, BOOM.TYPE_ROCK_IN);
  } else {
    return newBoom(obj.get('x'), obj.get('y'), 0, 0, BOOM.TYPE_SHIP_IN);
  }
};
