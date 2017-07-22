
// constants for the player ship
export const RADIUS = 10; // player radius (px)
export const TURN = 0.07; // turn rate in (rad/tick)
export const THRUST = 0.055; // acceleration (px/tick/tick)
export const RETRO = THRUST/3; // acceleration while reversing (px/tick/tick)
export const DAMP = 1 - 0.005; // drag (fraction/tick)
export const WPN_COOLDOWN = 6; // delay between firing weapon (ticks)
