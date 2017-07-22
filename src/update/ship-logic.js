
import { Map } from 'immutable';

import { newBoom } from './boom-logic';
import * as BOOM from '../constants/boom-constants';
import * as CANVAS from '../constants/canvas-constants';
import * as SHIP from '../constants/ship-constants';
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
  if (newScore > 0 && state.get('mode') === mode.PLAY) {
    newState = newState.update('score', (score) => score.update(
      'ship', (ship) => ship + newScore
    ));
  }
  return newState;
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
    BOOM.TYPE_SHIP_IN));
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
    vx: SHIP.SPEED * Math.cos(a),
    vy: -SHIP.SPEED * Math.sin(a),
    r: SHIP.RADIUS,
    x,
    y,
    a,
    imgKey
  });
};
