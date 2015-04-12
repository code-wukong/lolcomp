angular.module('internal.controllers')
    .controller('ChampsCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });

            var action_update_champs = function () {
                // Get static champion data
                var post = {
                }
                LcComms.send_request("ws/update_static_data", post)
                    .then(function (data) {
                        $scope.panels.info.current_patch = data.patch;
                    })
                    .catch(function (data) {
                        console.log(data, "error");
                    });
            };
            
            var action_analyze_champs = function () {
                console.log("Analyzing ...");
                /*** Apply Tag Rules ***/
                // foreach champ
                    // foreach skill
                        // apply rules and get all tags for this skilll
                
                
                /*** Apply Relation Rules ***/
                // clear all relations
                // foreach rule in exception_rules
                    // record new relation(k1, k2, def) to db
                //
                // foreach rule in relation_rules
                    // case 1: k1=skill to k2=skill
                    // case 2: k1=skill to k2=tag
                    // case 3: k1=tag   to k2=skill
                    // case 4: k1=tag   to k2=tag
                
                /*** Build Relation maps ***/
                // foreach champ
                    // get all relations involved in
                    // build_relation_map(all_relations)
                    // record updated champ to db
            };
            
            var initialize = function () {

                $scope.panels = {
                    info: {
                        title: "Information",
                        status: function () {
                            return (this.current_patch === this.latest_patch);
                        },
                        current_patch: LcConfig.get("current_patch"),
                        latest_patch: LcConfig.get("latest_patch"),
                        time_last_updated: new Date(),
                        time_last_analyzed: new Date(),
                    },
                    update_champs: {
                        title: "Update Champion Static Data",
                        status: true,
                        execute: action_update_champs
                    },
                    analyze_champs: {
                        title: "Analyze Champion Static Data",
                        status: true,
                        execute: action_analyze_champs
                    }
                }

                $scope._helpers = {
                    format_date: function (date) {
                        var obj = new Date(date);
                        if (obj.toString() === 'Invalid Date')
                            return '';
                        else
                            return obj.toLocaleString();
                    }
                }
                

            };

        }]);