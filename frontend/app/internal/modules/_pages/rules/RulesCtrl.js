angular.module('internal.controllers')
    .controller('RulesCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst;
            var rule_schema = {
                label: "Knockup",
                color: "27586B",
                key_words: "knock AND enem",
                exceptions: ""
            };

            LcComms.is_ready()
                .then(function () {
                    cst = LcComms.read_constants();
                });
            LcComms.send_request("ws/rw_static_def", {label: "tag_defs", mode: "read"})
                .then(function (data) {
                    initialize();
                    if (angular.isArray(data) === true) {
                        $scope.panels.rules.model = data;
                    }
                })

            var initialize = function () {

                $scope.panels = {
                    rules: {
                        title: "Rules",
                        selected: null,
                        edit_model: angular.copy(rule_schema),
                        model: [],
                        save_to_db: function () {
                            var post = {
                                label: "tag_defs",
                                mode: "write",
                                data: this.model
                            };
                            LcComms.send_request("ws/rw_static_def", post);
                            LcConfig.set("analysis_new_rules", true);
                        },
                        add_rule: function () {
                            this.model.push(angular.copy(rule_schema))
                        },
                        delete_rule: function (index) {
                            if (index !== this.selected && this.selected !== null) {
                                this.selected = null;
                            } else {
                                this.model.splice(index, 1);
                            }

                            this.save_to_db();
                        },
                        save_changes: function (index) {
                            this.model[index] = angular.copy(this.edit_model);
                            this.selected = null;

                            this.save_to_db();
                        },
                        select_rule: function (index) {
                            this.selected = index;
                            this.old_model = angular.copy(this.model[index]);
                            this.edit_model = angular.copy(this.model[index]);
                        },
                        cancel_changes: function (index) {
                            this.model[index] = this.old_model;
                            this.selected = null;
                        },
                        clear_rules: function () {
                            this.model = [];

                            this.save_to_db();
                        }
                    }
                }

            };

        }]);