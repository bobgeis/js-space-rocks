
import { img, draw } from './images';
import { CANVAS } from '../constants';
import { drawPlayer } from './player';

// given a game state and a canvas context, draw onto the canvas everthing that belongs there
export const renderCanvas = (ctx, state) => {
  // things drawn onto a canvas will cover anything already drawn
  // console.log(state);
  const tick = state.get('ticks');
  // console.log(tick);
  clearCanvas(ctx);
  renderBg(ctx);
  renderBases(ctx);
  renderLoot(ctx);
  renderBullets(ctx);
  renderRocks(ctx);
  renderShips(ctx);
  renderPlayer(ctx, tick);
  drawPlayer(ctx, state);
  renderBooms(ctx);
};

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
};

const renderBg = (ctx) => {
  // ctx.fillStyle = "#000000";
  // ctx.fillStyle = "rgba(0,0,0,0)";
  // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // draw(ctx, img.bg, 400, 325);
  // ctx.drawImage(img.bg, 0, 0);
  return;
};

const renderBases = (ctx) => {
  return;
};

const renderLoot = (ctx) => {
  return;
};

const renderBullets = (ctx) => {
  return;
};

const renderRocks = (ctx) => {
  return;
};

const renderShips = (ctx) => {
  return;
};

const renderPlayer = (ctx, tick) => {
  draw(ctx, img.player, 150, 150, tick/40);
  // ctx.drawImage(img.player, 200, 200);
  return;
};

const renderBooms = (ctx) => {
  return;
};

