var I = require('immutable');

var factory = require('./factory');


var PlayerCoords = I.Record({
  uuid: null,
  s: 0,
  ds: 0
});

module.exports = {
  PlayerCoords: factory(PlayerCoords)
};
