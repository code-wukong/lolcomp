var main = angular.module("main", [
    "main.routing",
    "main.templates",
    "main.controllers",
    "main.directives",
    "main.services",
    "ngCookies",
    "ngMaterial",
    "ngScrollSpy",
    "ngSanitize"
]).config(["$mdThemingProvider",
    function ($mdThemingProvider) {
        // Extend the blue-grey theme with a few different colors
        var neonRedMap = $mdThemingProvider.extendPalette('blue-grey', {
            '500': '27586B'
        });
        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('neonRed', neonRedMap);
        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('neonRed')
    }
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

angular.module("main.routing", ['ngRoute']);
angular.module("main.controllers", []);
angular.module("main.directives", []);
angular.module("main.services", []);

