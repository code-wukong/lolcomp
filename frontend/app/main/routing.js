angular.module('main.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: '_pages/home/home.html',
                    controller: 'HomeCtrl'
                })
                
                .when('/about', {
                    templateUrl: '_pages/about/about.html',
                    controller: 'AboutCtrl'
                })
                
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true)

        }]);
