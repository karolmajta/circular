var I = require('immutable');

var factory = require('./factory');


var Orbit = I.Record({
  uuid: null,
  obstacles: I.Set(),
  powerups: I.Set()
});

module.exports = {
  Orbit: factory(Orbit)
};
