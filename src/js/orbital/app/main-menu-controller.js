var mainMenuController = ['$scope',
                          '$state',
                          function ($scope, $state) {

  $scope.newGame = function () {
      $state.go('game');
  }

}];

module.exports = mainMenuController;