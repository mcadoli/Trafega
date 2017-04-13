(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', "messagesFactory", "$window",
                function ($rootScope, $scope, $location, $routeParams, vooService, messagesFactory, $window ) {
                    console.log('Entrou no controller instaFlight'); 
                    $scope.voos = [];
                    $scope.segmentoDetail = {};
                    $scope.qtdRegistrosFound = {};
                    $scope.valorAposta = 0;
                    $scope.valorMinAposta = 0;
                    $scope.valorMaxAposta = 1000;

                    $scope.valorTempoResposta = 0;
                    $scope.valorMinTempoResposta = 0;
                    $scope.valorMaxTempoResposta = 72;
                    $scope.showModal = false;

                    $scope.init = function(){                   
                        $rootScope.vooRq = JSON.parse(window.sessionStorage.getItem('vooRq'));
                        window.sessionStorage.removeItem('vooRq');
                    }
                    $scope.init();
                    
                    $scope.openDetails = function(segmento) {
                        console.log('Entrou no modal: ' + segmento.Id);
                        $scope.segmentoDetail = segmento;
                        console.log($scope.segmentoDetail.HoraChegada);
                        $scope.showModal = true;
                    };

                    /*$rootScope.vooRq = {LocalPartida:'LAX', LocalChegada:'JFK', DataPartida: '2017/04/11', DataChegada: '2017/04/12'};*/
                    vooService.search($rootScope.vooRq).then(function(vooResponse){ 
                        angular.forEach(vooResponse, function(value, key){
                             $scope.voos.push(value);  
                        });
                        $scope.qtdRegistrosFound = $scope.voos.length; 
                        if($scope.voos.length == 0)
                        {
                            messagesFactory.addMessage('Nenhum registro encontrado.', 'alert alert-info', 0, false);
                            $scope.qtdRegistrosFound = 0; 
                        }

                    }).catch(function(response) {  
                        messagesFactory.addMessage('Ocorreu um erro na chamada do serviço de busca de vôos.', 'alert alert-danger', 0, false);
                    });
                    
                    $scope.apostar = function(voo, valorAposta, valorTempoResposta)
                    { 
                        voo.ValorAposta = valorAposta;
                        voo.TempoFlexibilidade = valorTempoResposta;
                        console.log('Valor Aposta:' + $scope.valorAposta);
                        vooService.apostar(voo).then(function(vooResponse){ 
                            console.log('Passou feliz'); 

                        });  
                    }

                }]);  
})();




