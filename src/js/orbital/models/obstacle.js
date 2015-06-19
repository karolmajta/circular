var I = require('immutable');

var factory = require('./factory');


var Obstacle = I.Record({
  uuid: null,
  start: 0,
  stop: 2*Math.PI,
});


module.exports = {
  Obstacle: factory(Obstacle)
};
