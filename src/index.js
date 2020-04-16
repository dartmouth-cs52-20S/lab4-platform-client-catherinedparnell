/* eslint-disable no-plusplus */
import $ from 'jquery';
import './style.scss';

let num = 0;

setInterval(() => {
  num++;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}, 1000);


$('#main').html(`You've been on this page for ${num} seconds.`);
