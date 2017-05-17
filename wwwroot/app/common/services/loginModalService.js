angular.module('gameFareApp').service('loginModalService', ['$uibModal', '$rootScope', '$sessionStorage', 'authTokenFactory',
    function ($modal, $rootScope, $sessionStorage, authTokenFactory ){
         function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        return function() {
            var instance = $modal.open({
            templateUrl: '/app/common/templates/modalLoginTemplate.html',
            controller: 'modalLoginController',
            controllerAs: 'modalLoginController'
        })

        return instance.result.then(assignCurrentUser);
    };

        
}]);