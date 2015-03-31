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

    dependencies.countries = {
      query : {
        identifier : 'uuid',
        tables: {
          'country' : {
            columns : ['uuid','code', 'country_en', 'country_fr']
          }
        }
      }
    };

    dependencies.provinces = {
      query : {
        identifier : 'uuid',
        tables: {
          'sector' : {
            columns : ['uuid','name', 'province_uuid']
          }
        }
      }
    };

    function addSector (obj){
      session.state = 'registering';
      var province = {
        uuid : uuid(),
        name : obj.name,
        country_uuid : obj.country_uuid
      };

      connect.post('province', [province])
      .then(function (suc) {
        $scope.provinces.post(province);
        session.state = '';
        session.global.behavior.nextStep('install/village');
      })
      .catch(function (err) {
      });
    }

    function manageCountry (model) {
      angular.extend($scope, model);
      if(model.countries.data.length) {session.global.behavior.nextStep('install/village');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        console.log(res);
        session.global = res;
        validate.process(dependencies)
        .then(manageCountry);
      });
    });

    $scope.addSector = addSector;
  }
]);
