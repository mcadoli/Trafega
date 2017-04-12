
'use strict';

(function() {

    angular
    .module('gameFareApp')
    .factory('vooFactory', [function() {
        var voo = {
            criarVooFromBusca: function(vooResult) {
                this.AeroportoPartida = vooResult.AeroportoPartida, 
                this.AeroportaChegada = vooResult.AeroportaChegada,
                this.DataPartida = vooResult.DataPartida,
                this.DataChegada = vooResult.DataChegada,
                this.TemVolta = vooResult.TemVolta,
                this.ValorTotal = vooResult.ValorTotal
            }  
        };

        return voo;

    }]);

})();

