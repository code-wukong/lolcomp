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
                        title: "Status",
                        current_patch: "5.2.1",
                        latest_patch: "5.2.1",
                        time_last_updated: new Date(),
                        time_last_analyzed: new Date(),
                    },
                    update_champs: {
                        title: "Update Champion Static Data",
                        status: true
                    },
                    analyze_champs: {
                        title: "Analyze Champion Static Data",
                        status: true
                    }
                }

                $scope._helpers = {
                    format_date: function (date) {
                        var obj = new Date(date);
                        if (obj.toString() === 'Invalid Date')
                            return '';
                        else
                            return obj.toLocaleString();
                    }
                }

            }


            initialize();

        }]);