
import { img, draw } from './images';
import { CANVAS } from '../constants';
import { drawPlayer } from './player-canvas';
import { drawBases } from './base-canvas';

// given a game state and a canvas context, draw onto the canvas everthing that belongs there
export const renderCanvas = (ctx, state) => {
  // things drawn onto a canvas will cover anything already drawn
  clearCanvas(ctx);
  // drawBg(ctx);
  drawBases(ctx, state);
  // drawLoot(ctx);
  // drawBullets(ctx);
  // drawRocks(ctx);
  // drawShips(ctx);
  drawPlayer(ctx, state);
  // drawBooms(ctx);
};

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
};

const drawBg = (ctx) => {
  // ctx.fillStyle = "#000000";
  // ctx.fillStyle = "rgba(0,0,0,0)";
  // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // draw(ctx, img.bg, 400, 325);
  // ctx.drawImage(img.bg, 0, 0);
  return;
};
