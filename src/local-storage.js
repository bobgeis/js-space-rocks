
const hiScoreName = 'js-space-rocksHiScore';

const hiScore = {
  lifepod: 0,
  crystal: 0,
  ship: 0
};

// should be called once on entry, or after clearing
export const initHiScore = () => {
  const oldHiScore = JSON.parse(localStorage.getItem(hiScoreName)) || hiScore;
  for (const key in hiScore) {
    hiScore[key] = oldHiScore[key] || 0;
  }
  return hiScore;
};

// should be called by display code
export const getHiScore = () => {
  return hiScore;
};

// should be called once on gameover
export const setHiScore = (scoreMap) => {
  const score = scoreMap.toJS();
  for (const key in score) {
    hiScore[key] = Math.max(score[key], hiScore[key]);
  }
  localStorage.setItem(hiScoreName, JSON.stringify(hiScore));
};

// to clear the hi score object
export const clearHiScore = () => {
  localStorage.removeItem(hiScoreName);
  initHiScore();
};
