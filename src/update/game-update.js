
import _ from 'lodash';

import * as player from './player-update';
import * as base from './base-update';
import * as rock from './rock-update';

export const updateGame = (state, keys) => {
  // console.log(state);
  return flowFunction(state.asMutable(), keys).asImmutable();
};

const tick = (state) => {
  return state.update('ticks', (x) => x + 1 );
};

const mode = (state) => {
  return state;
};

const flowFunction = _.flow(
  player.update,
  base.update,
  rock.update,
  tick,
  mode
);
