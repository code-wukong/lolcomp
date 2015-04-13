angular.module('internal.controllers')
    .controller('ChampsCtrl', ['$scope', 'LcComms', 'LcConfig',
        function ($scope, LcComms, LcConfig) {
            var cst;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                initialize();
            });
            
            var action_get_latest_patch = function () {
                console.log("Checking for new patch ...");
                // get the latest patch from Riot API
                var post = {
                    url: "static_data",
                    params: {}
                }
                LcComms.send_request("ws/riot_api_request", post)
                .then(function (r) {
                    $scope.panels.info.latest_patch = r.data.version;
                    LcConfig.set('latest_patch', r.data.version);
                    console.log(".. Finished");
                })
            }

            var action_update_champs = function () {
                console.log('Installing the latest patch to lolcomp ...');
                // Get static champion data
                LcComms.send_request("ws/update_champs_data")
                    .then(function (data) {
                        var time = new Date();
                        $scope.panels.info.current_patch = data.patch;
                        $scope.panels.info.time_last_updated = time;
                        $scope.panels.analyze_champs.status = false;
                        LcConfig.set("current_patch", data.patch);
                        LcConfig.set("time_last_updated", time);
                        LcConfig.set("has_been_analyzed", false);
                        console.log(".. Finished");
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
                        // apply rules and get all tags for this skill
                
                
                /*** Apply Relation Rules ***/
                // clear all relations in db
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
                        execute: action_get_latest_patch,
                        current_patch: LcConfig.get("current_patch"),
                        latest_patch: LcConfig.get("latest_patch"),
                        time_last_updated: LcConfig.get("time_last_updated"),
                        time_last_analyzed: new Date(),
                    },
                    update_champs: {
                        title: "Update Champion Static Data",
                        status: function () {
                            return ($scope.panels.info.current_patch === $scope.panels.info.latest_patch);
                        },
                        execute: action_update_champs
                    },
                    analyze_champs: {
                        title: "Analyze Champion Static Data",
                        status: LcConfig.get("has_been_analyzed"),
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