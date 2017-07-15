
import { DAMP } from '../constants';

/**
* Get the x projection of unit vector with angle a
*
* @param {any} a, angle in radians
* @returns float 0-1
*/
export const getVecX = (a) => {
  return Math.cos(a);
};

/**
 * Get the y projection of a unit vector with angle a
 *
 * @param {any} a, angle in radians
 * @returns float 0-1
*/
export const getVecY = (a) => {
  return Math.sin(a);
};

/**
 * Wrap coordinate to keep it between 0 - max
 *
 * @param {any} coordinate, current position along one axis
 * @param {any} max, maximum permitted position along axis
 * @returns number, new position along axis
*/
export const wrap = (coordinate, max) => {
  if (coordinate >= max) {
    return coordinate - max;
  } else if (coordinate <= 0) {
    return coordinate + max;
  } else {
    return coordinate;
  }
};

/**
 * Get the distance squared between two entities (as Maps)
 *
 * @param {Map} p1, needs 'x' and 'y' keys
 * @param {Map} p2, needs 'x' and 'y' keys
 * @returns number
 */
export const distSq = (p1, p2) => {
  return (p2.get('x') - p1.get('x'))**2 + (p2.get('y') - p1.get('y'))**2;
};

/**
 * Get the distance between two entities (as Maps)
 *
 * @param {Map} p1, needs 'x' and 'y' keys
 * @param {Map} p2, needs 'x' and 'y' keys
 * @returns number
 */
export const dist = (p1, p2) => {
  return Math.sqrt(distSq(p1,p2));
};

/**
 * Determine if two entities (as Maps) are colliding
 * Simple circle collision check.
 *
 * @param {Map} p1, needs 'r', 'x' and 'y' keys
 * @param {Map} p2, needs 'r', 'x' and 'y' keys
 * @returns number
 */
export const areColliding = (p1, p2) => {
  const r = p1.get('r') + p2.get('r');
  return r * r > distSq(p1, p2);
};


/**
 * Use a map entity's linear velocity to update its position
 *
 * @param {any} entity, map with 'x', 'y', 'vx', and 'vy' keys
 * @returns updated map entity (faster if asMutable)
 */
export const updatePos = (entity) => {
  return entity
    .update('x', (x) => x + entity.get('vx'))
    .update('y', (y) => y + entity.get('vy'));
};

/**
 * Use a map entity's acceleration and angle to update its velocity
 *
 * @param {any} entity, map with 'vx', 'vy','a', and 'acc' keys
 * @returns updated map entity (faster if asMutable)
 */
export const updateVel = (entity) => {
  return entity
    .update('vx', (vx) => vx + entity.get('acc') * getVecX(entity.get('a')))
    .update('vy', (vy) => vy + entity.get('acc') * getVecY(entity.get('a')));
};

/**
 * Use an entity's angular velocity to update its angle
 *
 * @param {any} entity, map with 'va' and 'a' keys
 * @returns updated map entity
 */
export const updateAngle = (entity) => {
  return entity.update('a', (a) => a + entity.get('va'));
};

/**
 * Damp a map entity's linear velocity
 *
 * @param {any} entity, map with 'vx' and 'vy' keys
 * @returns updated map entity
 */
export const dampVel = (entity) => {
  return entity
    .update('vx', (vx) => vx * DAMP)
    .update('vy', (vy) => vy * DAMP);
};
