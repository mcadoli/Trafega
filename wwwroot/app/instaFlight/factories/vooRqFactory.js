
'use strict';

(function() {

    angular
    .module('app.factories')
    .factory('vooRqFactory', [function() {
        var voo = {
            LocalPartida: '', 
            LocalChegada: '',
            DataPartida: new Date('yyyy-MM-dd'),
            DataChegada: new Date('yyyy-MM-dd'),
            SomenteVoosDiretos: false,
            IdaVolta: true
        };

        return voo;

    }]);

})();

