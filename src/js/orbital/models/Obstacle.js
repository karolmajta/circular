var I = require('immutable');

var factory = require('./factory');


var Obstacle = I.Record({
  uuid: null,
  start: 0,
  stop: 2*Math.PI,
  velocity: 0
});

var iObstacle = {};


module.exports = factory(Obstacle, iObstacle);
