(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('modalLoginController', 
            ['$scope', 'authService', '$sessionStorage', 'Restangular', 'authTokenFactory', 'EnvironmentConfig', 'md5',
                function ($scope, authService, $sessionStorage, Restangular, authTokenFactory,EnvironmentConfig, $md5) {
                    $scope.loginErroMessage = '';
                    $scope.cancel = $scope.$dismiss;
                    var data = "username=m.cadoli@gmail.com" +  //loginData.userName +
                           "&password=" + $md5.createHash('senha') +
                           "&grant_type=password" ;
                    
                    Restangular.allUrl("token", EnvironmentConfig.api + "/token")
                                  .customPOST(data, "", {}, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (response) {
                                   var token = response.access_token;
                                    //authTokenFactory.setUserName(loginData.userName);

                                }).catch(function (err, status) {
                                
                                    
                                });

                    $scope.submit = function (loginData) {
                        
                        var data = "username=m.cadoli@gmail.com" +  //loginData.userName +
                           "&password=" + $md5.createHash('senha') +
                           "&grant_type=password" ;

                    Restangular.allUrl("token", EnvironmentConfig.api + "/token")
                                  .customPOST(data, "", {}, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (response) {
                                    var token = response.access_token;
                                    //authTokenFactory.setUserName(loginData.userName);

                                }).catch(function (err, status) {
                                
                                    
                                });
                        
                        /*authService.login(loginData).then(function (data) {
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
                        });*/
                        
                    };                      
                }]);   
                
})();


