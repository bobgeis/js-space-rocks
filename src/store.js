
import { List, Map } from 'immutable';

import * as mode from './mode-types';
import {
  PLAYER_RADIUS,
  ROCK_SIZES,
  ROCK_SIZE_TO_RADIUS
} from './constants';
import * as CANVAS from './constants/canvas-constants';

import { getPoints } from './update/rock-update';

// player initial state
const intialPlayer = Map({
  x: CANVAS.WIDTH/2,  // starting x position (px)
  y: CANVAS.HEIGHT/2, // starting y position (px)
  vx: 0,  // starting x velocity (px/tick)
  vy: 0,  // starting y velocity (px/tick)
  a: Math.PI/2, // starting angle (rad) facing North
  r: PLAYER_RADIUS,  // radius (px)
  cd: 0  // remaining weapon cooldown (ticks)
});

const initialRocks = List([
  Map({
    x: CANVAS.WIDTH - 200,
    y: CANVAS.HEIGHT - 200,
    vx: 0.6,
    vy: -0.6,
    r: ROCK_SIZE_TO_RADIUS[ROCK_SIZES[ROCK_SIZES.length - 1]],
    a: 0,
    va: 0.02,
    size: ROCK_SIZES[ROCK_SIZES.length - 1],
    pts: getPoints()
  })
]);

// base initial state
export const initialBaseGuild = Map({
  x: 150,
  y: CANVAS.HEIGHT - 150,
  a: 2,
  va: -0.008,
  r: 35,
  img: 'baseGuild',
  type: 'guild'
});

export const initialBaseMed = Map({
  x: CANVAS.WIDTH - 150,
  y: 150,
  a: 5,
  va: 0.002,
  r: 40,
  img: 'baseMed',
  type: 'med'
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
  player: intialPlayer,
  ticks: 0,
  cargo: Map({lifepod: 0, crystal: 0}),
  score: Map({lifepod: 0, crystal: 0, ship: 0}),
  mode: mode.SPLASH
});
