angular.module('main.controllers')
    .controller('HomeCtrl', ['$scope', 'LcComms', 'LcAlerts',
        function ($scope, LcComms, LcAlerts) {
            var cst;
            $scope.settings = {
                loading: true
            };
            $scope.selection = {
                schema: {
                    key: "",
                    name: "",
                    expanded: false,
                },
                model: {
                    blue: [],
                    red: []
                },
                add: function (side, obj) {
                    if(angular.isDefined(obj) !== true) return;
                    
                    var index = -1;
                    for(var i=0; i<5; ++i) {
                        if(this.model[side][i].key !== ''){
                            continue;
                        }else{
                            index = i;
                            break;
                        }
                    }
                    if(index === -1){
                        LcAlerts.error('Cannot find empty spot');
                    }
                    
                    var schema = angular.copy(this.schema);
                    schema.key = obj.key;
                    schema.name = cst.static_data.data[obj.key].name;

                    this.model[side][index] = schema;
                },
                remove: function (side, index) {
                    $scope.selection.model[side][index] = angular.copy($scope.selection.schema);
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