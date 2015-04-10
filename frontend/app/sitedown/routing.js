angular.module('sitedown.routing')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: '_pages/sitedown/sitedown.html',
                        // this splash page then redirects to the admin page
                })
                
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true)

        }]);
