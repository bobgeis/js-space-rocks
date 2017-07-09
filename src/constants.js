
export const CANVAS = {
  HEIGHT: 650,
  WIDTH: 800
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
  // 'KeyZ': 'omega', // handled separately
  'KeyR': 'reset',
  'Enter': 'enter',
  'Escape':' escape',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'Space': 'fire'
};

export const PLAYER = {
  x0: 0,
  y0: 0,
  vx0: 0,
  vy0: 0,
  ang0: 90,
  radius: 10,
  reload: 0,
  delay: 10,
  alive: true,
  firing: false
};
