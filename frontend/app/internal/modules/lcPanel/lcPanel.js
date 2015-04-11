angular.module("internal.directives")
    .factory("lcPanelLinkFn", [
        function () {
            return function (scope, elem, attrs) {
            };
        }])
    .directive("lcPanel", ["lcPanelLinkFn",
        function (lcPanelLinkFn) {
            return {
                restrict: "E",
                transclude: true,
                replace: true,
                scope: {
                    lcTitle: "="
                },
                templateUrl: "lcPanel/lcPanel.html",
                link: lcPanelLinkFn
            };
        }]);