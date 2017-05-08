(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('reservaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', '$http', 'commonService', '$filter', '$window',
                function ($rootScope, $scope, $location, $routeParams, $http, commonService, $filter, $window) {
                   $scope.init = function(){    
                        $rootScope.vooReserva = JSON.parse(window.sessionStorage.getItem('voo'));
                        //window.sessionStorage.removeItem('voo');
                    }
                    $scope.init();
                }]);  
                      
})();
