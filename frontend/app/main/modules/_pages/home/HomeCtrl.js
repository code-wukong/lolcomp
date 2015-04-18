angular.module('main.controllers')
    .controller('HomeCtrl', ['$scope', 'LcComms', 'LcAlerts',
        function ($scope, LcComms, LcAlerts) {
            var cst;
            LcComms.is_ready().then(function (data) {
                $scope.selection.get_ready();
            });
            
            $scope.settings = {
                loading: true
            };
            $scope.selection = {
                schema: {
                    name: "",
                    expanded: false,
                },
                model: {
                    blue: [],
                    red: []
                },
                add: function (side, name) {
                    if (angular.isDefined(name) !== true)
                        return;

                    var index = -1;
                    for (var i = 0; i < 5; ++i) {
                        if (this.model[side][i].name !== '') {
                            continue;
                        } else {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        LcAlerts.error('Cannot find empty spot');
                    }

                    var schema = angular.copy(this.schema);
                    schema.name = name;

                    this.model[side][index] = schema;
                },
                remove: function (side, index) {
                    $scope.selection.model[side][index] = angular.copy($scope.selection.schema);
                },
                get_ready: function () {
                    for (var i = 0; i < 5; ++i)
                        this.model.blue.push(angular.copy(this.schema));
                    for (var i = 0; i < 5; ++i)
                        this.model.red.push(angular.copy(this.schema));
                    
                    $scope.settings.loading = false;
                    return;
                }
            };

        }]);