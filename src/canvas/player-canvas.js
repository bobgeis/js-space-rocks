
import { img, draw, loadImageFile } from './images';
import { GLOW_MAX } from '../constants/player-constants';
import { glowColor, dimGlowColor } from '../util';
import * as CANVAS from '../constants/canvas-constants';
import * as mode from '../mode-types';

// prepare player image
export const loadImage = () => {
  return loadImageFile('player.png');
};

const modeList = [
  mode.PLAY,
  mode.PAUSE,
  mode.SPLASH
];

// draw player image to ctx from map
export const drawPlayer = (ctx, state) => {
  if (!modeList.includes(state.get('mode'))) {
    return;
  }
  const player = state.get('player');
  const x = player.get('x');
  const y = player.get('y');
  const a = player.get('a');
  const r = player.get('r');
  const g = player.get('glow') / GLOW_MAX;
  drawPlayerShape(ctx, x, y, a, g);
  // handle drawing near the edges
  let xWrapped, yWrapped;
  if (x + r > CANVAS.WIDTH) {
    xWrapped = x - CANVAS.WIDTH;
    drawPlayerShape(ctx, xWrapped, y, a, g);
  } else if (x - r < 0) {
    xWrapped = x + CANVAS.WIDTH;
    drawPlayerShape(ctx, xWrapped, y, a, g);
  }
  if (y + r > CANVAS.HEIGHT) {
    yWrapped = y - CANVAS.HEIGHT;
    drawPlayerShape(ctx, x, yWrapped, a, g);
  } else if (y - r < 0) {
    yWrapped = y + CANVAS.HEIGHT;
    drawPlayerShape(ctx, x, yWrapped, a, g);
  }
  // fizzbuzz
  if (xWrapped && yWrapped) {
    drawPlayerShape(ctx, xWrapped, yWrapped, a, g);
  }
};

const drawPlayerShape = (ctx, x, y, a, g) => {
  const r = 10;
  // save ctx
  ctx.save();
  // draw body
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FF0000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(-a);
  ctx.moveTo(0, r);
  ctx.bezierCurveTo(r*1.5, r, r*1.5, -r, 0, -r);
  ctx.quadraticCurveTo(r/2, -r/4, -r, 0);
  ctx.quadraticCurveTo(r/2, r/4, 0, r);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  // draw emblem
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(r/2, -r/4);
  ctx.lineTo(r/2, r/4);
  ctx.stroke();
  ctx.moveTo(r/2 + r/4, 0);
  ctx.lineTo(r/2 - r/4, 0);
  ctx.stroke();
  ctx.closePath();
  // draw engines
  ctx.fillStyle = glowColor(g);
  ctx.strokeStyle = dimGlowColor(g);
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(r/12, -r/2, r/2, r/8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.ellipse(r/12, r/2, r/2, r/8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  // restore ctx
  ctx.restore();
};
