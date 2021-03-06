angular.module('bhima_installer.controllers')
.controller('bhima_installer.sector', [
  '$scope',
  '$routeParams',
  '$q',
  'validate',
  'appstate',
  'connect',
  'uuid',
  function ($scope, $routeParams, $q, validate, appstate, connect, uuid) {
    var session = $scope.session = {};

    var dependencies = {};

    dependencies.sectors = {
      query : {
        identifier : 'uuid',
        tables: {
          'sector' : {
            columns : ['uuid','name', 'province_uuid']
          }
        }
      }
    };

    dependencies.provinces = {
      query : {
        identifier : 'uuid',
        tables: {
          'province' : {
            columns : ['uuid','name']
          }
        }
      }
    };

    function addSector (obj){
      session.state = 'registering';
      var sector = {
        uuid : uuid(),
        name : obj.name,
        province_uuid : obj.province_uuid
      };

      connect.post('sector', [sector])
      .then(function (suc) {
        session.state = '';
        session.global.behavior.nextStep('install/village');
      })
      .catch(function (err) {
      });
    }

    function manageSector (model) {
      angular.extend($scope, model);
      if(model.sectors.data.length) {session.global.behavior.nextStep('install/village');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        session.global = res;
        validate.process(dependencies)
        .then(manageSector);
      });
    });

    $scope.addSector = addSector;
  }
]);
