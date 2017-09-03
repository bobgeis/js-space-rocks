
import { img, draw, loadImageFile } from './images';
import { TYPES_TO_LIFETIMES, RADIUS } from '../constants/loot-constants';
import { TAU, WEST, ENE } from '../constants/misc-constants';
import { glowColor, dimGlowColor } from '../util';

// prepare images
export const loadImages = () => {
  return {
    crystal: loadImageFile('crystal.png'),
    lifepod: loadImageFile('lifepod.png')
  };
};

// draw ship images to ctx from state
export const drawLoot = (ctx, state) => {
  const lootList = state.get('loot');
  lootList.map((loot) => {
    const x = loot.get('x');
    const y = loot.get('y');
    const a = loot.get('a');
    const type = loot.get('type');
    const life = loot.get('life');
    const g = life / TYPES_TO_LIFETIMES[type];
    drawLootShape(ctx, x, y , a, g, type);
    // loot is small enough that drawing them wrapped is unnecessary
  });
};

const drawLootShape = (ctx, x, y, a, g, type) => {
  const r = RADIUS - 0.5;
  switch (type) {
    case 'crystal':
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-a);
      ctx.beginPath();
      ctx.fillStyle = glowColor(g);
      ctx.rect(-r,-r,2*r,2*r);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = dimGlowColor(g);
      ctx.beginPath();
      ctx.rect(-r,-r,r,r);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.rect(0,0,r,r);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
      return;
    case 'lifepod':
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(-a);
      ctx.arc(0, 0, r, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r, -ENE, 2 * ENE);
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = dimGlowColor(g);
      ctx.strokeStyle = glowColor(g);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, r, WEST - ENE, WEST + 2 * ENE);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      return;
    default:
      return;
  }
};
