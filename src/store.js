
import { List, Map } from 'immutable';

import * as mode from './mode-types';
import {
  PLAYER,
  BASE_GUILD,
  BASE_MED,
  CANVAS
} from './constants';

const initialRocks = List([
  Map({
    x: CANVAS.WIDTH - 200,
    y: CANVAS.HEIGHT - 200,
    vx: 0.6,
    vy: -0.6,
    r: 40,
    size: 'huge'
  })
]);

export const initialStore = Map({
  rocks: initialRocks,
  shots: List(),
  booms: List(),
  loot: List(),
  ships: List(),
  bases: List([
    Map(BASE_GUILD),
    Map(BASE_MED)
  ]),
  player: Map(PLAYER),
  ticks: 0,
  cargo: Map({pod: 0, crystal: 0}),
  score: Map({pod: 0, crystal: 0, ship: 0}),
  hiscore: Map({pod: 0, crystal: 0, ship: 0}),
  mode: mode.PLAY
});
