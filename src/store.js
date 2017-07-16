
import { List, Map } from 'immutable';

import * as mode from './mode-types';
import {
  PLAYER,
  CANVAS,
  ROCK_SIZES,
  ROCK_SIZE_TO_RADIUS
} from './constants';

const initialRocks = List([
  Map({
    x: CANVAS.WIDTH - 200,
    y: CANVAS.HEIGHT - 200,
    vx: 0.6,
    vy: -0.6,
    r: ROCK_SIZE_TO_RADIUS[ROCK_SIZES[ROCK_SIZES.length - 1]],
    size: ROCK_SIZES[ROCK_SIZES.length - 1]
  })
]);

// base initial state
export const initialBaseGuild = Map({
  x: 200,
  y: CANVAS.HEIGHT - 200,
  a: 2,
  va: -0.008,
  r: 35,
  img: 'baseGuild'
});

export const initialBaseMed = Map({
  x: CANVAS.WIDTH - 200,
  y: 200,
  a: 5,
  va: 0.002,
  r: 40,
  img: 'baseMed'
});

export const initialStore = Map({
  rocks: initialRocks,
  bullets: List(),
  booms: List(),
  loot: List(),
  ships: List(),
  bases: List([
    initialBaseGuild,
    initialBaseMed
  ]),
  player: Map(PLAYER),
  ticks: 0,
  cargo: Map({lifepod: 0, crystal: 0}),
  score: Map({lifepod: 0, crystal: 0, ship: 0}),
  hiscore: Map({lifepod: 0, crystal: 0, ship: 0}),
  mode: mode.PLAY
});
