angular.module('bhima_installer.controllers')
.controller('bhima_installer.install', [
  '$scope',
  '$routeParams',
  '$q',
  'validate',
  'appstate',
  'connect',
  '$location',
  function ($scope, $routeParams, $q, validate, appstate, connect, $location) {
    var templates,
      dependencies = {},
      origin = $scope.origin = $routeParams.originId,
      commonData = $q.defer(),
      session = $scope.session = {data : {}, behavior : {}};

    if (!(origin)) { throw new Error('Invalid parameters'); }

    appstate.set('install.commonData', commonData.promise);

    templates = {
      'country' : {
        url : '/partials/install/templates/install_country.html',
        title : 'Pays'
      },
      'province' : {
        url : '/partials/install/templates/install_province.html',
        title : 'Province'
      }
    };


    function expose (data) {
      $scope.template = templates[origin];
      $scope.timestamp = new Date();
      session.data.origin = origin;
      session.behavior.nextStep = nextStep;
      commonData.resolve(session);
    }

    function nextStep (path){
      var p = path || 'install/country';
      $location.path(p);
    }

    expose();
  }
]);
