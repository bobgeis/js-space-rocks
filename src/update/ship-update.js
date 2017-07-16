
import { Map } from 'immutable';

import {
  getVecX,
  getVecY
} from './physics';
import { newBoom } from './boom-update';
import {
  SHIP_RADIUS,
  SHIP_SPEED,
  BOOM_TYPE_SHIP_IN,
  CANVAS
} from '../constants';
import * as mode from '../mode-types';


export const update = (state) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  const newFlashes = [];
  let newScore = 0;
  let newState = state
    .update('ships', (ships) => ships.filter((ship) => {
      if (onScreen(ship)) {
        return true;
      } else {
        newScore++;
        pushFlash(newFlashes, ship);
        return false;
      }
    }))
    .update('ships', (ships) => ships.map(updateShip));
  if (newFlashes.length > 0) {
    newState = newState.update('booms', (booms) => booms.concat(newFlashes));
  }
  return newState.update('score', (score) => score.update(
    'ship', (ship) => ship + newScore
  ));
};

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];

const pushFlash = (newFlashes, ship) => {
  newFlashes.push(newBoom(
    ship.get('x'),
    ship.get('y'),
    0,
    0,
    BOOM_TYPE_SHIP_IN));
  return;
};

const updateShip = (ship) => {
  return ship.asMutable()
    .update('x', (x) => x + ship.get('vx'))
    .update('y', (y) => y + ship.get('vy'))
    .asImmutable();
};

const onScreen = (ship) => {
  if (ship.get('x') < 0 ) {
    return false;
  } else if (ship.get('x') > CANVAS.WIDTH) {
    return false;
  } else if (ship.get('y') < 0) {
    return false;
  } else if (ship.get('y') > CANVAS.HEIGHT) {
    return false;
  } else {
    return true;
  }
};

export const newShip = (x, y, a, imgKey) => {
  return Map({
    vx: SHIP_SPEED * getVecX(a),
    vy: -SHIP_SPEED * getVecY(a),
    r: SHIP_RADIUS,
    x,
    y,
    a,
    imgKey
  });
};
