
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
  turn: 0.1, // turn rate in rad/tick
  thrust: 0.02, // acceleration px/tick/tick
  r: 10,  // radius (px)
  cd: 0,  // remaining weapon cooldown (ticks)
  delay: 10,  // max weapon cooldown (ticks)
  alive: true,  // default to alive
  firing: false   // weapon trigger is not being held
};

// base initial state
export const baseGuild = {
  x: 0,
  y: 0,
  a: 0,
  va: 0,
  r: 0
};

export const baseMed = {
  x: 0,
  y: 0,
  a: 0,
  va: 0,
  r: 0
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

