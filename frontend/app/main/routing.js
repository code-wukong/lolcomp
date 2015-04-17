angular.module('main.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: '_pages/home/home.html',
                    controller: 'HomeCtrl'
                })
                
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true)

        }]);
