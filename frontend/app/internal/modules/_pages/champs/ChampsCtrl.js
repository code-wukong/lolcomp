angular.module('internal.controllers')
    .controller('ChampsCtrl', ['$scope', 'LcComms', 'LcConfig', '$timeout',
        function ($scope, LcComms, LcConfig, $timeout) {
            var cst, notice_delay;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                notice_delay = 2000;
                initialize();
            });
            
            var action_get_latest_patch = function () {
                console.log("Checking for new patch ...");
                $scope.panels.info.loading = true;
                // get the latest patch from Riot API
                var post = {
                    url: "static_data",
                    params: {}
                }
                LcComms.send_request("ws/riot_api_request", post)
                    .then(function (r) {
                        if(r.status === 200){
                            $scope.panels.info.latest_patch = r.data.version;
                            LcConfig.set('latest_patch', r.data.version);

                            if($scope.panels.update_champs.status() === false){
                                LcConfig.set("analysis_outdated", true);
                                $scope.panels.analyze_champs.outdated = true;
                                $scope.panels.analyze_champs.msg = "Warning - new data must be analyzed";
                                $scope.panels.update_champs.msg = "Warning - the latest patch needs to be installed"
                            }
                        }else{
                            console.log(r.data.status);
                        }

                        console.log(".. Finished");
                        $scope.panels.info.btn_txt = "Success"
                        $timeout(function () {
                            $scope.panels.info.btn_txt = "Check for New Patch"
                        }, notice_delay);
                    })
                    .catch(function (data) {
                        console.log(data, "error");
                    })
                    .finally(function () {
                        $scope.panels.info.loading = false;
                    });
            }

            var action_update_champs = function () {
                console.log('Installing the latest patch to lolcomp ...');
                $scope.panels.update_champs.loading = true;
                // Get static champion data
                var post = {
                    params: [412, 62, 157]
                };
                LcComms.send_request("ws/update_champs_data", post)
                    .then(function (data) {
                        if(data.status === 200){
                            var time = new Date();
                            $scope.panels.info.current_patch = data.patch;
                            $scope.panels.info.time_last_updated = time;
                            $scope.panels.analyze_champs.status = false;
                            $scope.panels.analyze_champs.msg = "Critical - the current dataset needs to be analyzed";
                            $scope.panels.update_champs.msg = "Good";
                            LcConfig.set("current_patch", data.patch);
                            LcConfig.set("time_last_updated", time);
                            LcConfig.set("has_been_analyzed", false);
                            console.log(".. Finished")
                            $scope.panels.update_champs.btn_txt = "Success"
                            $timeout(function () {
                                $scope.panels.update_champs.btn_txt = "Update"
                            }, notice_delay);
                        }else{
                            $scope.panels.update_champs.msg = "There was an error";
                            console.log(data, " .. Request Error !!")
                        };
                    })
                    .catch(function (data) {
                        console.log(data, "error");
                    })
                    .finally(function () {
                        $scope.panels.update_champs.loading = false;
                    });
            };
            
            var action_analyze_champs = function () {
                console.log("Analyzing ...");
                $scope.panels.analyze_champs.loading = true;
                LcComms.send_request("ws/apply_rules_to_db")
                    .then(function (data) {
                        if(data.status === 200){
                            var date = new Date();
                            LcConfig.set("has_been_analyzed", true);
                            LcConfig.set("analysis_new_rules", false);
                            LcConfig.set("analysis_outdated", false);
                            LcConfig.set("time_last_analyzed", date);
                            $scope.panels.analyze_champs.status = true;
                            $scope.panels.analyze_champs.new_rules_avail = false;
                            $scope.panels.analyze_champs.outdated = false;
                            $scope.panels.analyze_champs.msg = "Good";
                            $scope.panels.info.time_last_analyzed = date;
                            console.log(".. Finished");
                            $scope.panels.analyze_champs.btn_txt = "Success"
                            $timeout(function () {
                                $scope.panels.analyze_champs.btn_txt = "Analyze"
                            }, notice_delay);
                        } else if (data.status === "fail") {
                            console.log(".. Status: Failed")
                        } else {
                            console.log(".. Request Error !!")
                        }
                    })
                    .catch(function (data) {
                        console.log(data, "Error")
                    })
                    .finally(function () {
                        $scope.panels.analyze_champs.loading = false;
                    });

            };
            
            var initialize = function () {

                $scope.panels = {
                    info: {
                        title: "Information",
                        msg: "",
                        status: function () {
                            var cond = true;
                            cond = cond && $scope.panels.analyze_champs.status;
                            if(cond === false)
                                this.msg = "Lolcomp needs to build champ relation maps"
                            
                            cond = cond && $scope.panels.update_champs.status();
                            if($scope.panels.update_champs.status() === false)
                                this.msg = "Lolcomp needs to be updated to Patch " + $scope.panels.info.latest_patch
                            
                            
                            if(cond === true)
                                this.msg = "No Issues"    
                        
                            return cond;
                        },
                        execute: action_get_latest_patch,
                        current_patch: LcConfig.get("current_patch"),
                        latest_patch: LcConfig.get("latest_patch"),
                        time_last_updated: LcConfig.get("time_last_updated"),
                        time_last_analyzed: LcConfig.get("time_last_analyzed"),
                        btn_txt: "Check for New Patch",
                        loading: false
                    },
                    update_champs: {
                        title: "Update Champion Static Data",
                        msg: "Good",
                        status: function () {
                            return (($scope.panels.info.current_patch || false) === $scope.panels.info.latest_patch);
                        },
                        execute: action_update_champs,
                        btn_txt: "Update",
                        loading: false
                    },
                    analyze_champs: {
                        title: "Analyze Champion Static Data",
                        msg: "Good",
                        status: LcConfig.get("has_been_analyzed") || false,
                        outdated: LcConfig.get("analysis_outdated"),
                        new_rules_avail: LcConfig.get("analysis_new_rules"),
                        btn_txt: "Analyze",
                        execute: action_analyze_champs,
                        loading: false
                    }
                }
                if($scope.panels.update_champs.status() === false){
                    $scope.panels.update_champs.msg = "Warning - the latest patch needs to be installed";
                }
                if($scope.panels.analyze_champs.new_rules_avail === true){
                    $scope.panels.analyze_champs.msg = "New Rules Available";
                }
                if($scope.panels.update_champs.status() === false){
                    $scope.panels.analyze_champs.msg = "Warning - new data must be analyzed";
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