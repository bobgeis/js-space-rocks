
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
  'KeyP',
  // 'KeyZ',
  'KeyR',
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
  'KeyZ': 'omega13', // handled separately
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

export const WPN_COOLDOWN = 10; // delay between firing weapon (ticks)
export const TURN = 0.1; // turn rate in (rad/tick)
export const THRUST = 0.02; // acceleration (px/tick/tick)
export const RETRO = 0.004; // acceleration while reversing (px/tick/tick)
export const DAMP = 1 - 0.0004; // drag (fraction/tick)

// base initial state
export const BASE_GUILD = {
  x: 200,
  y: CANVAS.HEIGHT - 200,
  a: 2,
  va: -0.008,
  r: 35,
  img: 'baseGuild'
};

export const BASE_MED = {
  x: CANVAS.WIDTH - 200,
  y: 200,
  a: 5,
  va: 0.002,
  r: 40,
  img: 'baseMed'
};


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
