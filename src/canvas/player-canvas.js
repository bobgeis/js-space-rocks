
import { img, draw, loadImageFile } from './images';
import { CANVAS } from '../constants';
import * as mode from '../mode-types';

// prepare player image
export const loadImage = () => {
  return loadImageFile('./res/img/player.png');
};

const modeList = [
  mode.PLAY
];

// draw player image to ctx from map
export const drawPlayer = (ctx, state) => {
  if (!modeList.includes(state.get('mode'))) {
    return;
  }
  const player = state.get('player');
  const x = player.get('x');
  const y = player.get('y');
  const a = player.get('a');
  const r = player.get('r');
  draw(ctx, img.player, x, y, a);
  // handle drawing near the edges
  if (x + r > CANVAS.WIDTH) {
    draw(ctx, img.player, x - CANVAS.WIDTH, y, a);
  } else if (x - r < 0) {
    draw(ctx, img.player, x + CANVAS.WIDTH, y, a);
  }
  if (y + r > CANVAS.HEIGHT) {
    draw(ctx, img.player, x, y - CANVAS.HEIGHT, a);
  } else if (y - r < 0) {
    draw(ctx, img.player, x, y + CANVAS.HEIGHT, a);
  }
};
