(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', 
                function ($rootScope, $scope, $location, $routeParams, vooService) {
                    console.log('Entrou no controller instaFlight'); 
                    $scope.voosResponse = [];
                    $rootScope.vooRq = novoVoo();
                    $scope.voos = [];
                   
                    $scope.buscarVoos = function(vooRq){
                            vooService.search(vooRq).then(function(vooResponse){
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
