var I = require('immutable');
var Bacon = require('baconjs');


var Timer = function () {
  return Bacon.fromBinder(function (sink) {
    var t = new Date();
    var dt = 0;
    sink(I.Map({t: t.getTime(), dt: dt}));
    var intervalId = setInterval(function () {
      var t0 = t;
      var t1 = new Date();
      dt = t1 - t0;
      t = t1;
      sink(I.Map({t: t.getTime(), dt: dt}));
    }, 30);
    return function () {
      clearInterval(intervalId);
    }
  }).toProperty();
};

var FrameStream = function (window, timer, events) {
  var t;
  var dt = 0;
  var paused = true;
  var eventBuffer = I.List();
  timer.onValue(function (v) {
    t = v.get('t');
    dt += v.get('dt');
  });
  events.onValue(function (e) {
    eventBuffer = eventBuffer.push(e);
  });
  var loop = function (sink) {
    eventBuffer = I.List();
    window.requestAnimationFrame(function () {
      if (!paused) {
        sink(I.Map({t: t, dt: dt, events: eventBuffer}));
      }
      loop(sink);
      dt = 0;
    });
  };

  var stream = Bacon.fromBinder(function (sink) {
    loop(sink);
  });

  stream.pause = function () { paused = true; };
  stream.start = function () { paused = false; };

  return stream;
};


module.exports = {
    Timer: Timer,
    FrameStream: FrameStream
};
