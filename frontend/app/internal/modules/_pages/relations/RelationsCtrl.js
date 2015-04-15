angular.module('internal.controllers')
    .controller('RelationsCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst, relation_schema;

            LcComms.is_ready()
                .then(function () {
                    cst = LcComms.read_constants();
                    relation_schema = {
                        label: "Combo",
                        description: "%label% %k1% into %k2%",
                        type: cst.type.synergy,
                        k1: {
                            obj_type: "tag",
                            data: null
                        },
                        k2: {
                            obj_type: "exception",
                            data: null
                        },
                    };
                
                });
            LcComms.send_request("ws/rw_static_def", {label: "relation_defs", mode: "read"})
                .then(function (data) {
                    initialize();
                    if (angular.isArray(data) === true) {
                        $scope.panels.relations.model = data;
                    }
                })

            var initialize = function () {
                
                $scope.panels = {
                    relations: {
                        title: "Relations",
                        selected: null,
                        edit_model: angular.copy(relation_schema),
                        model: [],
                        save_to_db: function () {
                            var post = {
                                label: "relation_defs",
                                mode: "write",
                                data: this.model
                            };
                            LcComms.send_request("ws/rw_static_def", post);
                            LcConfig.set("analysis_new_rules", true);
                        },
                        add_relation: function () {
                            this.model.push(angular.copy(relation_schema))
                        },
                        delete_relation: function (index) {
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

                            this.save_to_db();
                        }
                    }
                }

            };

        }]);