
import * as CANVAS from './constants/canvas-constants';

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

export const BULLET_LIFETIME = 54; // lifetime of a bullet (ticks)
export const BULLET_SPEED = 8.3; // muzzle velocity of a bullet (px/tick)
export const BULLET_RADIUS = 1; // radius (px)

export const SHIP_RADIUS = 7; // radius of transport ship (px)
export const SHIP_SPEED = 50 / 60; // speed of transport ship (px/tick)
export const SHIP_SPAWN_CHANCE = 0.45; // chance of a ship spawning (probability)
export const SHIP_SPAWN_DELAY = 160; // time between spawn chances (ticks)
