
import * as CANVAS from '../constants/canvas-constants';
import { SHIP_NUM_TYPES } from '../canvas/ship-canvas';
import * as mode from '../mode-types';
import { newShip } from './ship-logic';
import { newRock, getPoints } from './rock-logic';
import { newBoom } from './boom-logic';
import * as BOOM from '../constants/boom-constants';
import * as ROCK from '../constants/rock-constants';
import * as SHIP from '../constants/ship-constants';
import { TAU, HALFPI } from '../constants/misc-constants';
import * as dr from '../detrand';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

export default (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  let newState = state;
  if (state.get('ticks') % state.get('shipTimer') === 0 && dr.random() < SHIP.SPAWN_CHANCE) {
    const newShip = spawnRandomShip();
    newState = newState.update('ships', (ships) => ships.push(newShip))
      .update('booms', (booms) => booms.push(newFlashFromObject(newShip,false)));
  }
  if (state.get('ticks') % state.get('rockTimer') === 0 && dr.random() < ROCK.SPAWN_CHANCE) {
    const newRock = spawnRandomRock();
    newState = newState.update('rocks', (rocks) => rocks.push(newRock))
      .update('booms', (booms) => booms.push(newFlashFromObject(newRock,true)));
  }
  return newState;
};

const spawnRandomShip = () => {
  const imgKey = dr.randInt(SHIP_NUM_TYPES);
  const side = dr.randInt(4);
  let x, y, a;
  if (side === 0) {
    x = 0;
    y = dr.randRange(CANVAS.HEIGHT);
    a = dr.randRange(HALFPI) - Math.PI/4;
  } else if (side === 1) {
    x = CANVAS.WIDTH;
    y = dr.randRange(CANVAS.HEIGHT);
    a = dr.randRange(HALFPI) + Math.PI * 3/4;
  } else if (side === 2) {
    x = dr.randRange(CANVAS.WIDTH);
    y = 0;
    a = dr.randRange(HALFPI) - Math.PI * 3/4;
  } else {
    x = dr.randRange(CANVAS.WIDTH);
    y = CANVAS.HEIGHT;
    a = dr.randRange(HALFPI) + Math.PI/4;
  }
  return newShip(x, y, a, imgKey);
};

export const spawnRandomRock = () => {
  const size = ROCK.SIZES[ROCK.SIZES.length - 1];
  const side = dr.randInt(4);
  const va = dr.randCtrRange(ROCK.VA);
  const type = dr.randChoice(ROCK.TYPES);
  const color = dr.randChoice(ROCK.COLORS[type]);
  let x, y, a;
  if (side === 0) {
    x = 0;
    y = dr.randRange(CANVAS.HEIGHT);
    a = dr.randRange(HALFPI) - Math.PI/4;
  } else if (side === 1) {
    x = CANVAS.WIDTH;
    y = dr.randRange(CANVAS.HEIGHT);
    a = dr.randRange(HALFPI) + Math.PI * 3/4;
  } else if (side === 2) {
    x = dr.random() * CANVAS.WIDTH;
    y = 0;
    a = dr.randRange(HALFPI) + Math.PI * 3/4;
  } else {
    x = dr.random() * CANVAS.WIDTH;
    y = CANVAS.HEIGHT;
    a = dr.randRange(HALFPI) + Math.PI * 3/4;
  }
  const v = dr.randRange(ROCK.SPEED);
  const vx = v * Math.cos(a);
  const vy = v * Math.sin(a);
  return newRock(x, y, vx, vy, a, va, size, getPoints(), type, color);
};

const newFlashFromObject = (obj, rock) => {
  if (rock) {
    return newBoom(obj.get('x'), obj.get('y'), 0, 0, BOOM.TYPE_ROCK_IN);
  } else {
    return newBoom(obj.get('x'), obj.get('y'), 0, 0, BOOM.TYPE_SHIP_IN);
  }
};
