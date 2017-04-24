(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', "messagesFactory", "$window", 'commonService', '$http', '$filter',
                function ($rootScope, $scope, $location, $routeParams, vooService, messagesFactory, $window, commonService, $http, $filter ) {    
                   
                    $scope.segmentoDetail = {}; 
                    $scope.valorAposta = 0;
                    $scope.valorMinAposta = 0;
                    $scope.valorMaxAposta = 1000;

                    $scope.valorTempoResposta = 0;
                    $scope.valorMinTempoResposta = 0;
                    $scope.valorMaxTempoResposta = 72;
                    $scope.showModal = false;
                    $scope.loading = false;

                    $scope.init = function(){    
                        $http.get('airports.json').success(function(data){
                            $scope.airports = data;
                        });               
                        $rootScope.vooRq = JSON.parse(window.sessionStorage.getItem('vooRq'));
                        window.sessionStorage.removeItem('vooRq');
                    }
                    $scope.init();
                    
                    $rootScope.vooRq = {LocalPartida:'LAX', LocalChegada:'NYC', DataPartida: '2017/04/24', DataChegada: '2017/04/25'};
                   $scope.buscarVoos = function(vooRq, formVooRq){ 
                        messagesFactory.clearMessages();
                        if(vooRq.LocalPartida != '' && vooRq.LocalChegada != '' && vooRq.DataPartida != '' && vooRq.DataChegada != '' )
                        {
                            $scope.loading = true;
                            $scope.voos = [];
                            $scope.qtdRegistrosFound = {};
                            vooRq.LocalPartida = vooRq.LocalPartida.description;
                            vooRq.LocalChegada = vooRq.LocalChegada.description;
  
                            vooService.search(vooRq).then(function(vooResponse){ 
                            angular.forEach(vooResponse, function(value, key){
                                $scope.voos.push(value); 
                                
                            });
                            $scope.qtdRegistrosFound = $scope.voos.length; 
                            if($scope.voos.length == 0)
                            {
                                messagesFactory.addMessage('Nenhum registro encontrado.', 'alert alert-info', 0, false);
                                $scope.qtdRegistrosFound = 0; 
                            }
                            
                            $scope.loading = false;

                        }).catch(function(response) {  
                            $scope.loading = false;  
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        });  
                        }
                        else
                        {
                             commonService.setFormTouched(formVooRq);
                        }
                   
                    }

                   if($rootScope.vooRq != null && $rootScope.vooRq != undefined)
                   {
                        $scope.loading = true;
                        vooService.search($rootScope.vooRq).then(function(vooResponse){ 
                            $scope.voos = [];
                            $scope.qtdRegistrosFound = {};
                            angular.forEach(vooResponse, function(value, key){
                                value.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: value.AeroportoPartida })[0].CITY_NAME;
                                value.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: value.AeroportoChegada })[0].CITY_NAME;
                                $scope.voos.push(value);  
                                angular.forEach(value.Trechos,function(valueTrecho, key){
                                    angular.forEach(valueTrecho.Segmentos,function(valueSegmento, key){
                                        valueSegmento.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoPartida })[0].CITY_NAME;
                                        valueSegmento.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoChegada })[0].CITY_NAME;
                                    });

                                });
                            });
                            $scope.qtdRegistrosFound = $scope.voos.length; 
                            if($scope.voos.length == 0)
                            {
                                messagesFactory.addMessage('Nenhum registro encontrado.', 'alert alert-info', 0, false);
                                $scope.qtdRegistrosFound = 0; 
                            }
                            
                            $scope.loading = false;

                        }).catch(function(response) {  
                            $scope.loading = false;  
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        });  
                   }
   

                    $scope.openDetails = function(segmento) {
                        console.log('Entrou no modal: ' + segmento.Id);
                        $scope.segmentoDetail = segmento;
                        console.log($scope.segmentoDetail.HoraChegada);
                        $scope.showModal = true;
                    };
                    
                    $scope.apostar = function(voo, valorAposta, valorTempoResposta)
                    { 
                        voo.ValorAposta = valorAposta;
                        voo.TempoFlexibilidade = valorTempoResposta;
                        console.log('Valor Aposta:' + $scope.valorAposta);
                        vooService.apostar(voo).then(function(vooResponse){ 
                             messagesFactory.addMessage('Aposta realizada com sucesso.', 'alert alert-success', 0, false);

                        }).catch(function(response) {  
                            $scope.loading = false;  
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        }); 
                    }

                }]);  
})();




