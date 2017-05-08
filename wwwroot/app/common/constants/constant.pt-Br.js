(function () {
    'use strict';

    angular
        .module('app.constants')
        .constant('constants', {
            Cabine: [{
                Code :'P', FullName:'Primeira Classe Premium',
                Code :'F', FullName:'Primeira Classe',
                Code :'J', FullName:'Premium Business',
                Code :'C', FullName:'Business',
                Code :'S', FullName:'Econômica Premium',
                Code :'Y', FullName:'Econômica',
            }]   
        });
})();