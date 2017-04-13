(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive("inputDatepicker", ['$compile', function ($compile) {
             return {
                scope: {
                    'ngModel': '=',
                    'name': '@',
                    'class': '@',
                    'ngRequired': '=',
                    'change': '&',
                    'isOpen': '='
                },
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $scope.isOpened = attrs.isOpen || false;
                    
                    //Adiciona wrapper
                    var wrapper = angular.element('<span class="ui-datepicker-container"></div>');
                    element.after(wrapper);
                    wrapper.prepend(element);
                    
                    //Adiciona o calendário
                    var calendarElement = angular.element('<span class="ui-datepicker-trigger glyphicon glyphicon-calendar" ng-click="open()"></span>');
                    element.after(calendarElement);
                    calendarElement.bind('click', function(){
                        $scope.open();
                    });
 
                    //Controle do datepicker
                    $scope.open = function () {
                        var el = element;
                        setTimeout(function() {
                            el[0].focus(); 
                        }, 0);
                    };
                    
                     //Ao eliminar, tirar wrapper
                    $scope.$on("$destroy", function() {
                        wrapper.after(element);
                        wrapper.remove();
                        calendarElement.remove();
                    });
                }
            }
        }]);
})();