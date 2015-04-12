angular.module("internal.directives")
    .directive("lcLed", [
        function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "lcLed/lcLed.html",
            };
        }]);