(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive("inputDatepicker", ['$compile', function ($compile, $event) {
             return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngReadonly: '=?',
            minDate: '=?',
            maxDate: '=?',            
            dtpRequired: '=?',
            dateOptions: '=?'
        },
        template:  '<p class="input-group">' +
                        '<input type="text" class="form-control" datepicker-popup="{{format}}"' +
                                'ng-model="ngModel" is-open="opened"' +
                                    'min-date="minDate" max-date="maxDate"' +
                                    'datepicker-options="dateOptions" date-disabled="disabled(date, mode)"' +
                                    'ng-required="dtpRequired" close-text="Close" ng-readonly="ngReadonly" ng-click="openPopup()" />' +
                        '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-default" ng-click="openPopup()">' +
                            '<i class="glyphicon glyphicon-calendar"></i></button>' +
                        '</span>' +
                    '</p>',
        controller: function($scope){
            
        },
        link: function ($scope, element, attrs) {
            // check if it was defined.  If not - set a default            
            $scope.dateOptions = $scope.dateOptions || {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false
            };

            $scope.openPopup = function () {
                //$event.preventDefault();
                //$event.stopPropagation();
                $scope.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function (date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            
        }        
    };
}]);
})();

