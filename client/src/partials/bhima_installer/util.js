angular.module('bhima_installer.controllers')
.controller('util', [
  '$scope',
  '$rootScope',
  '$location',
  function($scope, $rootScope, $location) {
    $scope.openSettings = function () {
      var last = $location.path();
      $location.path('/settings/').search('url', last);
    };
  }
]);
