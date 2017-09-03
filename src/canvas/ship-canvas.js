
import { img, draw, loadImageFile } from './images';
import * as SHIP from '../constants/ship-constants';
import { TAU } from '../constants/misc-constants';
import { glowColor, dimGlowColor } from '../util';


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
    const type = ship.get('type');
    const g = ship.get('glow') / SHIP.GLOW_MAX;
    drawShipShape(ctx, x, y, a, g, type);
    // draw(ctx, img.ships[key], x, y, a);
  });
};

const drawShipShape = (ctx, x, y, a, g, type) => {
  const r = 7;
  // save context
  ctx.save();
  // draw body
  ctx.fillStyle = SHIP.COLORS[type].HULL;
  ctx.strokeStyle = SHIP.COLORS[type].TRIM;
  ctx.lineWidth = r/10;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(-a);
  ctx.arc(0, 0, r, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  // draw emblem
  drawShipEmblem(ctx, r, type);
  // draw engine
  ctx.fillStyle = glowColor(g);
  ctx.strokeStyle = dimGlowColor(g);
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.ellipse(-r, r/3, r/6, r/8, 0, 0, TAU);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.ellipse(-r, -r/3, r/6, r/8, 0, 0, TAU);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.ellipse(-r, 0, r/2, r/4, 0, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  // restore context
  ctx.restore();
};

const drawShipEmblem = (ctx, r, type) => {
  switch (type) {
    case "med":
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(r/6, -2.5);
      ctx.lineTo(r/6, 2.5);
      ctx.stroke();
      ctx.moveTo(r/6 + 2.5, 0);
      ctx.lineTo(r/6 - 2.5, 0);
      ctx.stroke();
      ctx.closePath();
      return;
    case "civ":
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.arc(r/6, 0, 2, 0, TAU);
      ctx.stroke();
      ctx.closePath();
      return;
    case "sci":
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.ellipse(r/6, 0, 3, 1.5, 0, 0, TAU);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.ellipse(r/6, 0, 1.5, 3, 0, 0, TAU);
      ctx.stroke();
      ctx.closePath();
      return;
    case "guild":
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(r/6 + 2, -2.5);
      ctx.lineTo(r/6 + 2, 2.5);
      ctx.stroke();
      ctx.moveTo(r/6 + 2.5, 0);
      ctx.lineTo(r/6 - 2.5, 0);
      ctx.stroke();
      ctx.closePath();
      return;
    default:
      return;
  }
};
