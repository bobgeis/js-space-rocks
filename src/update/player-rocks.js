
import { areColliding } from './physics';
import * as mode from '../mode-types';
import {
  LOOT_TYPE_LIFEPOD,
  LIFEPOD_SPEED,
  LIFEPOD_SPIN,
  BOOM_TYPE_SHIP_EX
} from '../constants';
import { newBoom } from './boom-update';
import { newLoot } from './loot-update';

const modeList = [
  mode.PLAY
];

export const collidePlayerRocks = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  const player = state.get('player');
  const rocks = state.get('rocks');

  let alive = true;

  rocks.map((rock) => {
    if (areColliding(rock, player)){
      alive = false;
    }
  });

  if (!alive) {
    return state.set('player', player.set('alive', false))
      .set('mode', mode.GAMEOVER)
      .update('booms', (booms) => pushBooms(booms, player))
      .update('loot', (loot) => pushLoot(loot, player));
  }

  return state;
};


const pushLoot = (loot, ship) => {
  // you and copilot have fast ejection seats
  const chances = [1, 1];
  const newLootList = [];
  for (const chance of chances) {
    if (Math.random() < chance) {
      const a = Math.random() * Math.PI * 2;
      const va = (Math.random() * 2 - 1) * LIFEPOD_SPIN;
      const dv = Math.random() * LIFEPOD_SPEED;
      const dvx = dv * Math.cos(a);
      const dvy = dv * Math.sin(a);
      const x = ship.get('x');
      const y = ship.get('y');
      const vx = ship.get('vx');
      const vy = ship.get('vy');
      newLootList.push(newLoot(x, y, vx + dvx, vy + dvy, va, LOOT_TYPE_LIFEPOD));
    }
    return loot.concat(newLootList);
  }
};

const pushBooms = (booms, ship) => {
  const x = ship.get('x');
  const y = ship.get('y');
  const vx = ship.get('vx');
  const vy = ship.get('vy');
  const randv = () => (Math.random() - 0.5) * 20;
  const newBooms = [];
  newBooms.push(newBoom(x,y,vx,vy,BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  newBooms.push(newBoom(x,y,vx+randv(),vy+randv(),BOOM_TYPE_SHIP_EX));
  return booms.concat(newBooms);
};
