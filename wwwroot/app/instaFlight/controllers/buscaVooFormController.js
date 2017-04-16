(function () {
    'use strict';
    var dataFrom;
    var dataTo;
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', '$http',
                function ($rootScope, $scope, $location, $routeParams, vooService, $http, dataFrom) {
                    console.log('Entrou no controller instaFlight'); 
                    //Faz com que não entre avalidação após o clique do submit
                    //$scope.frmVooRq.$setUntouched();
                    //Reseta o formulário ao seu estado original
                    //$scope.frmVooRq.$setPristine();
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
                        if (formVooRq.$valid) {
                            vooRq.LocalPartida = vooRq.LocalPartida.description;
                            vooRq.LocalChegada = vooRq.LocalChegada.description;
                            vooRq.DataPartida = $scope.dataPartida;
                            console.log('Entrou no buscarVoos' + vooRq.LocalPartida + vooRq.DataPartida);   
                            window.sessionStorage.setItem('vooRq', JSON.stringify($scope.vooRq));
                            window.location.href='/buscaVoo';  
                        }
                        else{
                             // Form not valid, triggering fields to make it easier to find errors
                            setFormTouched(formVooRq);
                        } 
                    }  

                    function setFormTouched(form) {
                            // Check if the form/property has the $setSubmitted method
                            if (form.hasOwnProperty('$submitted')) {
                                // Iterate through each of the required error properties
                                angular.forEach(form.$error, function (errorType) {
                                    // Iterate through each error type
                                    angular.forEach(errorType, function (prop) {
                                        // Check if the property has the $setTouched method
                                        if (prop.hasOwnProperty('$touched')) prop.$setTouched();
                                        // Recursive call to handle nested forms
                                        setFormTouched(prop);
                                    });

                                });
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
