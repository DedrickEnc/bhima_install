angular.module('bhima_installer.controllers')
.controller('installer.home', [
  '$scope',
  '$http',
  '$location',
  function ($scope, $http, $location) {
  	var session = $scope.session = {data : {}};

  	$http.get('/test/').then(handleTest);

  	function handleTest (res){
  		session.setted = JSON.parse(res.data);
  	}

  	function nextStep (){
      console.log('ok');
  		$location.path('/install/country');
  	}

  	$scope.nextStep = nextStep;
  }
]);
