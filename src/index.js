
import _ from 'lodash';
import $ from 'jquery';
import react from 'react';
import { render } from 'react-dom';

const x = 5;

console.log(x);
console.log(react);
console.log(_.reduce);
console.log($);
console.log(render);

// render(<p>"hello!"</p>, $('#game'));
$('#game').append('<p>Hello world!</p>');
