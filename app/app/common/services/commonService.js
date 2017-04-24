angular.module('gameFareApp').service('commonService', [function(){
       console.log('Iniciou o servive common');
       
       this.setFormTouched = function(form) 
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
        };
}]);