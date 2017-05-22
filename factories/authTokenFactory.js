'use strict';

(function() {

    angular.module('app.factories').factory('authTokenFactory', ['$window', function($window) {

        var storage = $window.localStorage;
        var token = 'gameFareToken';
        var refreshToken = "gameFareRefreshToken";
        var userName = 'gameFareUserName';

        var authToken = {
            setToken: function(value) {
                storage.setItem(token, value);
            },

            setRefreshToken: function(value){
                storage.setItem(refreshToken, value);
            },

            setUserName: function(value){
                storage.setItem(userName, value);
            },

            getToken: function() {
                return storage.getItem(token);
            },

            getRefreshToken: function(){
                return storage.getItem(refreshToken);
            },

            getUserName : function(){
                return storage.getItem(userName);
            },

            isAuthenticated: function() {
                return !!authToken.getToken();
            },

            removeToken: function() {
                storage.removeItem(token);  
            },

            removeRefreshToken :function(){
                storage.removeItem(refreshToken);
            },
            removeUserName : function(){
                storage.removeItem(userName);
            }
        };

        return authToken;

    }]);

})();