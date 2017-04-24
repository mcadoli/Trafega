(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('buscaVooFormController', 
            ['$rootScope', '$scope', '$location', '$routeParams', 'vooService', '$http',
                function ($rootScope, $scope, $location, $routeParams, vooService, $http) {
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
                        console.log(''); 
                        //O formVooRq está sempre inválido. É preciso entender porque. A solução de contorno foi testar os campos.
                        if(vooRq.LocalPartida != '' && vooRq.LocalChegada != '' && vooRq.DataPartida != '' && vooRq.DataChegada != '' )
                        {
                            vooRq.LocalPartida = vooRq.LocalPartida.description;
                            vooRq.LocalChegada = vooRq.LocalChegada.description; 
                            console.log('Entrou no buscarVoos' + vooRq.LocalPartida + vooRq.DataPartida);   
                            window.sessionStorage.setItem('vooRq', JSON.stringify($scope.vooRq));
                            window.location.href='/buscaVoo'; 
                            formVooRq.$setUntouched();
                            formVooRq.$setPristine(); 
                        } 
                        else
                        {
                            setFormTouched(formVooRq)
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
