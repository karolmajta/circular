var _ = require('underscore');
var I = require('immutable');
var uuid = require('uuid');

var mu = require('./../math-utils');
var player = require('./player');
var orbit = require('./orbit');


var World = I.Record({
  velocity: 0,
  player: player.Player(),
  playerOrbit: null,
  orbits: I.OrderedMap(),
});

var tick = function (world, dt, events) {
  // we should have some more serious event dispatching logic
  // and they probably should be some sort of "domain events"
  events.forEach(function (e) {
      if (e == 'REVERT') {
        world = world.updateIn(['player', 'ds'], function (ds) { return -ds });
      }
      if (e == 'JUMP') {
        var nextOrbit = I.Seq(world.get('orbits').keys()).skipWhile(function (o) {
          return o != world.get('playerOrbit');
        }).skip(1).first();
        if (nextOrbit) {
          world = world.set('playerOrbit', nextOrbit);
        }
      }
  });


  var originalOrbits = world.get('orbits');
  var tickedOrbits = tickOrbits(originalOrbits, dt);
  var activeOrbits = dropOrbits(tickedOrbits, 10*5);
  var appendCount = tickedOrbits.count() - activeOrbits.count();
  if (appendCount > 0) {
    var newOrbit = orbit.Orbit({
      r: activeOrbits.last().get('r')+10*5,
      dr: -90,
      ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)
    });
    activeOrbits = activeOrbits.set(
      uuid.v1(),
      newOrbit
    );
  }

  return world
    .set('orbits', activeOrbits)
    .update('player', function (player) {
      var ds = player.get('ds');
      return player.update('s', function (s) {
        return s + ds*dt;
      });
    });
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
  World: World,
  tick: tick,
  _tickOrbits: tickOrbits,
  _dropOrbits: dropOrbits,
  _spawnOrbits: spawnOrbits
};
