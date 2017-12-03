import {Spinner} from 'spin.js';

var opts = {
  lines: 12, // The number of lines to draw
  length: 35, // The length of each line
  width: 17, // The line thickness
  radius: 36, // The radius of the inner circle
  scale: 0.9, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#1976d2', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  opacity: 0.45, // Opacity of the lines
  rotate: 13, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 0.9, // Rounds per second
  trail: 48, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '51%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: null, // Box-shadow for the lines
  position: 'absolute' // Element positioning
};
var target = document.getElementById('preload');
var spinner = new Spinner(opts).spin(target);
