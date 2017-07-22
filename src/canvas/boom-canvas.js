
import {
  BOOM_LIFETIMES,
  BOOM_INIT_RADII,
  BOOM_END_RADII,
  BOOM_TYPE_ROCK_EX,
  BOOM_TYPE_ROCK_IN,
  BOOM_TYPE_SHIP_EX,
  BOOM_TYPE_SHIP_IN
} from '../constants';
import * as CANVAS from '../constants/canvas-constants';

export const drawBooms = (ctx, state) => {
  const booms = state.get('booms');
  booms.map((boom) => {
    const x = boom.get('x');
    const y = boom.get('y');
    const type = boom.get('type');
    const flash = type === BOOM_TYPE_ROCK_IN || type === BOOM_TYPE_SHIP_IN;
    const wrap = type === BOOM_TYPE_ROCK_EX || type === BOOM_TYPE_ROCK_IN;
    const ratio = boom.get('life') / BOOM_LIFETIMES[type];
    const r = BOOM_END_RADII[type] - ratio * (BOOM_END_RADII[type] - BOOM_INIT_RADII[type]);
    const color = getColor(ratio, flash);
    drawBoom(ctx, x, y, r, color);
    if (wrap) {
      // handle drawing near the edges
      if (x + r > CANVAS.WIDTH) {
        drawBoom(ctx, x - CANVAS.WIDTH, y, r, color);
      } else if (x - r < 0) {
        drawBoom(ctx, x + CANVAS.WIDTH, y, r, color);
      }
      if (y + r > CANVAS.HEIGHT) {
        drawBoom(ctx, x, y - CANVAS.HEIGHT, r, color);
      } else if (y - r < 0) {
        drawBoom(ctx, x, y + CANVAS.HEIGHT, r, color);
      }
    }
  });
};

const drawBoom = (ctx, x, y, r, color) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

const getColor = (ratio, flash) => {
  if (flash) {
    // get colors for blue FTL fash
    const blue = Math.floor(130 + ratio * 125);
    const green = Math.floor(ratio * 255);
    const red = Math.floor(Math.max(ratio * ratio * 245));
    return `rgba(${red}, ${green}, ${blue}, ${ratio/2 + 0.5})`;
  } else {
    // get colors for red explosion
    const red = Math.floor(130 + ratio * 125);
    const green = Math.floor(ratio * 255);
    const blue = Math.floor(Math.max(ratio * ratio * 245));
    return `rgba(${red}, ${green}, ${blue}, ${ratio/2 + 0.5})`;
  }
};

