var uuid = require('uuid');
var $ = require('jquery');
var angular = require('angular');

var world = require('./orbital/models/world');
var app = require('./orbital/app');
var game = require('./orbital/game');

$(window.document).ready(function() {
    var $gameContainer =$('#gameContainer');
    app.constant('$orbitalGame', game.Game(window, $gameContainer));
    app.constant('$orbitalWorld', world.makeDefaultWorld());
    angular.bootstrap(window.document.body, ['orbital']);
});
