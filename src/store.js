
import Immutable, { List, Map } from 'immutable';

export const initialStore = {
  rocks: List(),
  shots: List(),
  booms: List(),
  loot: List(),
  ships: List(),
  bases: List(),
  player: null,
  ticks: 0,
  cargo: Map({pod: 0, crystal: 0}),
  score: Map({pod: 0, crystal: 0, ship: 0}),
  hiscore: Map({pod: 0, crystal: 0, ship: 0}),
  mode: 'splash'
};
