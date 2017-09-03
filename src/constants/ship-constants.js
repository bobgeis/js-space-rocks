

// constants related to the transport ships
export const RADIUS = 7; // radius of transport ship (px)
export const SPEED = 50 / 60; // speed of transport ship (px/tick)
export const SPAWN_CHANCE = 0.45; // chance of a ship spawning (probability)
export const SPAWN_DELAY = 160; // time between spawn chances (ticks)
export const SPAWN_SPEEDUP = 0.5; // how much to reduce spawn delay
export const MIN_SPAWN_DELAY = 30; // the delay cannot be reduced below this (ticks)
export const GLOW_MAX = 50; // number of ticks to go from brightest to dimmest

export const COLORS = {
  med: {HULL: '#FFFFFF', TRIM: '#FF0000'},
  civ: {HULL: '#FFFFFF', TRIM: '#800080'},
  sci: {HULL: '#FFFFFF', TRIM: '#009696'},
  guild: {HULL: '#C8C8C8', TRIM: '#FF8000'}
};

export const IMG_KEY_TO_TYPE = [
  'civ',
  'guild',
  'med',
  'sci'
];
