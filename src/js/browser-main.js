var _ = require('underscore');
var $ = require('jquery');
var I = require('immutable');
var models = require('./orbital/models');
var PIXI = require('pixi.js');

window.randFrom = function (start, stop) {
  return Math.random()*(stop-start) + start;
};


var world = models.world.World({
  orbits: I.OrderedMap([
    [models.orbit.Orbit(), models.world.RadialCoords({r: 20*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 30*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 40*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 50*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 60*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 70*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 80*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 90*5, dr: -30, ds: randFrom(-30, 30)})],
    [models.orbit.Orbit(), models.world.RadialCoords({r: 100*5, dr: -30, ds: randFrom(-30, 30)})]
  ])
});

var t0 = new Date();
var t1 = t0;
var drawLoop = function (window, stage, renderer) {
  world = models.world.tick(world, (t1-t0)/1000);

  stage.removeChildren();

  world.get('orbits').forEach(function (coords) {
    var graphics = new PIXI.Graphics();
    // draw a circle
  	graphics.lineStyle(1, 0xff0000);
  	graphics.drawCircle(renderer.width/2, renderer.height/2, coords.get('r'));

    stage.addChild(graphics);
  });

  renderer.render(stage);

  window.requestAnimationFrame(function () {
    t0 = t1;
    t1 = new Date();
    drawLoop(window, stage, renderer);
  });
};

window.onload = function() {
  var stage = new PIXI.Stage(0xFFFFFF, true);
  var $gameContainer = $('#gameContainer');
  var width = $gameContainer.width();
  var height = $gameContainer.height();
	var renderer = PIXI.autoDetectRenderer(width, height);

	document.getElementById('gameContainer').appendChild(renderer.view);
  drawLoop(window, stage, renderer, {antialias: true});
};
