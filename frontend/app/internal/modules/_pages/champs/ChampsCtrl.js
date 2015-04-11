angular.module('internal.controllers')
    .controller('ChampsCtrl', ['$scope', 'LcComms', '$mdSidenav',
        function ($scope, LcComms, $mdSidenav) {
            var cst;
            $scope.toggleLeft = function () {
                $mdSidenav('left').toggle()
                    .then(function () {
                        console.log("Champs Ctrl - online")
                    });
            };
        }]);