
import { combineReducers } from 'redux';

import keyReducer from './keyReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  game: gameReducer,
  keys: keyReducer
});
