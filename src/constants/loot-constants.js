
export const TYPE_LIFEPOD = 'lifepod';
export const TYPE_CRYSTAL = 'crystal';

export const LIFEPOD_CHANCE = [1, 0.5, 0.3, 0.2]; // chance to spawn lifepods
export const LIFEPOD_LIFETIME = 1500; // lifetime of lifepods (ticks)
export const LIFEPOD_SPEED = 90 / 60; // lifepod launch speed (px/tick)
export const LIFEPOD_SPIN = 0.2; // lifepod spin speed (rad/tick)

export const CRYSTAL_CHANCE = 0.3; // chance booming rock leaves crystal
export const CRYSTAL_LIFETIME = 1200; // lifetime of crystals (ticks)
export const CRYSTAL_SPEED = 50 / 60; // crystal launch speed (px/tick)
export const CRYSTAL_SPIN = 0.2; // crystal spin speed (rad/tick)

export const RADIUS = 3.5; // radius of loot items (px)
export const TYPES_TO_LIFETIMES = {};
TYPES_TO_LIFETIMES[TYPE_LIFEPOD] = LIFEPOD_LIFETIME;
TYPES_TO_LIFETIMES[TYPE_CRYSTAL] = CRYSTAL_LIFETIME;
