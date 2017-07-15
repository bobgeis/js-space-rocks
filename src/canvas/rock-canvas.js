
import { img, draw, loadImageFile } from './images';
import { CANVAS } from '../constants';

// prepare rock images
export const loadImage = () => {
  // nothing at the moment
  return;
};

// draw rock images to ctx from map
export const drawRocks = (ctx, state) => {
  const rocks = state.get('rocks');
  rocks.map((rock) => {
    const r = rock.get('r');
    const x = rock.get('x');
    const y = rock.get('y');
    const color = 'tan';
    drawRock(ctx, x, y, r, color);
    // handle drawing near the edges
    if (x + r > CANVAS.WIDTH) {
      drawRock(ctx, x - CANVAS.WIDTH, y, r, color);
    } else if (x - r < 0) {
      drawRock(ctx, x + CANVAS.WIDTH, y, r, color);
    }
    if (y + r > CANVAS.HEIGHT) {
      drawRock(ctx, x, y - CANVAS.HEIGHT, r, color);
    } else if (y - r < 0) {
      drawRock(ctx, x, y + CANVAS.HEIGHT, r, color);
    }
  });
  return;
};

const drawRock = (ctx, x, y, r, color) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}
