angular.module('internal.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/internal', {
                    templateUrl: '_pages/index/index.html',
                        // this splash page then redirects to the admin page
                })
                
                .otherwise({
                    redirectTo: '/internal'
                });

            $locationProvider.html5Mode(true)

        }]);
