angular.module('gameFareApp').service('vooService', ["Restangular", "messagesFactory"  , function(Restangular, messagesFactory){
        console.log('Criou o service instaFlight.');
        this.search = function(buscaVooPostRQ){ 
            return Restangular.all("voo").customPOST(buscaVooPostRQ, "busca");
        };

        this.apostar = function(voo){ 
            return Restangular.all("voo").customPOST(voo, "apostar");
        };
    
}]);