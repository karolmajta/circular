var _ = require('underscore');
var Bacon = require('baconjs');
var uuid = require('uuid');
var $ = require('jquery');
var I = require('immutable');
var PIXI = require('pixi.js');
var angular = require('angular');
require('jquery-scrollto');

var models = require('./orbital/models');
var engine = require('./orbital/engine');
var mu = require('./orbital/math-utils');
var app = require('./orbital/app');


var orbits = I.OrderedMap([
  [uuid.v1(), models.orbit.Orbit({r: 20*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 30*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 40*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 50*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 60*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 70*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 80*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 90*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [uuid.v1(), models.orbit.Orbit({r: 100*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})]
]);


var world = models.world.World({
  orbits: orbits,
  player: models.player.Player({s: Math.PI*0.5, ds: 2}),
  playerOrbit: I.Seq(orbits.keys()).last()
});


var draw = function (time, stage, renderer) {
  var circles = new PIXI.Graphics();
  var player = new PIXI.Graphics();

  stage.removeChildren();

  world.get('orbits').forEach(function (coords) {
    circles.lineStyle(1, 0xffffff);
    circles.drawCircle(0, 0, coords.get('r'));
  });

  var playerOrbitCoords = world.getIn(['orbits', world.get('playerOrbit')]);
  if (playerOrbitCoords) {
    player.beginFill(0xffffff);
    player.drawCircle(playerOrbitCoords.get('r'), 0, 15);
    player.rotation = world.getIn(['player', 's']);
    stage.addChild(player);
  }

  stage.addChild(circles);

  renderer.render(stage);
};

var keystrokes = Bacon.fromEvent(window, 'keyup').filter(function (e) {
  return _.contains([38, 32], e.keyCode);
}).map(function (e) {
    if (e.keyCode == 32) {
        return 'REVERT';
    } else {
        return 'JUMP';
    }
});


var windowWidth = $(window.document).width();
var taps = Bacon.fromEvent(window.document, 'touchstart').map(function (e) {
    var touch = _.first(e.touches);
    var ratio = touch.clientX/windowWidth;
    return ratio > 0.5 ? 'JUMP' : 'REVERT';
});

var events = keystrokes.merge(taps);

$(window.document).ready(function() {
    app.constant('GAME_CONTAINER', $('#gameContainer'));
    angular.bootstrap(window.document.body, ['orbital']);

    var $gameContainer = $('#gameContainer');
    var width = $gameContainer.width();
    var height = $gameContainer.height();
    var stage = new PIXI.Container(0x000000, true);
    stage.position.x = width/2;
    stage.position.y = height/2;
    var renderer = PIXI.autoDetectRenderer(width, height, {antialias: false});

    document.getElementById('gameContainer').appendChild(renderer.view);
    var frameStream = new engine.FrameStream(window, new engine.Timer(), events);
    frameStream.onValue(function (d) {
        world = models.world.tick(world, (d.get('dt'))/1000, d.get('events'));
        draw(d, stage, renderer);
    });
});
