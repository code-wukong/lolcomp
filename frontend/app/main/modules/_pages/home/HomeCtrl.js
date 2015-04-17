angular.module('main.controllers')
    .controller('HomeCtrl', ['$scope', 'LcComms',
        function ($scope, LcComms) {
            var cst;
            $scope.settings = {
                loading: true
            };
            $scope.selection = {
                schema: {
                    champ: "MonkeyKing",
                    expanded: false,
                },
                model: {
                    blue: [],
                    red: []
                },
                get_ready: function () {
                    for(var i=0; i<5; ++i)
                        this.model.blue.push(angular.copy(this.schema));
                    for(var i=0; i<5; ++i)
                        this.model.red.push(angular.copy(this.schema));

                    return;
                }
            };

            LcComms.is_ready().then(function (data) {
                cst = data;
                initialize();
            })
            .finally(function () {
                $scope.settings.loading = false;
            });
            
            var initialize = function () {
                $scope.selection.get_ready();
            };

        }]);