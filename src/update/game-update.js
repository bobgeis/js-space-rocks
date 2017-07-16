
import _ from 'lodash';

import * as modes from '../mode-types';
import { initialStore } from '../store';

import * as player from './player-update';
import * as base from './base-update';
import * as rock from './rock-update';
import * as bullet from './bullet-update';
import * as ship from './ship-update';
import * as loot from './loot-update';
import * as boom from './boom-update';
import { collideRocksBullets } from './rocks-bullets';
import { collideShipsRocks } from './ships-rocks';
import { collideLootPlayer } from './loot-player';
import { collidePlayerBases } from './player-bases';
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
  if (keys.get('enter')) {
    if (currMode === modes.PAUSE) {
      return state.set('mode', modes.PLAY);
    } else if (currMode === modes.SPLASH) {
      return initialStore;
    } else if (currMode === modes.GAMEOVER) {
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
