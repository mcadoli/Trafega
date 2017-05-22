(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('apostaController', 
            ['$rootScope', '$scope', '$uibModal',
                function ($rootScope, $scope, $modal) {
                       $scope.close = function() {
                            $uibModalInstance.dismiss('cancel');
                        };
                }]);   
                
})();


