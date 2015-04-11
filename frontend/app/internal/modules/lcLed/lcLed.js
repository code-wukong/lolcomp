angular.module("internal.directives")
    .factory("lcLedLinkFn", [
        function () {
            return function (scope, elem, attrs) {
                var status = "";
                
                if (scope.lcGreenLight === "true")
                    status = "led-green";
                if (scope.lcBlueLight === "true")
                    status = "led-blue";
                if (scope.lcOrangeLight === "true")
                    status = "led-orange";
                if (scope.lcRedLight === "true")
                    status = "led-red";
                
                elem.children().addClass(status);
                
            };
        }])
    .directive("lcLed", ["lcLedLinkFn",
        function (lcLedLinkFn) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    lcGreenLight: "@",
                    lcBlueLight: "@",
                    lcOrangeLight: "@",
                    lcRedLight: "@",
                },
                templateUrl: "lcLed/lcLed.html",
                link: lcLedLinkFn
            };
        }]);