angular.module('internal.controllers')
    .controller('RelationsCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst;
            var relation_schema = {
                label: "Combo",
                description: "%label% %k1% into %k2%",
                k1: "Lee Sin, Q",
                k2: "Yasuo, R",
            }
            
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });

            var initialize = function () {
                
                $scope.panels = {
                    relations: {
                        title: "Relations",
                        selected: null,
                        edit_model: angular.copy(relation_schema),
                        model: LcConfig.get("relation_definitions") || [],
                        add_relation: function () {
                            this.model.push(angular.copy(relation_schema))
                        },
                        delete_relation: function (index) {
                            if(index !== this.selected){
                                this.selected = null;
                            }else{
                                this.model.splice(index, 1);
                            }
                        },
                        save_changes: function (index) {
                            this.model[index] = angular.copy(this.edit_model);
                            this.selected = null;
                            
                            LcConfig.set("relation_definitions", this.model);
                        },
                        select_relation: function (index) {
                            this.selected = index;
                            this.old_model = angular.copy(this.model[index]);
                            this.edit_model = angular.copy(this.model[index]);
                        },
                        cancel_changes: function (index) {
                            this.model[index] = this.old_model;
                            this.selected = null;
                        },
                        clear_relations: function () {
                            this.model = [];
                            $scope.$apply();
                            
                            LcConfig.set("relation_definitions", []);
                        }
                    }
                }
                
            };

        }]);