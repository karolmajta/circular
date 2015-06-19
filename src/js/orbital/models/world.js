var _ = require('underscore');
var I = require('immutable');
var uuid = require('uuid');

var factory = require('./factory');
var player = require('./player');
var orbit = require('./orbit')


var makeOrbit = function () {
  return [models.orbit.Orbit, models.world.RadialCoords({r: 100*5, dr: -5, ds: randFrom(-10, 10)})]
}


var RadialCoords = I.Record({
  uuid: null,
  r: 0,
  s: 0,
  dr: 0,
  ds: 0
})


var World = I.Record({
  uuid: null,
  velocity: 0,
  player: player.Player().set('uuid', uuid.v1()),
  playerOrbit: null,
  playerPosition: 0,
  orbits: I.OrderedMap(),
});

var tick = function (world, dt) {
  var originalOrbits = world.get('orbits');
  var tickedOrbits = tickOrbits(originalOrbits, dt);
  var activeOrbits = dropOrbits(tickedOrbits, 10*5);
  var appendCount = tickedOrbits.count() - activeOrbits.count();
  if (appendCount > 0) {
    activeOrbits = activeOrbits.set(
      orbit.Orbit(),
      RadialCoords({r: activeOrbits.last().get('r')+10*5, dr: -30, ds: randFrom(-30, 30)})
    )
  }

  return world
    .set('orbits', activeOrbits);
};

var tickOrbits = function (orbitCoordinates, dt) {
  return I.OrderedMap(I.Seq(orbitCoordinates).map(function (coords) {
    return coords
      .update('r', function (r) { return r + coords.get('dr')*dt; })
      .update('s', function (s) { return s + coords.get('ds')*dt; });
  }));
};

var dropOrbits = function (orbitCoordinates, minRadius) {
  return orbitCoordinates.filter(function (p) {
    return p.get('r') >= minRadius;
  });
};

var spawnOrbits = function (orbitCoordinates, expectedCount) {
  var largestRadius = orbitCoordinates.last().get('r');
  spawnIndexes.forEach(function (i) {
      console.log(i);
      orbitCoordinates = orbitCoordinates.set(

      );
  });
  return orbitCoordinates;
}


module.exports = {
  World: factory(World),
  RadialCoords: factory(RadialCoords),
  tick: tick,
  tickOrbits: tickOrbits
};
