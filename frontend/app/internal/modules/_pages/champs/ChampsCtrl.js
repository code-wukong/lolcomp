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
            
            var initialize = function () {
                $scope.panels = {
                    info: {
                        title: "Information"
                    },
                    update_champs: {
                        title: "Update Champion Static Data"
                    },
                    analyze_champs: {
                        title: "Analyze Champion Static Data"
                    }
                }
            }
            
            
            initialize();
            
        }]);