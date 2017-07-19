
import 'babel-polyfill';

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import { createStore, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import reducers from './reducers/reducer';
import Game from './containers/game-container';
import * as actions from './actions';
import { loadAllImages, loadingFinished } from './canvas/images';
import { initHiScore } from './local-storage';

// load the game sprites
loadAllImages();

// init the high score from local storage
initHiScore();

// create the store
const createStoreDev = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);
const store = createStoreDev(reducers);
store.dispatch(actions.initStore());

// render
render(
  <Provider store={store}>
    <Game loadingFinished={loadingFinished}/>
  </Provider>,
  document.getElementById('game')
);

