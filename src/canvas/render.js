
import { img, draw } from './images';

// given a game state and a canvas context, draw onto the canvas everthing that belongs there
export const renderCanvas = (ctx, state) => {
  // things drawn onto a canvas will cover anything already drawn
  // console.log(state);
  const tick = state.get('tick');
  renderBg(ctx);
  renderBases(ctx);
  renderLoot(ctx);
  renderBullets(ctx);
  renderRocks(ctx);
  renderShips(ctx);
  renderPlayer(ctx, tick);
  renderBooms(ctx);
};

const renderBg = (ctx) => {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // draw(ctx, img.bg, 400, 325);
  // ctx.drawImage(img.bg, 0, 0);
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
  draw(ctx, img.player, 150, 150);
  // ctx.drawImage(img.player, 200, 200);
  return;
};

const renderBooms = (ctx) => {
  return;
};

