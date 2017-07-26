
import { Map } from 'immutable';

import { wrap } from './physics';
import * as mode from '../mode-types';
import * as ROCK from '../constants/rock-constants';
import * as CANVAS from '../constants/canvas-constants';
import * as util from '../util';

const modeList = [
  mode.PLAY,
  mode.GAMEOVER
];


export const update = (state, keys) => {
  if (!modeList.includes(state.get('mode'))) {
    return state;
  }
  return state.update('rocks', (rocks) =>  rocks.map(updateRock));
};

const updateRock = (rock) => {
  return rock.asMutable()
    .update('x', (x) => wrap(x + rock.get('vx'), CANVAS.WIDTH))
    .update('y', (y) => wrap(y + rock.get('vy'), CANVAS.HEIGHT))
    .update('a', (a) => a + rock.get('va'))
    .asImmutable();
};


const getPoint = (aStart) => {
  const a = aStart + (Math.random() - 0.5) * ROCK.PT_A;
  return {
    x: Math.cos(a) * (1 + (Math.random() - 0.5) * ROCK.PT_R),
    y: Math.sin(a) * (1 + (Math.random() - 0.5) * ROCK.PT_R)
  };
};

export const getPoints = () => {
  const pts = [];
  let a = 0;
  const NUM_POINTS = ROCK.PT_N + util.randCtrRange(2);
  const angleInc = 2*Math.PI / NUM_POINTS;
  for (let i = 0; i < NUM_POINTS; i++) {
    pts.push(getPoint(a));
    a = a + angleInc;
  }
  return pts;
};


export const newRock = (x, y, vx, vy, a, va, size, pts, type, color) => {
  return Map({
    x,
    y,
    size,
    r: ROCK.SIZE_TO_RADIUS[size],
    vx,
    vy,
    a,
    va,
    pts,
    type,
    color
  });
};
