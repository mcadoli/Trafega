
'use strict';

(function() {

    angular
    .module('app.factories')
    .factory('authService', ['$http', '$q', 'md5', 'EnvironmentConfig', '$sessionStorage', 'authTokenFactory', 'Restangular',
    function ($http, $q, $md5, EnvironmentConfig, $sessionStorage, authTokenFactory, Restangular) {
        var serviceBase = EnvironmentConfig.api;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ""
        };

        var _saveRegistration = function (registration) {

            _logOut();
            registration.Senha = $md5.createHash(registration.Senha);

            return $http.post(serviceBase + 'v1/usuario/inserir', registration).then(function (response) {
                return response;
            });

        };

      

        var _login = function (loginData) {

            //var data = "grant_type=password&username=" + loginData.userName + "&password=" + $md5.createHash(loginData.password);
            var data = "username=" +  loginData.userName +
                           "&password=" + $md5.createHash(loginData.password)+
                           "&grant_type=password" ;

            var deferred = $q.defer();

            $http.post(serviceBase + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                authTokenFactory.setToken(response.access_token);
                authTokenFactory.setUserName(loginData.userName);
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).catch(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            /*Restangular.allUrl("token", EnvironmentConfig.api + "/token")
                                  .customPOST(data, "", {}, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (response) {
                authTokenFactory.setToken(response.access_token);
                authTokenFactory.setUserName(loginData.userName);
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).catch(function (err, status) {
                _logOut();
                deferred.reject(err);
            });;*/

            return deferred.promise;

        };

    var _logOut = function () {

        authTokenFactory.removeToken();
        authTokenFactory.removeUserName();
        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = $sessionStorage.authorizationData;
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
        
    }]);

})();