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
        var lolcomp_primary = $mdThemingProvider.extendPalette('blue-grey', {
            '500': '27586B'
        });
        var lolcomp_accent = $mdThemingProvider.extendPalette('blue-grey', {
            '500': 'FFFFFF'
        });
        // Register the new color palette maps
        $mdThemingProvider.definePalette('lolcomp_primary', lolcomp_primary);
        $mdThemingProvider.definePalette('lolcomp_accent', lolcomp_accent);
        // Use that theme for the primary and accent intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('lolcomp_primary')
            .accentPalette('lolcomp_accent')
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

