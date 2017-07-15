
import { CANVAS, BULLET_LIFETIME } from '../constants';

export const drawBullets = (ctx, state) => {
  const bullets = state.get('bullets');
  bullets.map((bullet) => {
    const x = bullet.get('x');
    const y = bullet.get('y');
    const color = getColor(bullet.get('life'));
    drawBullet(ctx, x, y, color);
  });
};

const drawBullet = (ctx, x, y, color) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

const getColor = (life) => {
  const dec = Math.floor(50 + 200 * life / BULLET_LIFETIME);
  // return `rgba(0, ${255 * ratio}, ${255 * ratio}, 1)`;
  return `#55${dec.toString(16)}FF`
}
