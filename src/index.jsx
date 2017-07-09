
import 'babel-polyfill';

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import { createStore, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Game from './containers/game';
import * as actions from './actions';
import { loadAllImages } from './canvas';

// load the game sprites
// loadAllImages();

// const gameElement = document.getElementById('game');

// create the store
const createStoreDev = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);
const store = createStoreDev(reducers);
store.dispatch(actions.initStore());

// render
render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('game')
);

