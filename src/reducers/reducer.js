
import { combineReducers } from 'redux';

import keyReducer from './key-reducer';
import gameReducer from './game-reducer';

export default combineReducers({
  game: gameReducer,
  keys: keyReducer
});
