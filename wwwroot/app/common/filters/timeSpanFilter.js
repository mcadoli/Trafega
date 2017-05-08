(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('timeSpanFormat',function () {
        return function (timeObj, format) {
            return moment(timeObj, "HH:mm").format(format);
        };
    });
})();