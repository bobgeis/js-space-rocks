
import { img, draw, loadImageFile } from './images';

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
    const key = loot.get('type');
    draw(ctx, img.loot[key], x, y, a);
    // loot is small enough that drawing them wrapped is unnecessary
  });
};
