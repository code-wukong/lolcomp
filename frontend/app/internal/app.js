var internal = angular.module("internal", [
    "internal.routing",
    "internal.templates",
    "internal.controllers",
    "internal.directives",
    "internal.services",
    "ngCookies",
]).run(['$http', '$cookies',
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

angular.module("internal.routing", ['ngRoute']);
angular.module("internal.controllers", []);
angular.module("internal.directives", []);
angular.module("internal.services", []);

