
import 'babel-polyfill';

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import { createStore, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import reducer from './reducer';
import Game from './containers/game';
import * as actions from './actions';



const gameElement = document.getElementById('game');

const createStoreDev = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);
const store = createStoreDev(reducer);
store.dispatch(actions.initStore());

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  gameElement
);

