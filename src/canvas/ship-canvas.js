
import { img, draw, loadImageFile } from './images';
import * as SHIP from '../constants/ship-constants';


const shipImageFilePaths = [
  'shipCiv.png',
  'shipGuild.png',
  'shipMed.png',
  'shipSci.png'
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

const drawShipShape = (ctx, ship) => {
  const glowColor = findGlowColor(ship.get('glow') / SHIP.GLOW_MAX);
  return;
};

const findGlowColor = (g) => {
  const red = Math.min(Math.floor(130 * g + 25),255);
  const green = Math.min(Math.floor(130 * g + 125),255);
  const blue =Math.min(Math.floor(80 * g + 175),255);
  return `rgb(${red}, ${green}, ${blue})`;
};
