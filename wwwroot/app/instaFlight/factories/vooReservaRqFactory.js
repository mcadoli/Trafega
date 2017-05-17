
'use strict';

(function() {

    angular
    .module('app.factories')
    .factory('vooReservaRqFactory', [function() {
        var vooReserva = {
            ClientePagante: {
                                email:'', 
                                cartao:{bandeira:'', nomeNoCartao:'', dataValidade:'', numeCartao:'', codSeguranca:''},
                                dataNasc: '', sexo: '', cpf: '', Telefone:'', tipoTelefone:'', endereco:''
                            },
            Passageiros: [{nome:'', sobrenome:'', dataNasc:'', sexo:''}],
            voo:{}
        };

        return voo;

    }]);

})();

