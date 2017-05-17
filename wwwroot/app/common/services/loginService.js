angular.module('gameFareApp').service('loginService', ['$scope', '$location', 'authService', 'messagesFactory', 
    function ($scope, $location, authService, messagesFactory){
       
        this.login = function (loginData, path) {

            authService.login(loginData).then(function (response) {
                $location.path('/' + path);
            },
            function (err) {
                messagesFactory.addMessage('Falha durante a autenticação', 'alert alert-info', 0, false);
            });
        }
}]);