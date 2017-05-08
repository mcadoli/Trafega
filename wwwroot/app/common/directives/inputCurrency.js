(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('inputCurrency', ['$filter', function ($filter) {
            return {
                restrict: 'AE',
                require: '?ngModel',             
                link: function (scope, elem, attrs, ctrl) {
                    if (!ctrl) return;

                    var format = {
                            prefix: '',
                            centsSeparator: ',',
                            thousandsSeparator: ''
                        };

                    ctrl.$parsers.unshift(function (value) {
                        elem.priceFormat(format);

                        return elem[0].value;
                    });

                    ctrl.$formatters.unshift(function (value) {
                        elem[0].value = ctrl.$modelValue * 100 ;
                        elem.priceFormat(format);
                        return elem[0].value;
                    })
                }
            }
        }]);
})(); 