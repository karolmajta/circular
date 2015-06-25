var mainMenuController = ['$scope',
                          '$state',
                          '$orbitalGame',
                          '$orbitalWorld',
                          function ($scope, $state, $orbitalGame, $orbitalWorld) {

  $scope.pausedWorld = $orbitalGame.pause();

  $scope.newGame = function () {
      $orbitalGame.setWorld($orbitalWorld);
      $orbitalGame.start();
      $state.go('game');
  };

  $scope.resumeGame = function () {
      $orbitalGame.start();
      $state.go('game');
  };

}];

module.exports = mainMenuController;