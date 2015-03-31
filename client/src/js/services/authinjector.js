angular.module('bhima_installer.services')
.factory('auth.injector', [
  '$rootScope',
  '$q',
  function AuthInjector($rootScope, $q) {
    return {
      responseError : function (res) {
        var errors = {
          401 : 'EVENTS.auth.notAuthenticated',
          419 : 'EVENTS.auth.sessionTimeout',
          440 : 'EVENTS.auth.sessionTimeout'
        };
        console.log('[INTERCEPTOR] Recieved res status', res.status);
        $rootScope.$broadcast(errors[res.status], res);
        return $q.reject(res);
      }
    };
  }
]);
