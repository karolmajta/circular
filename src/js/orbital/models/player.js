var I = require('immutable');

var factory = require('./factory');


var Player = I.Record({
  uuid: null,
});

module.exports = {
  Player: factory(Player)
};
