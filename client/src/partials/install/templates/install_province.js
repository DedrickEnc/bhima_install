angular.module('bhima_installer.controllers')
.controller('bhima_installer.province', [
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
          'province' : {
            columns : ['uuid','name', 'country_uuid']
          }
        }
      }
    };

    function addProvince (obj){
      session.state = 'registering';
      var province = {
        uuid : uuid(),
        name : obj.name,
        country_uuid : obj.country_uuid
      };

      connect.post('province', [province])
      .then(function (suc) {
        session.state = '';
        session.global.behavior.nextStep('install/sector');
      })
      .catch(function (err) {
      });
    }

    function manageProvince (model) {
      angular.extend($scope, model);
      if(model.provinces.data.length) {session.global.behavior.nextStep('install/sector');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        console.log(res);
        session.global = res;
        validate.process(dependencies)
        .then(manageProvince);
      });
    });

    $scope.addProvince = addProvince;
  }
]);
