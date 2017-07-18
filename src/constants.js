
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
  'KeyU': 'clearhiscore',
  'KeyZ': 'omega13', // handled separately
  'KeyL': 'log',
  'KeyR': 'reset',
  'Enter': 'enter',
  'Escape': 'escape',
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
  cd: 0  // remaining weapon cooldown (ticks)
};

export const TURN = 0.1; // turn rate in (rad/tick)
export const THRUST = 0.045; // acceleration (px/tick/tick)
export const RETRO = THRUST/4; // acceleration while reversing (px/tick/tick)
export const DAMP = 1 - 0.0004; // drag (fraction/tick)
export const WPN_COOLDOWN = 10; // delay between firing weapon (ticks)

export const BULLET_LIFETIME = 65; // lifetime of a bullet (ticks)
export const BULLET_SPEED = 8; // muzzle velocity of a bullet (px/tick)
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
export const SHIP_SPAWN_CHANCE = 0.45; // chance of a ship spawning (probability)
export const SHIP_SPAWN_DELAY = 172; // time between spawn chances (ticks)
// export const SHIP_NUM_TYPES = 4; // number of different ship types // one removed for being too similar to player ship
export const SHIP_NUM_TYPES = 3; // number of different ship types

export const LOOT_TYPE_LIFEPOD = 'lifepod';
export const LIFEPOD_CHANCE = [0.9, 0.7, 0.3, 0.1]; // chance to spawn lifepods
// export const LIFEPOD_CHANCE = []; // chance to spawn lifepods
export const LIFEPOD_LIFETIME = 1200; // lifetime of lifepods (ticks)
export const LIFEPOD_SPEED = 50 / 60; // lifepod launch speed (px/tick)
export const LIFEPOD_SPIN = 0.1; // lifepod spin speed (rad/tick)

export const LOOT_TYPE_CRYSTAL = 'crystal';
export const CRYSTAL_CHANCE = 0.6; // chance booming rock leaves crystal
export const CRYSTAL_LIFETIME = 1200; // lifetime of crystals (ticks)
export const CRYSTAL_SPEED = 50 / 60; // crystal launch speed (px/tick)
export const CRYSTAL_SPIN = 0.2; // crystal spin speed (rad/tick)

export const LOOT_RADIUS = 2; // radius of loot items (px)
export const LOOT_TYPES_TO_LIFETIMES = {};
LOOT_TYPES_TO_LIFETIMES[LOOT_TYPE_LIFEPOD] = LIFEPOD_LIFETIME;
LOOT_TYPES_TO_LIFETIMES[LOOT_TYPE_CRYSTAL] = CRYSTAL_LIFETIME;

export const ROCK_SPEED = 50 / 60; // max speed of spawned rocks (px/tick)
export const ROCK_CALF_SPEED = 1; // max speed gain of calved rocks (px/tick)
export const ROCK_SPAWN_CHANCE = 0.45; // chance of a rock spawning (probability)
export const ROCK_SPAWN_DELAY = 191; // time between spawn chances (ticks)
// export const ROCK_SPAWN_DELAY = 7;
export const ROCK_SIZES = [
  'small',
  'medium',
  'large',
  'huge'
];
export const ROCK_SIZE_STEP = { // what is the next size down?
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

// explosions and flash stuff
export const BOOM_TYPE_ROCK_EX = "ROCKBOOM";
export const BOOM_TYPE_ROCK_IN = "ROCKFLASH";
export const BOOM_TYPE_SHIP_EX = "SHIPBOOM";
export const BOOM_TYPE_SHIP_IN = "SHIPFLASH";

export const BOOM_LIFETIMES = {};   // duration (ticks)
BOOM_LIFETIMES[BOOM_TYPE_ROCK_EX] = 13;
BOOM_LIFETIMES[BOOM_TYPE_ROCK_IN] = 10;
BOOM_LIFETIMES[BOOM_TYPE_SHIP_EX] = 13;
BOOM_LIFETIMES[BOOM_TYPE_SHIP_IN] = 10;

export const BOOM_INIT_RADII = {};  // initial size (px)
BOOM_INIT_RADII[BOOM_TYPE_ROCK_EX] = 22;
BOOM_INIT_RADII[BOOM_TYPE_ROCK_IN] = 40;
BOOM_INIT_RADII[BOOM_TYPE_SHIP_EX] = 22;
BOOM_INIT_RADII[BOOM_TYPE_SHIP_IN] = 30;

export const BOOM_END_RADII= {};   // end size (px)
BOOM_END_RADII[BOOM_TYPE_ROCK_EX] = 60;
BOOM_END_RADII[BOOM_TYPE_ROCK_IN] = 7;
BOOM_END_RADII[BOOM_TYPE_SHIP_EX] = 40;
BOOM_END_RADII[BOOM_TYPE_SHIP_IN] = 5;
