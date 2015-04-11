angular.module('main.controllers')
    .controller('ParentCtrl', ['$scope', 'LcComms',
        function ($scope, LcComms) {
            var cst;
            
            LcComms.call_ws("ws/cst_main", {"test": null})
                .then(function (data) {
                    cst = $scope.cst = data;
                    initialize();
                    console.log({"jarvan":data.jarvan})
                })
                .catch(function (data) {
                    console.log(data, "catch")
                })
                
            var initialize = function () {
                $scope.static = {
                    get_url: function (resource) {
                        return cst.static_url + '/static/' + resource;
                    },
                    get_year: function () {
                        var date = new Date();
                        return date.getFullYear();
                    }
                }
            }

        }]);