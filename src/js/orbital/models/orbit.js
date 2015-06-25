var I = require('immutable');


var Orbit = I.Record({
  obstacles: I.Set(),
  powerups: I.Map(),
  r: 0,
  s: 0,
  dr: 0,
  ds: 0
});


var TimerPowerup = I.Record({
  type: 'TimerTimer'
});


var defaultPowerups = function (start, stop, n) {
  var d = (stop - start) / 2;
  return I.List(I.Range())
};


module.exports = {
  Orbit: Orbit
};
