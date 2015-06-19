var I = require('immutable');

var factory = require('./factory');


var Orbit = I.Record({
  uuid: null,
  radius: 1,
  velocity: 0,
  obstacles: I.Set(),
  powerups: I.Set()
});


var iOrbit = {};


module.exports = factory(Orbit, iOrbit);
