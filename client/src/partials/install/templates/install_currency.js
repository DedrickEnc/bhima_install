angular.module('bhima_installer.controllers')
.controller('bhima_installer.currency', [
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

    dependencies.currencies = {
      query : {
        identifier : 'id',
        tables: {
          'currency' : {
            columns : ['id','name']
          }
        }
      }
    };

    function addCurrency (obj){
      console.log('currency', connect.clean(obj));
      session.add.symbol = (session.add.symbol == '$')? '$$' : session.add.symbol; //$ is a reserve word for regular expression
      session.state = 'registering';
      connect.post('currency', [connect.clean(obj)])
      .then(function (res) {
        session.statut = '';
        session.global.behavior.nextStep('install/enterprise');
      });
    }

    function manageCurrency (model) {
      angular.extend($scope, model);
      if(model.currencies.data.length) {session.global.behavior.nextStep('install/enterprise');}
    }

    appstate.register('install.commonData', function (global){
      global.then(function (res){
        session.global = res;
        validate.process(dependencies)
        .then(manageCurrency);
      });
    });

    $scope.addCurrency = addCurrency;
  }
]);
