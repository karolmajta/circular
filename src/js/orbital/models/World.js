var I = require('immutable');
var uuid = require('uuid');

var factory = require('./factory');
var Player = require('./Player');


var dWorld = I.Record({
  uuid: null,
  velocity: 0,
  player: Player().set('uuid', uuid.v1()),
  playerOrbit: null,
  playerPosition: 0,
  orbits: I.List(),
  orbitPositions: I.Map()
});

var iWorld = {
  tick: function (dt) {
    return new World(this.update('velocity', function (x) { return x + 1; }));
  }
}

var World = factory(dWorld, iWorld);


module.exports = factory(World, iWorld);
