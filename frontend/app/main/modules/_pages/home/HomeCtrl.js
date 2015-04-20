angular.module('main.controllers')
    .controller('HomeCtrl', ['$scope', 'LcComms', 'LcAlerts', 'LcCache', '$rootScope',
        function ($scope, LcComms, LcAlerts, LcCache, $rootScope) {
            var cst;
            LcComms.is_ready().then(function (data) {
                $scope.selection.get_ready();
            });
            var safe_apply = function (fn) {
                // Adapted from: https://coderwall.com/p/ngisma/safe-apply-in-angular-js
                var phase = $rootScope.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof (fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
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

                    var info = {
                        index: index,
                        name: name,
                        side: side
                    };
                    safe_apply(function () {
                        $rootScope.$broadcast('lc-champ-row-loading', info);
                    });
                    LcCache.get(name).then(safe_apply(function (data) {
                        $rootScope.$broadcast('lc-champ-row-loading', info);
                    }));
                    
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