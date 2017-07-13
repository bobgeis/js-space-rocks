
import { img, draw, loadImageFile } from './images';

// prepare player image
export const loadImage = () => {
  return loadImageFile('./res/img/player.png');
};

// draw player image to ctx from map
export const drawPlayer = (ctx, state) => {
  const player = state.get('player');
  draw(
    ctx,
    img.player,
    player.get('x'),
    player.get('y'),
    player.get('a')
  );
};
