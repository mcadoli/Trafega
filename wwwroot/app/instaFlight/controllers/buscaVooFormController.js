(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', '$http',
                function ($rootScope, $scope, $location, $routeParams, vooService, $http) {
                    console.log('Entrou no controller instaFlight');  

                    $scope.voosResponse = [];
                    $scope.vooRq = novoVoo(); 
                    $scope.voos = [];
                    
                    
                    $http.get('airports.json').success(function(data){
                        $scope.airports = data;
                    });

                    $scope.buscarVoos = function(vooRq){
                        vooRq.LocalPartida = vooRq.LocalPartida.description;
                        vooRq.LocalChegada = vooRq.LocalChegada.description;
                        console.log('Entrou no buscarVoos' + vooRq.LocalPartida + vooRq.DataPartida);   
                        window.sessionStorage.setItem('vooRq', JSON.stringify($scope.vooRq));
                        //window.location.href='/buscaVoo';  
                    } 

                   
                }]);   
                
})();

function novoVoo() 
{
    return{
        LocalPartida: '', 
        LocalChegada: '',
        DataPartida: '',
        DataChegada: '',
        SomenteVoosDiretos: false,
        IdaVolta: true
    }
}
