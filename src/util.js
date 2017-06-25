
import { Record } from 'immutable';

// export const point = (x, y) => {
//   return Record({x: x, y: y});
// }
export const point = (x,y) => {
    return newPoint({x:x,y:y});
}

export const newPoint = Record({x: 0, y: 0});

/**
 *
 *
 * @export
 * @class Point
 */
export class Point {
  /**
   * Creates an instance of Point.
   * @param {number} x
   * @param {number} y
   * @memberof Point
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Get the distance squared between two points
 *
 * @param {Point} p1
 * @param {Point} p2
 * @returns number
 */
export const distSq = (p1, p2) => {
  return (p2.x - p1.x)**2 + (p2.y - p1.y)**2;
};

/**
 * Get the distance between two points
 *
 * @param {Point} p1
 * @param {Point} p2
 * @returns number
 */
export const dist = (p1, p2) => {
  return Math.sqrt(distSq(p1,p2));
};
