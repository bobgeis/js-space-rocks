
import * as CANVAS from '../constants/canvas-constants';
import * as ROCK from '../constants/rock-constants';
import * as util from '../util';

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
    const a = rock.get('a');
    const pts = rock.get('pts');
    const color = rock.get('color');
    drawRock(ctx, x, y, r, a, color, pts);
    // handle drawing near the edges
    if (x + r > CANVAS.WIDTH) {
      drawRock(ctx, x - CANVAS.WIDTH, y, r, a, color, pts);
    } else if (x - r < 0) {
      drawRock(ctx, x + CANVAS.WIDTH, y, r, a, color, pts);
    }
    if (y + r > CANVAS.HEIGHT) {
      drawRock(ctx, x, y - CANVAS.HEIGHT, r, a, color, pts);
    } else if (y - r < 0) {
      drawRock(ctx, x, y + CANVAS.HEIGHT, r, a, color, pts);
    }
  });
  return;
};

const drawRock = (ctx, x, y, r, a, color, pts) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(a);
  // start at the last point
  ctx.moveTo(pts[pts.length-1].x * r, pts[pts.length-1].y * r);
  // draw a line to each point from the previous
  for (const pt of pts) {
    ctx.lineTo(pt.x * r, pt.y * r);
  }
  // fill the shape
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};


const getPoint = (aStart) => {
  const a = aStart + (Math.random() - 0.5) * ROCK.PT_A;
  return {
    x: Math.cos(a) * (1 + (Math.random() - 0.5) * ROCK.PT_R),
    y: Math.sin(a) * (1 + (Math.random() - 0.5) * ROCK.PT_R)
  };
};

export const getPoints = () => {
  const pts = [];
  let a = 0;
  const NUM_POINTS = ROCK.PT_N + util.randCtrRange(2);
  const angleInc = 2*Math.PI / NUM_POINTS;
  for (let i = 0; i < NUM_POINTS; i++) {
    pts.push(getPoint(a));
    a = a + angleInc;
  }
  return pts;
};
