var I = require('immutable');

var factory = require('./factory');


var Player = I.Record({
  uuid: null,
  velocity: 0
});

var iPlayer = {};


module.exports = factory(Player, iPlayer);
