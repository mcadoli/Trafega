angular.module('gameFareApp').service('buscaVooService', ["Restangular", function(Restangular){
        console.log('Criou o service instaFlight.');
        this.search = function(buscaVooPostRQ){ 
            return Restangular.all("voo").customPOST(buscaVooPostRQ, "busca");
        };
    
}]);