var angular = require('angular');
require('angular-ui-router');

var mainMenuController = require('./main-menu-controller');
var gameController = require('./game-controller');


var app = angular.module('orbital', ['ui.router']);

app.controller('mainMenuController', mainMenuController);
app.controller('gameController', gameController);

app.config(['$stateProvider',
            function ($stateProvider) {

    $stateProvider
        .state('mainMenu', {
            url: '/',
            templateUrl: '/templates/main-menu.html',
            controller: 'mainMenuController'
        })
        .state('game', {
            url: '/game/#gameContainer',
            template: '',
            controller: 'gameController'
        });

}]).run(['$state',
         function ($state) {

     $state.go('mainMenu');

 }]);


module.exports = app;