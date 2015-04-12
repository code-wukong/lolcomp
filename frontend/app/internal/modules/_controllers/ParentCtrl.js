angular.module('internal.controllers')
    .controller('ParentCtrl', ['$scope', 'LcComms', '$location',
        function ($scope, LcComms, $location) {
            var cst;

            LcComms.call_ws("ws/cst_internal", {"test": null})
                .then(function (data) {
                    cst = $scope.cst = data;
                    initialize();
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
                    },
                    is_active: function (url) {
                        return ($location.path() === ('/'+url) );
                    }
                }
                
                $scope.sidebar = {
                    model: [
                        {
                            label: 'Edit Champs',
                            url: 'internal/champs',
                            new_page: false,
                        },{
                            label: 'Edit Rules',
                            url: 'internal/rules',
                            new_page: false,
                        },{
                            label: 'Database Admin',
                            url: 'admin',
                            new_page: true,
                        }
                    ]
                }
            }

        }]);