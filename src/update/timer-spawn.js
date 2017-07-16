
import {
  getVecX,
  getVecY
} from './physics';
import {
  CANVAS,
  SHIP_SPAWN_CHANCE,
  SHIP_SPAWN_DELAY,
  SHIP_NUM_TYPES,
  ROCK_SPAWN_CHANCE,
  ROCK_SPAWN_DELAY,
  ROCK_SIZES,
  ROCK_SPEED
} from '../constants';
import * as mode from '../mode-types';
import { newShip } from './ship-update';
import { newRock } from './rock-update';

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
    newState = newState.update('ships', (ships) => ships.push(spawnRandomShip()));
  }
  if (state.get('ticks') % ROCK_SPAWN_DELAY === 0 && Math.random() < ROCK_SPAWN_CHANCE) {
    newState = newState.update('rocks', (rocks) => rocks.push(spawnRandomRock()));
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

const spawnRandomRock = () => {
  const size = ROCK_SIZES[ROCK_SIZES.length - 1];
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
  const v = Math.random() * ROCK_SPEED;
  const vx = v * getVecX(a);
  const vy = v * getVecY(a);
  return newRock(x, y, vx, vy, size);
};
