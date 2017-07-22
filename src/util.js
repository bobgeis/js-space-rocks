
import * as CANVAS from './constants/canvas-constants';

// utility functions

const TAU = Math.PI * 2; // two pi is used a lot

export const randRange = (range) => Math.random() * range; // random float 0 to range, not including range

export const randInt = (range) => Math.floor(randRange(range)); // int 0 to range-1

export const randCtr = () => (Math.random() - 0.5) * 2; // random bt -1 and 1

export const randCtrRange = (range) => randCtr() * range; // random bt -range and +range

export const randChoice = (array) => array[randInt(array.length)]; // random member of an array

export const wrap = (s, max) => {
  return s < 0 ? s + max : s > max ? s - max : s;
};

export const wrapA = (a) => wrap(a, TAU);

export const wrapX = (x) => wrap(x, CANVAS.WIDTH);

export const wrapY = (y) => wrap(y, CANVAS.HEIGHT);

export const log = (arg) => {
  console.log(arg);
  return arg;
}