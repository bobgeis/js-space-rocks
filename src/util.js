
import * as CANVAS from './constants/canvas-constants';
import * as MISC from './constants/misc-constants';

// utility functions

export const randRange = (range) => Math.random() * range; // random float 0 to range, not including range

export const randInt = (range) => Math.floor(randRange(range)); // int 0 to range-1

export const randCtr = () => (Math.random() - 0.5) * 2; // random bt -1 and 1

export const randCtrRange = (range) => randCtr() * range; // random bt -range and +range

export const randChoice = (array) => array[randInt(array.length)]; // random member of an array

// wrapping coordinates
export const wrap = (s, max) => {
  return s < 0 ? s + max : s > max ? s - max : s;
};
export const wrapA = (a) => wrap(a, MISC.TAU);
export const wrapX = (x) => wrap(x, CANVAS.WIDTH);
export const wrapY = (y) => wrap(y, CANVAS.HEIGHT);

// clamping coordinates
export const clamp = (s, max) => {
  return s < 0 ? 0 : s > max ? max : s;
};
export const clampA = (a) => clamp(a, MISC.TAU);
export const clampX = (x) => clamp(x, CANVAS.WIDTH);
export const clampY = (y) => clamp(y, CANVAS.HEIGHT);



// debug helpers
export const log = (arg) => {
  console.log(arg);
  return arg;
}