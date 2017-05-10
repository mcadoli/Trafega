(function () {
    'use strict'; 
    angular
        .module('gameFareApp')
        .controller('buscaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', "messagesFactory", "$window", 'commonService', '$http', '$filter', 'constants', 'vooRqFactory', 
                function ($rootScope, $scope, $location, $routeParams, vooService, messagesFactory, $window, commonService, $http, $filter, constants, vooRqFactory) {    
                    $scope.minDataPartida = new Date(); 
                    $scope.minDataChegada = new Date();
                    $scope.minDataChegada = $scope.minDataChegada.setDate($scope.minDataPartida.getDate());
                    $scope.segmentos = []; 
                    $scope.valorAposta = 0;
                    $scope.valorMinAposta = 0;
                    $scope.valorMaxAposta = 1000;

                    $scope.valorTempoResposta = 0;
                    $scope.valorMinTempoResposta = 0;
                    $scope.valorMaxTempoResposta = 72;
                    $scope.showModal = false;   
                    $scope.vooRq = vooRqFactory;
                    $scope.qtdRegistrosFound = 0;
                    $scope.btnApostaLabel = 'APOSTAR AGORA'
                    $scope.init = function(){    
                        $http.get('airports.json').success(function(data){
                            $scope.airports = data;
                        }).catch(function(response) {   
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        }); 

                        $http.get('airlines.json').success(function(data){
                            $scope.airlines = data;
                        }).catch(function(response) {   
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        }); 

                        $rootScope.vooRq = JSON.parse(window.sessionStorage.getItem('vooRq'));
                        window.sessionStorage.removeItem('vooRq');
                    }
                    $scope.init();
                    
                   /* $rootScope.vooRq = {LocalPartida:'LAX', LocalChegada:'NYC', DataPartida: '2017/04/26', DataChegada: '2017/04/27'};*/
                   $scope.buscarVoos = function(vooRq, formVooRq){ 
                        messagesFactory.clearMessages();
                        if(vooRq.LocalPartida != '' && vooRq.LocalChegada != '' && vooRq.DataPartida != '' && vooRq.DataChegada != '' )
                        {
                            $scope.loading = true;
                            $scope.voos = [];   
                            $scope.qtdRegistrosFound = {};
                            if(vooRq.LocalPartida.description != undefined)
                                vooRq.LocalPartida = vooRq.LocalPartida.description;
                            if(vooRq.LocalChegada.description != undefined)
                                vooRq.LocalChegada = vooRq.LocalChegada.description;

                            vooRq.DataPartida = $filter('date')(vooRq.DataPartida,'yyyy-MM-dd');
                            vooRq.DataChegada = $filter('date')(vooRq.DataChegada,'yyyy-MM-dd');    
                            
                            vooService.search(vooRq).then(function(vooResponse){ 
                                var countTrechos = 0;
                            angular.forEach(vooResponse, function(value, key){ 
                                $scope.voos.push(value); 
                                value.Classe = constants.Cabine.filter(function (items) { return items.Code === value.CodigoCabine; })[0].FullName; 
                                angular.forEach(value.Trechos,function(valueTrecho, key){
                                    valueTrecho.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoPartida })[0].CITY_NAME;
                                    valueTrecho.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoChegada })[0].CITY_NAME;
                                    valueTrecho.AeroportoPartidaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoPartida })[0].POI_NAME;
                                    valueTrecho.AeroportoChegadaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoChegada })[0].POI_NAME;
                                    countTrechos += 1;
                                    angular.forEach(valueTrecho.Segmentos,function(valueSegmento, key){
                                        valueSegmento.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoPartida })[0].CITY_NAME;
                                        valueSegmento.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoChegada })[0].CITY_NAME;
                                        valueSegmento.AeroportoPartidaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoPartida })[0].POI_NAME;
                                        valueSegmento.AeroportoChegadaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoChegada })[0].POI_NAME;
                                        valueSegmento.Classe = constants.Cabine.filter(function (items) { return items.Code === value.CodigoCabine; })[0].FullName;
                                        valueTrecho.CompanhiaAerea = $filter('filter')($scope.airlines, {iata: valueSegmento.CodigoCompanhiaAerea })[0].name;
                                        
                                    });

                                });
                                
                            });
                            $scope.qtdRegistrosFound = countTrechos;
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
                                value.Classe = constants.Cabine.filter(function (items) { return items.Code === value.CodigoCabine; })[0].FullName; 
                                angular.forEach(value.Trechos,function(valueTrecho, key){
                                    valueTrecho.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoPartida })[0].CITY_NAME;
                                    valueTrecho.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoChegada })[0].CITY_NAME;
                                    valueTrecho.AeroportoPartidaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoPartida })[0].POI_NAME;
                                    valueTrecho.AeroportoChegadaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueTrecho.AeroportoChegada })[0].POI_NAME;
                                    angular.forEach(valueTrecho.Segmentos,function(valueSegmento, key){
                                        valueSegmento.CidadePartida = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoPartida })[0].CITY_NAME;
                                        valueSegmento.CidadeChegada = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoChegada })[0].CITY_NAME;
                                        valueSegmento.AeroportoPartidaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoPartida })[0].POI_NAME;
                                        valueSegmento.AeroportoChegadaNome = $filter('filter')($scope.airports, {VENDOR_CODE: valueSegmento.AeroportoChegada })[0].POI_NAME;
                                        valueSegmento.Classe = constants.Cabine.filter(function (items) { return items.Code === value.CodigoCabine; })[0].FullName;
                                        valueTrecho.CompanhiaAerea = valueSegmento.CodigoCompanhiaAerea;
                                    });

                                });
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
   

                    $scope.openDetails = function(segmentos) {  
                        $scope.segmentos = segmentos;  
                        $scope.showModal = true;
                    };
                    
                    $scope.apostar = function(voo, valorAposta, valorTempoResposta)
                    {  
                        messagesFactory.clearMessages();
                        $scope.btnApostaLabel = 'APOSTANDO';
                        voo.ValorAposta = valorAposta;
                        voo.TempoFlexibilidade = valorTempoResposta;
                        console.log('Valor Aposta:' + $scope.valorAposta);
                        vooService.apostar(voo).then(function(vooResponse){ 
                             messagesFactory.addMessage('Aposta realizada com sucesso.', 'alert alert-success', 0, false);
                             $scope.btnApostaLabel = "APOSTADO";

                        }).catch(function(response) {  
                            $scope.btnApostaLabel = "ERRO";  
                            messagesFactory.addMessage(response.data, 'alert alert-danger', 0, false); 
                        }); 
                    }

                    $scope.comprarAgora = function(voo)
                    {
                        window.sessionStorage.setItem('voo', JSON.stringify(voo));
                        window.location.href = '/reservaVoo';
                    }

                }]);  
})();






