(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('globalMessagesController', 
        ['$scope','messagesFactory',
        function ($scope, messages) {
            $scope.messages = messages.messages;  
        }]);
})();