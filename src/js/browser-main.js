var _ = require('underscore');
var Bacon = require('baconjs');
var $ = require('jquery');
var I = require('immutable');
var PIXI = require('pixi.js');

var models = require('./orbital/models');
var engine = require('./orbital/engine');
var mu = require('./orbital/math-utils')


var orbits = I.OrderedMap([
  [models.orbit.Orbit(), models.world.RadialCoords({r: 20*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 30*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 40*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 50*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 60*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 70*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 80*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 90*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 100*5, dr: -90, ds: mu.randFrom(-0.2*Math.PI, 0.2*Math.PI)})]
]);


var world = models.world.World({
  orbits: orbits,
  player: models.player.PlayerCoords({s: Math.PI*0.5, ds: 1}),
  playerOrbit: I.Seq(orbits.keys()).last()
});


var draw = function (time, stage, renderer) {
  stage.removeChildren();
  world.get('orbits').forEach(function (coords) {
    var orbit = new PIXI.Container();
    var circle = new PIXI.Graphics();
    circle.lineStyle(1, 0xffffff);
  	circle.drawCircle(0, 0, coords.get('r'));
    orbit.addChild(circle);
    var marker = new PIXI.Graphics();
    marker.lineStyle(0);
    marker.beginFill(0xffffff);
    marker.drawCircle(coords.get('r'), 0, 3);
    orbit.addChild(circle);
    orbit.addChild(marker);
    orbit.rotation = coords.get('s');
    stage.addChild(orbit);
  });
  var playerOrbitCoords = world.getIn(['orbits', world.get('playerOrbit')]);
  if (playerOrbitCoords) {
    var player = new PIXI.Graphics();
    player.beginFill(0xffffff);
    player.drawCircle(playerOrbitCoords.get('r'), 0, 15);
    player.rotation = world.getIn(['player', 's']);
    stage.addChild(player);
  }
  renderer.render(stage);
};

var keystrokes = Bacon.fromEvent(window, 'keyup').filter(function (e) {
  return _.contains([37, 38, 39, 40], e.keyCode);
});

var taps = Bacon.fromEvent(window.document, 'touchstart');

var events = keystrokes.merge(taps);

window.onload = function() {
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
};
