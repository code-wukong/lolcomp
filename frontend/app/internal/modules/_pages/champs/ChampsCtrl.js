angular.module('internal.controllers')
    .controller('ChampsCtrl', ['$scope', 'LcComms',
        function ($scope, LcComms) {
            var cst;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });

            var initialize = function () {
                
                var post = {
                    "test1": 3,
                    "test2": 'asdfasf2sdf32df'
                }
                LcComms.send_request(cst.ws.riot_api_request, post)
                    .then(function (data) {
                        console.log(data);
                    })
                    .catch(function (data) {
                        console.log(data, "error");
                    });

                $scope.panels = {
                    info: {
                        title: "Information",
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

            };

        }]);