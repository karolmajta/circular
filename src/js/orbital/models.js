var I = require('immutable');
var uuid = require('uuid');


var Obstacle = I.Record({
  uuid: null,
  start: 0,
  stop: 2*Math.PI,
  velocity: 0}
);

var Player = I.Record({
  uuid: null,
  velocity: 0
});

var Orbit = I.Record({
  uuid: null,
  radius: 1,
  velocity: 0,
  obstacles: I.Set(),
  powerups: I.Set()
});


var World = I.Record({
  uuid: null,
  velocity: 0,
  player: Player().set('uuid', uuid.v1()),
  playerOrbit: null,
  playerPosition: 0,
  orbits: I.List(),
  orbitPositions: I.Map()
})


var makeFactory = function (F) {
    return function (data) {
      return F(data).set('uuid', uuid.v1());
    }
};


module.exports = {
  Obstacle: makeFactory(Obstacle),
  Player: makeFactory(Player),
  Orbit: makeFactory(Orbit),
  World: makeFactory(World),
}
