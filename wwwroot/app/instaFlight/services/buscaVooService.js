angular.module('gameFareApp').service('vooService', ["Restangular", "messagesFactory"  , function(Restangular, messagesFactory){
       //RestAngular call samples
       //Restangular.one('places', 123).getList('venues')
       //Restangular.one('places', 123).all('venues').getList()
       //Restangular.one('Stock/Cars', carType).get({colour: 'red'}).then
       //Restangular.all('stock').all('cars').all(carType)
        this.search = function(buscaVooPostRQ){ 
            //return Restangular.one("voos").customPOST(buscaVooPostRQ, "itinerarios");
            return Restangular.all("v1/voos").customGET("itinerarios", buscaVooPostRQ);
        };

        this.apostar = function(voo){ 
            return Restangular.all("v1/voos").customPOST(voo, "apostar");
        };

        
}]);