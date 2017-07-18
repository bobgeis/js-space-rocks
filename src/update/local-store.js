
import { Map } from 'immutable';

const hiScoreName = 'js-space-rocksHiScore';

const zeroHiScore = {
  lifepod: 0,
  crystal: 0,
  ship: 0
};

export const getHiScore = () => {
  return JSON.parse(localStorage.getItem(hiScoreName)) || zeroHiScore;
};

export const setHiScore = (state) => {
  const newHiScore = {};
  const currScore = state.get('score').toJS();
  const oldHiScore = getHiScore();
  for (const key in currScore) {
    newHiScore[key] = Math.max(currScore[key], oldHiScore[key]);
  }
  localStorage.setItem(hiScoreName, JSON.stringify(newHiScore));
  return Map(newHiScore);
};

export const clearHiScore = () => {
  localStorage.removeItem(hiScoreName);
};
