
export const CANVAS = {
  HEIGHT: 650,
  WIDTH: 800
};

export const CENTER = {
  CX: Math.floor(CANVAS.WIDTH),
  CY: Math.floor(CANVAS.HEIGHT)
};

export const KEYS = [
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyR',
  'KeyP',
  'KeyU',
  'KeyL',
  // 'KeyZ',
  'Enter',
  'Escape',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Space'
];

export const KEYS_TO_COMMANDS = {
  'KeyW': 'up',
  'KeyA': 'left',
  'KeyS': 'down',
  'KeyD': 'right',
  'KeyP': 'pause',
  'KeyU': 'unpause',
  'KeyZ': 'omega13', // handled separately
  'KeyL': 'log',
  'KeyR': 'reset',
  'Enter': 'enter',
  'Escape':' escape',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'Space': 'fire'
};

// player initial state
export const PLAYER = {
  x: CANVAS.WIDTH/2,  // starting x position (px)
  y: CANVAS.HEIGHT/2, // starting y position (px)
  vx: 0,  // starting x velocity (px/tick)
  vy: 0,  // starting y velocity (px/tick)
  a: Math.PI/2, // starting angle (rad)
  r: 10,  // radius (px)
  cd: 0,  // remaining weapon cooldown (ticks)
  alive: true  // default to alive
};

export const TURN = 0.1; // turn rate in (rad/tick)
export const THRUST = 0.02; // acceleration (px/tick/tick)
export const RETRO = 0.004; // acceleration while reversing (px/tick/tick)
export const DAMP = 1 - 0.0004; // drag (fraction/tick)
export const WPN_COOLDOWN = 10; // delay between firing weapon (ticks)

export const BULLET_LIFETIME = 70; // lifetime of a bullet (ticks)
export const BULLET_SPEED = 6; // muzzle velocity of a bullet (px/tick)
export const BULLET_RADIUS = 1; // radius (px)

// ship initial state
export const SHIP = {
  x: 0,
  y: 0,
  a: 0,
  vx: 0,
  vy: 0,
  speed: 10,
  r: 7
};

export const SHIP_RADIUS = 7; // radius of transport ship (px)
export const SHIP_SPEED = 50 / 60; // speed of transport ship (px/tick)
export const SHIP_SPAWN_CHANCE = 0.4; // chance of a ship spawning (probability)
// export const SHIP_SPAWN_DELAY = 152; // time between spawn chances (ticks)
export const SHIP_SPAWN_DELAY = 5;
export const SHIP_NUM_TYPES = 4 // number of different ship types

export const LOOT_TYPE_LIFEPOD = 'lifepod';
export const LIFEPOD_LIFETIME = 300; // lifetime of lifepods (ticks)
export const LIFEPOD_SPEED = 50 / 60; // lifepod launch speed (px/tick)

export const LOOT_TYPE_CRYSTAL = 'crystal';
export const CRYSTAL_LIFETIME = 300; // lifetime of lifepods (ticks)
export const CRYSTAL_SPEED = 50 / 60; // lifepod launch speed (px/tick)

export const ROCK_SPEED = 50 / 60; // max speed of spawned rocks (px/tick)
export const ROCK_CALF_SPEED = 2; // max speed gain of calved rocks (px/tick)
export const ROCK_SPAWN_CHANCE = 0.5; // chance of a ship spawning (probability)
// export const ROCK_SPAWN_DELAY = 171; // time between spawn chances (ticks)
export const ROCK_SPAWN_DELAY = 7;
export const ROCK_SIZES = [
  'small',
  'medium',
  'large',
  'huge'
];
export const ROCK_SIZE_STEP = {
  small: false,
  medium: 'small',
  large: 'medium',
  huge: 'large'
};
export const ROCK_SIZE_TO_RADIUS = { // radii (px)
  small: 8,
  medium: 15,
  large: 25,
  huge: 35
};
