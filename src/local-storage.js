
const hiScoreName = 'js-space-rocksHiScore';

const hiScore = {
  lifepod: 0,
  crystal: 0,
  ship: 0
};

export const initHiScore = () => {
  const oldHiScore = JSON.parse(localStorage.getItem(hiScoreName)) || hiScore;
  for (const key in hiScore) {
    hiScore[key] = oldHiScore[key] || hiScore[key];
  }
  return hiScore;
};

export const getHiScore = () => {
  return hiScore;
};

export const setHiScore = (scoreMap) => {
  const score = scoreMap.toJS();
  for (const key in score) {
    hiScore[key] = Math.max(score[key], hiScore[key]);
  }
  localStorage.setItem(hiScoreName, JSON.stringify(hiScore));
};
