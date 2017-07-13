
import _ from 'lodash';

import * as player from './player';

let keys = null;

export const updateGame = (state, argKeys) => {
  // console.log(state);
  keys = argKeys;
  return flowFunction(state.asMutable(), keys).asImmutable();
};

const tick = (state) => {
  return state.update('ticks', (x) => x + 1 );
};

const mode = (state) => {
  return state;
}

const flowFunction = _.flow(
  player.update,
  tick,
  mode
);
