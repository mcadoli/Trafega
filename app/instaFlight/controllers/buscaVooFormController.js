(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'buscaVooService', 
                function ($rootScope, $scope, $location, $routeParams, buscaVooService) {
                    console.log('Entrou no controller instaFlight'); 
                    $scope.voosResponse = [];
                    $rootScope.vooRq = novoVoo();
                    $scope.voos = [];
                   
                    //vooFactory.criarVooFromBusca(buscarVoos(vooRq));  
                   
                    $scope.buscarVoos = function(vooRq){
                            buscaVooService.search(vooRq).then(function(vooResponse){
                            console.log(vooResponse.AeroportaChegada);
                            $scope.voos.push(vooResponse.Voo);
                        });   
                    }
                }]);  
})();

function novoVoo() 
{
    return{
        localPartida: '', 
        localChegada: '',
        dataPartida: '',
        dataChegada: '',
        somenteVoosDiretos: false,
        idaVolta: true
    }
}
