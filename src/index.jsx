
import 'babel-polyfill';

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { reducer } from './reducer';
import { Game } from './game';

const gameElement = document.getElementById('game')
const store = createStore(reducer);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  gameElement
);

