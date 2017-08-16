
// constants for the player ship
export const RADIUS = 10; // player radius (px)
export const TURN = 0.07; // turn rate in (rad/tick)
export const THRUST = 0.055; // acceleration (px/tick/tick)
export const RETRO = THRUST/3; // acceleration while reversing (px/tick/tick)
export const DAMP = 1 - 0.005; // drag (fraction/tick)
export const WPN_COOLDOWN = 6; // delay between firing weapon (ticks)
export const GLOW_MAX = 25; // number of ticks to go from brightest to dimmest
export const GLOW_THRUST = 0.5; // fraction of max to set at thrust
export const GLOW_BANG = 1; // fraction of max glow to set at shooting
