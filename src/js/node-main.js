var I = require('immutable');
var models = require('./orbital/models');

var world = models.world.World({
  orbits: I.OrderedMap([
    [models.orbit.Orbit(), models.world.RadialCoords({r: 1, dr: 1, ds: 1})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 2, dr: 2, ds: 1})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 3, dr: 1, ds: 1})],
  ])
});

console.log(models.world.tick(world, 10).get('orbits').toJSON());
