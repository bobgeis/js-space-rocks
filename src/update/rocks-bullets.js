
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
  // let rocks = state.get('rocks');
  // let bullets = state.get('bullets');
  // for (const rock in rocks) {
  //   let alive = true;
  //   for (const bullet in bullets) {
  //     if (areColliding(rock, bullet)) {
  //       alive = false;
  //     }
  //   }
  // }
  // const {rocks, bullets, calves, loot}
  return state;
};

const reducer = (reduction, rock) => {
  return;
};

const initReducer = () => {
  return {
    rocks: [],  // rocks that survived
    bullets: [],  // bullets that survived
    booms: [],  // explosions that resulted
    calves: [],  // calves from rocks that did not survive
    loot: []  // any crystals produced
  };
};
