(function (angular) {
  'use strict';
  var bhima_installer = angular.module('bhima_installer', ['bhima_installer.controllers', 'bhima_installer.services', 'ngRoute', 'ui.bootstrap', 'pascalprecht.translate', 'LocalForageModule']);

  function bhimaconfig($routeProvider) {
    $routeProvider
    .when('/', {
      controller : 'installer.home',
      templateUrl : 'partials/home/home.html'
    })
    .when('/install/:originId', {
      controller: 'bhima_installer.install',
      templateUrl: 'partials/install/install.html'
    })
    .otherwise('/');
  }

  function translateConfig($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: '/i18n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('fr');
  }

  function authConfig($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('auth.injector');
      }
    ]);
  }

  function startupConfig($rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      event.preventDefault();
    });
  }

  function localForageConfig($localForageProvider) {
    $localForageProvider.config({
      name : 'bhima_installer-v1',
      version : 1.0
    });
  }

  bhima_installer.config(['$routeProvider', bhimaconfig]);
  bhima_installer.config(['$httpProvider', authConfig]);
  bhima_installer.config(['$translateProvider', translateConfig]);
  bhima_installer.config(['$localForageProvider', localForageConfig]);
  bhima_installer.run(['$rootScope', startupConfig]);

})(angular);
