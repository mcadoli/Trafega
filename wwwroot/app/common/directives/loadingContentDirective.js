(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('loadingContent', function () {
            return {
                restrict: 'E',
                replace:true,
                template: '<div class="text-center"> ' +  
                            '<div class="row">' +               
                                '<img  src="../../images/logoLoading.png" alt="Home" />' +
                            '</div>' +
                            '<div class="row">' +
                                    '<i class="fa fa-spinner fa-spin"></i>&nbsp&nbsp<span class="loading-text">Carregando...</span>' +
                            '</div>'+
                          '</div>' ,
                            
                link: function (scope, element, attr) {
                    scope.$watch('loading', function (val) {
                        if (val)
                            element.show();
                        else
                            element.hide();
                    });
                }
            }
        });
})(); 