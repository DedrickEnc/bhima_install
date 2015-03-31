angular.module('bhima_installer.controllers')
.controller('app', [
  '$scope',
  '$location',
  '$translate',
  '$timeout',
  'appstate',
  'connect',
  'validate',
  'util',
  'appcache',
  function ($scope, $location, $translate, $timeout, appstate, connect, validate, util, Appcache) {
    var dependencies = {},
        preferences = new Appcache('preferences'),
        cache = new Appcache('application');

    function setEnvironmentVariable(key, data) {
      connect.fetch(data)
      .then(function (values) {
        $timeout(function () {
          appstate.set(key, values);
        });
      });
    }

    function loadCachedLanguage() {
      preferences.fetch('language')
      .then(function (res) {
        if (res) { $translate.use(res.current); }
      })
      .catch(handleError);
    }

    function loadCachedLocation() {
      preferences.fetch('location')
      .then(function (res) {
        if (res) { $location.path(res.path); }
      })
      .catch(handleError);
    }

    function beforeLogin() {
      var languages;

      languages = {
        tables : {
          'language' : { columns : ['id', 'name', 'key'] }
        }
      };
      setEnvironmentVariable('languages', languages);
      var url = $location.url();
      if (url === '' || url === '/') { loadCachedLocation(); }
      loadCachedLanguage();
    }

    beforeLogin();

    function handleError(error) {
      throw error;
    }
  }
]);
