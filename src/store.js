
import Immutable, { List, Map } from 'immutable';

import { PLAYER } from './constants';


export const initialStore = {
  rocks: List(),
  shots: List(),
  booms: List(),
  loot: List(),
  ships: List(),
  bases: List(),
  player: Map(PLAYER),
  ticks: 0,
  cargo: Map({pod: 0, crystal: 0}),
  score: Map({pod: 0, crystal: 0, ship: 0}),
  hiscore: Map({pod: 0, crystal: 0, ship: 0}),
  mode: 'play'
};
