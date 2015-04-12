angular.module('internal.controllers')
    .controller('RulesCtrl', ['$scope', 'LcComms',
        function ($scope, LcComms) {
            var cst;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });

            var initialize = function () {

            };

        }]);