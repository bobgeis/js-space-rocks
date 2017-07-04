
import * as imm from 'immutable';

import { PLAYER as def } from './constant';

const Player = imm.Record({
  x: def.x0,
  y: def.y0,
  vx: def.vx0,
  vy: def.vy0,
  a: def.ang0,
  r: def.radius,
  isAlive: def.alive,
  isFiring: def.isFiring,
  reload: def.reload
});

export const initialPlayer = new Player();
