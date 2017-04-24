angular.module('gameFareApp').service('commonService', ["Restangular", "messagesFactory", 
 function(Restangular, messagesFactory ){
       
        this.setFormTouched = function (form) {   
            setFormTouched(form);
        }

        this.getCityFromAirport = function(airportCode, airports)
        {
            angular.forEach(airports,function(valueAirports, key){
                if(valueAirports.VENDOR_CODE = airportCode)
                {
                    return valueAirports.CITY_NAME;
                }
            });
        }

        function setFormTouched(form)
        {
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