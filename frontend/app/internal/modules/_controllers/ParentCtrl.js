angular.module('internal.controllers')
    .controller('ParentCtrl', ['$scope', 'LcComms', 'LcConfig', '$location',
        function ($scope, LcComms, LcConfig, $location) {

            var cst;
            LcComms.send_request("ws/cst_internal", {"test": null})
                .then(function (data) {
                    cst = $scope.cst = data;
                    LcComms.write_constants(data);
                    return LcConfig.initialize();
                })
                .then(function () { 
                    LcComms.is_ready(true);
                    initialize();
                });

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
                        return ($location.path() === ('/' + url));
                    }
                }

                $scope.sidebar = {
                    model: [
                        {
                            label: 'Edit Champs',
                            url: 'internal/champs',
                            new_page: false,
                        }, {
                            label: 'Edit Tags',
                            url: 'internal/rules',
                            new_page: false,
                        }, {
                            label: 'Edit Relations',
                            url: 'internal/relations',
                            new_page: false,
                        }, {
                            label: 'Database Admin',
                            url: 'admin',
                            new_page: true,
                        }
                    ]
                }
            }

        }]);