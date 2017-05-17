(function () {
    'use strict';
    angular
        .module('gameFareApp')
        .controller('reservaVooController', 
            ['$rootScope', '$scope', '$location', '$routeParams', '$http', 'commonService', '$filter', '$window', '$document', '$compile', 'vooReservaRqFactory',
                function ($rootScope, $scope, $location, $routeParams, $http, commonService, $filter, $window, $document, $compile, vooReservaRqFactory) {
                   var numeroPassageiro = 2;
                   $scope.vooReservaRq = vooReservaRqFactory;
                   $scope.init = function(){   
                        $rootScope.voo = JSON.parse(window.sessionStorage.getItem('voo'));
                        //window.sessionStorage.removeItem('voo');
                    }
                    $scope.init();

                    $scope.addHtmlPassageiro = function()
                    {
                        var html='<div class="row"><div class="person-information"> ' + 
                                    '<div class="col-sm-2 col-md-2">' +
                                        '<label>Adulto ' + numeroPassageiro + '</label>' + 
                                    '</div>' +
                                    '<div class="col-sm-3 col-md-3">' +
                                        '<label>Nome</label>' +
                                        '<input type="text" class="input-text full-width" value="" placeholder="" />' +
                                    '</div>' +
                                    '<div class="col-sm-3 col-sm-3">' +
                                        '<label>Sobrenome</label>' +
                                        '<input type="text" class="input-text full-width" value="" placeholder="" />' +
                                    '</div>' +
                                    '<div class="col-sm-2 col-md-2">' +
                                        '<label>Data Nasc:</label>' +
                                        '<input type="text" class="input-text full-width" value="" placeholder="" />' +
                                    '</div>' +
                                    '<div class="col-sm-2 col-md-2">' +
                                        '<label>Sexo:</label>' +
                                        '<select class="form-control" id="sel1">' +
                                            '<option>Feminino</option>' +
                                            '<option>Masculino</option>' + 
                                        '</select>' +
                                    '</div>' +
                                '</div></div>' ;
                        var target = $document[0].getElementById('passageiros'); 
                        angular.element(target).append($compile(html)($scope));
                        numeroPassageiro++;
                    }
                   
                }]);  
                      
})();
