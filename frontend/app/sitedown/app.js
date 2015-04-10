var sitedown = angular.module("sitedown", [
    "sitedown.routing",
    "sitedown.templates",
    "sitedown.controllers",
    "sitedown.directives",
    "sitedown.services",
    "ngCookies",
])
    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        }])
    .run(['$http', '$cookies',
        /*
         * https://docs.djangoproject.com/en/1.8/ref/csrf/
         * 
         * For this reason, there is an alternative method: 
         *  on each XMLHttpRequest, set a custom X-CSRFToken header
         *  to the value of the CSRF token.
         */
        function ($http, $cookies) {
            $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        }]);

angular.module("sitedown.routing", ['ngRoute']);
angular.module("sitedown.controllers", []);
angular.module("sitedown.directives", []);
angular.module("sitedown.services", []);

