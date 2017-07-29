
// cribbed from https://gist.github.com/blixt/f17b47c62508be59987b

// also consider: https://gist.github.com/mathiasbynens/5670917

let seed = 4; // chosen by fair die, guaranteed to be random

const BIG = 2147483646;
const SMALL = 16807;

// setup
export const initSeed = (newSeed) => {
  if (newSeed) {
    seed = newSeed;
  } else {
    seed = Math.floor(Math.random() * BIG);
  }
  return seed;
};

// get and set
export const getSeed = () => seed;
export const setSeed = (newSeed) => seed = newSeed;

// internal
const next = () => {
  return seed = (seed * SMALL) % BIG;
};

// the base random [0, 1)
export const random = () => {
  return (next() - 1) / BIG;
};

// some useful random functions
export const randRange = (max) => random() * max;
export const randInt = (max) => Math.floor(random() * max);
export const randCtr = () => (random() - 0.5) * 2;
export const randCtrRange = (range) => randCtr() * range;
export const randChoice = (array) => array[randInt(array.length)];

// remove this to keep hardcoded seed
initSeed();
