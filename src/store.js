
import { List, Map } from 'immutable';

import * as mode from './mode-types';
import * as CANVAS from './constants/canvas-constants';
import * as ROCK from './constants/rock-constants';
import * as PLAYER from './constants/player-constants';
import * as MISC from './constants/misc-constants';

import { spawnRandomRock } from './update/timer-spawn';

// player initial state
const intialPlayer = Map({
  x: CANVAS.CTR_X,  // starting x position (px)
  y: CANVAS.CTR_Y, // starting y position (px)
  vx: 0,  // starting x velocity (px/tick)
  vy: 0,  // starting y velocity (px/tick)
  a: MISC.NORTH, // starting angle (rad) facing North
  r: PLAYER.RADIUS,  // radius (px)
  cd: 0  // remaining weapon cooldown (ticks)
});

// prospector base initial state
export const initialBaseGuild = Map({
  x: 150,
  y: CANVAS.HEIGHT - 150,
  a: 2,
  va: -0.008,
  r: 35,
  img: 'baseGuild',
  type: 'guild'
});

// medical base initial state
export const initialBaseMed = Map({
  x: CANVAS.WIDTH - 150,
  y: 150,
  a: 5,
  va: 0.002,
  r: 40,
  img: 'baseMed',
  type: 'med'
});

// game initial state
export const initialStore = Map({
  rocks: List([
    spawnRandomRock(),
    spawnRandomRock()
  ]),
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
