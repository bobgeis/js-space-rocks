
// the string returned by event.code
export const KeyW = 'KeyW';
export const KeyA = 'KeyA';
export const KeyS = 'KeyS';
export const KeyD = 'KeyD';
export const KeyP = 'KeyP';
export const KeyU = 'KeyU';
export const KeyL = 'KeyL';
export const KeyZ = 'KeyZ';
export const Enter = 'Enter';
export const Escape = 'Escape';
export const ArrowLeft = 'ArrowLeft';
export const ArrowRight = 'ArrowRight';
export const ArrowUp = 'ArrowUp';
export const ArrowDown = 'ArrowDown';
export const Space = 'Space';

// in list form for KEYS.include() etc
export const KEYS = [
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyP',
  'KeyU',
  'KeyL',
  'KeyZ',
  'Enter',
  'Escape',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Space'
];

// map to game command
export const KEYS_TO_COMMANDS = {
  'KeyW': 'up',
  'KeyA': 'left',
  'KeyS': 'down',
  'KeyD': 'right',
  'KeyP': 'pause',
  'KeyU': 'clearhiscore',
  'KeyZ': 'omega13', // handled separately
  'KeyL': 'log',
  'Enter': 'enter',
  'Escape': 'escape',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'Space': 'fire'
};

