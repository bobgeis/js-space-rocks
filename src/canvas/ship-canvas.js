
import { img, draw, loadImageFile } from './images';
import { CANVAS } from '../constants';

// prepare player image
export const loadImages = () => {
  return [
    loadImageFile('./res/img/shipCiv.png'),
    loadImageFile('./res/img/shipGuild.png'),
    loadImageFile('./res/img/shipMed.png'),
    loadImageFile('./res/img/shipSci.png')
  ];
};

// draw ship images to ctx from state
export const drawShips = (ctx, state) => {
  const ships = state.get('ships');
  ships.map((ship) => {
    const x = ship.get('x');
    const y = ship.get('y');
    const a = ship.get('a');
    const key = ship.get('imgKey');
    draw(ctx, img.ships[key], x, y, a);
  });
};
