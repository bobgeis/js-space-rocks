
import _ from 'lodash';

import * as modes from '../mode-types';
import { initialStore } from '../store';
import { clearHiScore } from '../local-storage';

import * as player from './player-logic';
import * as base from './base-logic';
import * as rock from './rock-logic';
import * as bullet from './bullet-logic';
import * as ship from './ship-logic';
import * as loot from './loot-logic';
import * as boom from './boom-logic';
import { collidePlayerBases } from './bases-player';
import { collideRocksBullets } from './bullets-rocks';
import { collideShipsRocks } from './rocks-ships';
import { collideLootPlayer } from './loot-player';
import { collidePlayerRocks } from './player-rocks';
import timerSpawn from './timer-spawn';

const modesForTick = [
  modes.PLAY,
  modes.GAMEOVER
];

const tick = (state, keys) => {
  if (keys.get('log')) {
    console.log(state);
    console.log(keys);
  }
  if (!modesForTick.includes(state.get('mode'))) {
    return state;
  }
  return state.update('ticks', (x) => x + 1 );
};

const updateMode = (state, keys) => {
  const currMode = state.get('mode');
  if (keys.get('pause') && currMode === modes.PLAY) {
    return state.set('mode', modes.PAUSE);
  }
  if (keys.get('clearhiscore')){
    clearHiScore();
  }
  if (keys.get('enter')) {
    if (currMode === modes.PAUSE) {
      return state.set('mode', modes.PLAY);
    } else if (currMode === modes.SPLASH) {
      return initialStore.set('mode', modes.PLAY);
    } else if (currMode === modes.GAMEOVER) {
      console.log(initialStore);
      return initialStore;
    }
  }
  return state;
};

const updateFunctionsList = [
  tick,
  updateMode,
  player.update,
  base.update,
  rock.update,
  bullet.update,
  ship.update,
  loot.update,
  boom.update,
  collideRocksBullets,
  collideShipsRocks,
  collideLootPlayer,
  collidePlayerBases,
  collidePlayerRocks,
  timerSpawn
];

export const updateGame = (state, keys) => {
  return updateFunctionsList
    .reduce((transient, fun) => fun(transient, keys), state.asMutable())
    .asImmutable();
};
