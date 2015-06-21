var _ = require('underscore');
var $ = require('jquery');
var I = require('immutable');
var PIXI = require('pixi.js');

var models = require('./orbital/models');


window.randFrom = function (start, stop) {
  return Math.random()*(stop-start) + start;
};


var orbits = I.OrderedMap([
  [models.orbit.Orbit(), models.world.RadialCoords({r: 20*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 30*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 40*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 50*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 60*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 70*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 80*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 90*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})],
  [models.orbit.Orbit(), models.world.RadialCoords({r: 100*5, dr: -30, ds: randFrom(-0.2*Math.PI, 0.2*Math.PI)})]
]);


var world = models.world.World({
  orbits: orbits,
  player: models.player.PlayerCoords({s: Math.PI*0.5, ds: 0.2}),
  playerOrbit: I.Seq(orbits.keys()).last()
});

var t0 = new Date();
var t1 = t0;
var drawLoop = function (window, stage, renderer) {
  world = models.world.tick(world, (t1-t0)/1000);

  stage.removeChildren();

  world.get('orbits').forEach(function (coords) {
    var orbit = new PIXI.Container();
    var circle = new PIXI.Graphics();
    circle.lineStyle(1, 0xff0000);
  	circle.drawCircle(0, 0, coords.get('r'));
    orbit.addChild(circle);
    var marker = new PIXI.Graphics();
    marker.lineStyle(0);
    marker.beginFill(0xff0000);
    marker.drawCircle(coords.get('r'), 0, 3);
    orbit.addChild(circle);
    orbit.addChild(marker);
    orbit.rotation = coords.get('s');
    stage.addChild(orbit);
  });

  var playerOrbitCoords = world.getIn(['orbits', world.get('playerOrbit')]);
  if (playerOrbitCoords) {
    var player = new PIXI.Graphics();
    player.beginFill(0x00ff00);
    player.drawCircle(playerOrbitCoords.get('r'), 0, 5);
    player.rotation = world.getIn(['player', 's']);
    console.log(world.getIn(['player', 's']));
    stage.addChild(player);
  }

  renderer.render(stage);

  window.requestAnimationFrame(function () {
    t0 = t1;
    t1 = new Date();
    drawLoop(window, stage, renderer);
  });
};

window.onload = function() {
  var $gameContainer = $('#gameContainer');
  var width = $gameContainer.width();
  var height = $gameContainer.height();
  var stage = new PIXI.Container(0xFFFFFF, true);
  stage.position.x = width/2;
  stage.position.y = height/2;
	var renderer = PIXI.autoDetectRenderer(width, height);

	document.getElementById('gameContainer').appendChild(renderer.view);
  drawLoop(window, stage, renderer, {antialias: true});
};
