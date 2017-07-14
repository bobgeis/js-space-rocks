
import { updateAngle, updatePos } from './physics';
import * as mode from '../mode-types';

export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.asMutable()
    .update('rocks', (rocks) =>  rocks.map(flow));
};

const flow = (rock) => {
  return updateAngle(updatePos(rock.asMutable())).asImmutable();
};

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];
