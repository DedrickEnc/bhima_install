// TODO Debtor table currently has no personal information - this strictly ties debtors to patients
// (or some existing table) - a reverse lookup from debtor / creditor ID to recipient is needed.
angular.module('bhima_installer.controllers')
.controller('bhima_installer.country', [
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

    function addCountry (obj){
      session.state = 'registering';
      var country = {
        uuid : uuid(),
        code : obj.code,
        country_en : obj.country_en,
        country_fr : obj.country_fr
      };

      connect.post('country', [country])
      .then(function (suc) {
        $scope.countries.post(country);
        session.state = '';
        session.global.behavior.nextStep('install/province');
      })
      .catch(function (err) {
      });
    }

    function manageCountry (model) {
      angular.extend($scope, model);
      if(model.countries.data.length) {session.global.behavior.nextStep('install/province');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        console.log(res);
        session.global = res;
        validate.process(dependencies)
        .then(manageCountry);
      });
    });

    $scope.addCountry = addCountry;
  }
]);
