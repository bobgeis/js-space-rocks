
import { List, Map } from 'immutable';

import * as mode from './mode-types';
import {
  PLAYER,
  BASE_GUILD,
  BASE_MED
} from './constants';


export const initialStore = Map({
  rocks: List(),
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
