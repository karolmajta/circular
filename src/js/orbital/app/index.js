var angular = require('angular');
require('angular-ui-router');

var mainMenuController = require('./main-menu-controller');


var app = angular.module('orbital', ['ui.router']);

app.controller('mainMenuController', mainMenuController);

app.config(['$stateProvider',
            function ($stateProvider) {

    $stateProvider
        .state('mainMenu', {
            url: '/',
            templateUrl: '/templates/main-menu.html',
            controller: 'mainMenuController'
        })
        .state('game', {
            url: '#gameContainer',
            template: '',
        });

}]).run(['$state',
         function ($state) {

     $state.go('mainMenu');

 }]);


module.exports = app;