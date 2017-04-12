(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'buscaVooService', 
                function ($rootScope, $scope, $location, $routeParams, buscaVooService) {
                    console.log('Entrou no controller instaFlight'); 
                    $scope.voos = [];
                    $scope.segmentoDetail = {};
                    $scope.qtdRegistrosFound = {};
                    $scope.openDetails = function(segmento) {
                        console.log('Entrou no modal: ' + segmento.Id);
                        $scope.segmentoDetail = segmento;
                        console.log($scope.segmentoDetail.HoraChegada);
                        $scope.showModal = true;
                    };
                    $rootScope.vooRq = {LocalPartida:'LAX', LocalChegada:'JFK', DataPartida: '2017/02/25', DataChegada: '2017/02/26'};
                    buscaVooService.search($rootScope.vooRq).then(function(vooResponse){  
                        angular.forEach(vooResponse, function(value, key){
                             $scope.voos.push(value);  
                        });
                        $scope.qtdRegistrosFound = $scope.voos.length;    
                    });   
                    console.log($scope.voos);
                }]);  
})();


