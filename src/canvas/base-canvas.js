
import { img, draw, loadImageFile } from './images';

// prepare base images
export const loadImageGuild = () => {
  return loadImageFile('./res/img/baseGuild.png', 0, 70, 70);
};

export const loadImageMed = () => {
  return loadImageFile('./res/img/baseMed.png',0, 80, 80);
};

// draw base images to ctx from map
export const drawBases = (ctx, state) => {
  const list = state.get('bases');
  list.map((base) => {
    draw(
      ctx,
      img[base.get('img')],
      base.get('x'),
      base.get('y'),
      base.get('a')
    );
  });
};
