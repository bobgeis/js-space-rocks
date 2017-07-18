
import { img, draw, loadImageFile } from './images';


const shipImageFilePaths = [
  './res/img/shipCiv.png',
  './res/img/shipGuild.png',
  './res/img/shipMed.png',
  './res/img/shipSci.png'
];

export const SHIP_NUM_TYPES = shipImageFilePaths.length;

// prepare ship images
export const loadImages = () => {
  return shipImageFilePaths.map((file) => loadImageFile(file));
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
