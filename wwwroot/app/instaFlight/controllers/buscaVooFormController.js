(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', '$http', 'commonService',
                function ($rootScope, $scope, $location, $routeParams, $http, commonService ) {
                    console.log('Entrou no controller instaFlight'); 
                    
                    $scope.minDataPartida = new Date();
                    $scope.minDataChegada = new Date();
                    $scope.minDataChegada = $scope.minDataChegada.setDate($scope.minDataPartida.getDate()+1);
                    $scope.voosResponse = [];
                    $scope.vooRq = novoVoo(); 
                    $scope.voos = [];
                    
                    $http.get('airports.json').success(function(data){
                        $scope.airports = data;
                    });

                    $scope.buscarVoos = function(vooRq, formVooRq){ 
                        //O formVooRq está sempre inválido. É preciso entender porque. A solução de contorno foi testar os campos.
                        if(vooRq.LocalPartida != '' && vooRq.LocalChegada != '' && vooRq.DataPartida != '' && vooRq.DataChegada != '' )
                        {
                            vooRq.LocalPartida = vooRq.LocalPartida.description;
                            vooRq.LocalChegada = vooRq.LocalChegada.description; 
                            console.log('Entrou no buscarVoos' + vooRq.LocalPartida + vooRq.DataPartida);   
                            window.sessionStorage.setItem('vooRq', JSON.stringify(vooRq));
                            window.location.href='/buscaVoo'; 
                            formVooRq.$setUntouched();
                            formVooRq.$setPristine(); 
                        } 
                        else
                        {
                            commonService.setFormTouched(formVooRq);
                        }
                    }   
                }]);   
                
})();

function novoVoo() 
{
    return{
        LocalPartida: '', 
        LocalChegada: '',
        DataPartida: '',
        DataChegada:'',
        SomenteVoosDiretos: false,
        IdaVolta: true
    }
}
