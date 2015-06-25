var I = require('immutable');


var Obstacle = I.Record({
  start: 0,
  stop: 2*Math.PI,
});


module.exports = {
  Obstacle: Obstacle
};
