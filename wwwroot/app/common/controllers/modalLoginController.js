(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('modalLoginController', 
            ['$scope', 'authService', '$sessionStorage', 'Restangular', 'authTokenFactory',
                function ($scope, authService, $sessionStorage, Restangular, authTokenFactory) {
                    $scope.loginErroMessage = '';
                    $scope.cancel = $scope.$dismiss;

                    $scope.submit = function (loginData, event) {
                        event.preventDefault();
                        authService.login(loginData).then(function (data) {
                            if(data.error)
                            {
                                $scope.loginErroMessage = user.error.error_description;
                            }
                            else
                            {
                                $scope.$close(data);
                            }
                            
                            
                        }).catch(function(error){
                            $scope.loginErroMessage = error.error_description;
                        });
                        
                    };                      
                }]);   
                
})();


