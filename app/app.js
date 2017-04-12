(function () {
    'use strict';
    
    //Custom modules
    angular.module('app.directives', []);
    angular.module('app.services', []);
    angular.module('app.factories', []);
    angular.module('app.providers', []);
    angular.module('app.filters', []);
   

    //Main app
    angular.module('gameFareApp', [
        //Angular modules
        , 'ngRoute'
        , 'ngAnimate'

        //Custom modules 
        , 'app.directives'
        , 'app.services'
        , 'app.factories'
        , 'app.providers'
        , 'app.filters'
        //3rd Party Modules
        // , 'angularMoment'          //Para tratamento de datas (ranges, formatação etc) (https://github.com/urish/angular-moment)
         , 'ngFileUpload'           //Para upload de arquivos (https://github.com/danialfarid/ng-file-upload)
        // , 'angular-loading-bar'    //Interceptor para gerar o loading quando houver requisições (https://github.com/chieffancypants/angular-loading-bar)
        // , 'ngSanitize'             //Necessário para "sanitize" o HTML (https://docs.angularjs.org/api/ngSanitize)
        // , 'infinite-scroll'        //Paginação infinita (http://sroze.github.io/ngInfiniteScroll/)
        // , 'mgcrea.ngStrap'         //Diversas diretivas do bootstrap para angular (http://mgcrea.github.io/angular-strap)
        // , 'ui.mask'                //Máscaras para campos (https://github.com/angular-ui/ui-mask)
        // , 'ui.utils.masks'         //Máscaras personalizadas e localizadas (https://github.com/assisrafael/angular-input-masks)
        //, 'fsm'                  //Fixação do header e elementos ao dar scroll (https://github.com/FutureStateMobile/sticky-header)
        //, 'idf.br-filters'       //Filtros para informações específicas do Brasil (https://github.com/the-darc/angular-br-filters)
        //, 'angular-multi-check'  //Seleção de múltiplos checkboxes com shift (https://github.com/Schlogen/angular-multi-check)
        //, 'cfp.hotkeys'          //Hotkeys! (https://github.com/chieffancypants/angular-hotkeys/)
         , 'restangular'            //REST API (https://github.com/mgonto/restangular)
         , 'zj.namedRoutes'         //Resolução de rotas | URL reversa (https://github.com/airtonix/angular-named-routes/)
        // , 'angular-linq'           //Extensões do tipo LINQ disponíveis para angular (https://github.com/Angular-Public/angular-linq)
        // , 'highcharts-ng'          //Módulo de exibição de gráficos (https://github.com/pablojim/highcharts-ng)
        // , 'angular.filter'         //Diversos filtros extras e úteis para o angular (https://github.com/a8m/angular-filter)
        ,'ui.bootstrap'
       
    ])
        
        //Global variables


        //Main app - CONFIG
        .config(
            ['$routeProvider', '$locationProvider', '$httpProvider',  'RestangularProvider', 'EnvironmentConfig', 
            function (routerProvider, $locationProvider, httpProvider, RestangularProvider, EnvironmentConfig) {
                $locationProvider.html5Mode(true);
                $locationProvider.hashPrefix('!');

                RestangularProvider.setBaseUrl(EnvironmentConfig.api);
                RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });
                
                //http://blog.xebia.com/angular-reverse-url-construction/
                routerProvider.when('/', {
                    templateUrl: '/app/instaFlight/templates/buscaVooForm.html',
                    controller: 'buscaVooFormController',
                    name: 'buscaVooForm'
                }).otherwise({ redirectTo: "/" });

                routerProvider.when('/buscaVoo', {
                    templateUrl: '/app/instaFlight/templates/buscaVoo.html',
                    controller: 'buscaVooController',
                    name: 'buscaVoo'
                }).otherwise({ redirectTo: "/" });     

            }]);       
       
})();

