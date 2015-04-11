angular.module('internal.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/internal/champs', {
                    templateUrl: '_pages/champs/champs.html',
                    controller: 'ChampsCtrl'
                })
                
                .when('/internal/rules', {
                    templateUrl: '_pages/rules/rules.html',
                    controller: 'RulesCtrl'
                })
                
                .otherwise({
                    redirectTo: '/internal/champs'
                });

            $locationProvider.html5Mode(true)

        }]);
