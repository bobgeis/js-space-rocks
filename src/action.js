
// actiont types
export const type = {
  TICK: 'TICK',
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP'
};

// actions
export const tick = () => {
  return {
    type: 'TICK'
  };
};

export const keyDown = (key) => {
  return {
    type: 'KEY_DOWN',
    key: key
  };
};

export const keyUp = (key) => {
  return {
    type: 'KEY_UP',
    key: key
  };
};
