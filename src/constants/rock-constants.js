

export const VA = 0.05; // new rock angular velocity wiggle (rad/tick)
export const SPEED = 50 / 60; // max speed of spawned rocks (px/tick)
export const CALF_SPEED = 55 / 60; // max speed gain of calved rocks (px/tick)

// point generation constants
export const PT_N = 9; // number of rock points
export const PT_A = 25 * Math.PI / 180; // point angle wiggle (rad)
export const PT_R = 0.55;  // point radius wiggle (fraction)

export const SPAWN_CHANCE = 0.5; // chance of a rock spawning (probability)
export const SPAWN_DELAY = 190; // time between spawn chances (ticks)

// sizes
export const SMALL = 'small';
export const MEDIUM = 'medium';
export const LARGE = 'large';
export const HUGE = 'huge';
export const SIZES = [
  'small',
  'medium',
  'large',
  'huge'
];
export const SIZE_STEP = { // what is the next size down?
  small: false,
  medium: 'small',
  large: 'medium',
  huge: 'large'
};
export const SIZE_TO_RADIUS = { // radii (px)
  small: 8,
  medium: 15,
  large: 25,
  huge: 35
};

// types
export const TYPE_S = 'S';
export const TYPE_C = 'C';
export const TYPE_M = 'M';
export const TYPES = [
  TYPE_S,
  TYPE_C,
  TYPE_M
];
