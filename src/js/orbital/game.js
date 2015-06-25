var assert = require('assert');

var Bacon = require('baconjs');
var I = require('immutable');
var PIXI = require('pixi.js');

var models = require('./models');
var engine = require('./engine');


var draw = function (world, time, stage, renderer) {
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


var Game = function (window, gameContainer) {
    var keystrokes = Bacon.fromEvent(gameContainer, 'keyup').filter(function (e) {
        return _.contains([38, 32], e.keyCode);
    }).map(function (e) {
        if (e.keyCode == 32) {
            return 'REVERT';
        } else {
            return 'JUMP';
        }
    });


    var taps = Bacon.fromEvent(gameContainer, 'touchstart').map(function (e) {
        var touch = _.first(e.touches);
        var ratio = touch.clientX/width;
        return ratio > 0.5 ? 'JUMP' : 'REVERT';
    });

    var events = keystrokes.merge(taps);

    var width = gameContainer.width();
    var height = gameContainer.height();
    var stage = new PIXI.Container(0x000000, true);
    var renderer = PIXI.autoDetectRenderer(width, height, {antialias: false});
    var world = null;
    var frameStream = new engine.FrameStream(window, new engine.Timer(), events);

    gameContainer.append(renderer.view);
    stage.position.x = width/2;
    stage.position.y = height/2;

    frameStream.onValue(function (d) {
        world = models.world.tick(world, (d.get('dt'))/1000, d.get('events'));
        draw(world, d, stage, renderer);
    });

    return {
        pause: function () { frameStream.pause(); return world; },
        start: function () { assert(world, 'please call `setWorld` before starting'); frameStream.start(); },
        setWorld: function (w) { world = w; }
    }
};


module.exports = {
    Game: Game
};