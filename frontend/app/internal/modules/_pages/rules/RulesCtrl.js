angular.module('internal.controllers')
    .controller('RulesCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst;
            var rule_schema = {
                label: "label",
                description: "description",
                color: "27586B",
                key_words: "reduces, physical",
            }
            
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });

            var initialize = function () {
                
                $scope.panels = {
                    rules: {
                        title: "",
                        selected: null,
                        edit_model: angular.copy(rule_schema),
                        model: LcConfig.get("rule_definitions") || [],
                        add_rule: function () {
                            this.model.push(angular.copy(rule_schema))
                        },
                        delete_rule: function (index) {
                            if(index !== this.selected){
                                this.selected = null;
                            }else{
                                this.model.splice(index, 1);
                            }
                        },
                        save_changes: function (index) {
                            this.model[index] = angular.copy(this.edit_model);
                            this.selected = null;
                            
                            LcConfig.set("rule_definitions", this.model);
                        },
                        select_rule: function (index) {
                            this.selected = index;
                            this.old_model = angular.copy(this.model[index]);
                            this.edit_model = angular.copy(this.model[index]);
                        },
                        cancel_changes: function (index) {
                            this.model[index] = this.old_model;
                            this.selected = null;
                        }
                    }
                }
                
            };

        }]);