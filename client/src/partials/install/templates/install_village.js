angular.module('bhima_installer.controllers')
.controller('bhima_installer.village', [
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
            columns : ['uuid','name']
          }
        }
      }
    };

    dependencies.villages = {
      query : {
        identifier : 'uuid',
        tables: {
          'village' : {
            columns : ['uuid','name', 'sector_uuid']
          }
        }
      }
    };

    function addVillage (obj){
      session.state = 'registering';
      var village = {
        uuid : uuid(),
        name : obj.name,
        sector_uuid : obj.sector_uuid
      };

      connect.post('village', [village])
      .then(function (suc) {
        session.state = '';
        session.global.behavior.nextStep('install/currency');
      })
      .catch(function (err) {
      });
    }

    function manageVillage (model) {
      angular.extend($scope, model);
      if(model.villages.data.length) {session.global.behavior.nextStep('install/currency');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        session.global = res;
        validate.process(dependencies)
        .then(manageVillage);
      });
    });

    $scope.addVillage = addVillage;
  }
]);
