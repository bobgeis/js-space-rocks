
import * as mode from '../mode-types';
import * as LOOT from '../constants/loot-constants';
import * as BOOM from '../constants/boom-constants';
import { newLoot } from './loot-update';
import { newBoom } from './boom-update';
import { areColliding } from './physics';

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
    let alive = true;
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
  for (const chance of LOOT.LIFEPOD_CHANCE) {
    if (Math.random() < chance) {
      const a = Math.random() * Math.PI * 2;
      const va = (Math.random() * 2 - 1) * LOOT.LIFEPOD_SPIN;
      const dv = Math.random() * LOOT.LIFEPOD_SPEED;
      const dvx = dv * Math.cos(a);
      const dvy = dv * Math.sin(a);
      const x = ship.get('x');
      const y = ship.get('y');
      const vx = ship.get('vx');
      const vy = ship.get('vy');
      loot.push(newLoot(x, y, vx + dvx, vy + dvy, va, LOOT.TYPE_LIFEPOD));
    }
  }
};

const pushBooms = (booms, ship) => {
  booms.push(newBoom(
    ship.get('x'),
    ship.get('y'),
    ship.get('vx'),
    ship.get('vy'),
    BOOM.TYPE_SHIP_EX));
};

