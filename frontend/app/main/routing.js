angular.module('main.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: '_pages/home/home.html',
                        // this splash page then redirects to the admin page
                })
                
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true)

        }]);
