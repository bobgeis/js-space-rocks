
// explosions and flash stuff
export const TYPE_ROCK_EX = "ROCKBOOM";
export const TYPE_ROCK_IN = "ROCKFLASH";
export const TYPE_SHIP_EX = "SHIPBOOM";
export const TYPE_SHIP_IN = "SHIPFLASH";

export const LIFETIMES = {};   // duration (ticks)
LIFETIMES[TYPE_ROCK_EX] = 13;
LIFETIMES[TYPE_ROCK_IN] = 10;
LIFETIMES[TYPE_SHIP_EX] = 13;
LIFETIMES[TYPE_SHIP_IN] = 10;

export const INIT_RADII = {};  // initial size (px)
INIT_RADII[TYPE_ROCK_EX] = 22;
INIT_RADII[TYPE_ROCK_IN] = 40;
INIT_RADII[TYPE_SHIP_EX] = 22;
INIT_RADII[TYPE_SHIP_IN] = 30;

export const END_RADII= {};   // end size (px)
END_RADII[TYPE_ROCK_EX] = 60;
END_RADII[TYPE_ROCK_IN] = 7;
END_RADII[TYPE_SHIP_EX] = 40;
END_RADII[TYPE_SHIP_IN] = 5;
