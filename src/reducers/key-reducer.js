
import { Map } from 'immutable';

import * as types from '../action-types';
import { KEYS_TO_COMMANDS } from '../constants/key-constants';

// does the key state need to be a Map?
export default (state = Map(), action) => {
  switch (action.type) {
    case types.KEY_ACTION:
      return state.set(KEYS_TO_COMMANDS[action.key], action.value);
    default:
      return state;
  }
};
