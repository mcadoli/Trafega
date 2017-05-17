
'use strict';

(function() {

    angular
    .module('app.factories')
    .factory('authInterceptorService', ['$q', '$location', '$localStorage', function ($q, $location, storageService, $localStorage) {
        var authInterceptorServiceFactory = {};
 
        var _request = function (config) {
    
            config.headers = config.headers || {};
    
            var authData = $localStorage.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
    
            return config;
        }
    
        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    
        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;
    
        return authInterceptorServiceFactory

    }]);

})();