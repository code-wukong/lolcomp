angular.module('sitedown.routing')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: '_pages/sitedown/sitedown.html',
                        // this splash page then redirects to the admin page
                })
                
                .otherwise({
                    redirectTo: '/'
                });

        }]);
