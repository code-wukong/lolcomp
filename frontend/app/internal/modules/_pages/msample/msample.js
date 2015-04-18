angular.module('internal.controllers')
    .controller('MsampleCtrl', ['$scope', 'LcComms', 'LcConfig', 'LcAlerts',
        function ($scope, LcComms, LcConfig, LcAlerts) {
            var cst;
            LcComms.is_ready().then(function () {
                cst = LcComms.read_constants();
                
                $scope.settings = {
                    date: "",
                };
                
                var validate_match_id = function (val) {
                    if(angular.isNumber(val) === true){
                        return true;
                    }else{
                        return false;
                    }
                };
                
                $scope.new_sample = function () {
                    if($scope.settings.date === '') {
                        LcAlerts.error("missing date");
                    }
                    var post = {
                        url: "api_challenge",
                        params: {
                            beginDate: $scope.settings.date.getTime()/1000
                        }
                    }
                    LcComms.send_request('ws/riot_api_request', post)
                        .then(function (response) {
                            if(response.status !== 200){
                                LcAlerts.error("there was an error "+response.status)
                                console.log(response);
                                return;
                            }
                            $scope.temp = response.data;
                        
                            var post = {
                                label: "urf_matches",
                                mode: "read"
                            }
                            return LcComms.send_request("ws/rw_static_def", post);
                        })
                        .then(function (data) {
                            var singleton, urf_match_records;
                            if(angular.equals({}, data) === true){
                                singleton = {
                                    urf_match_records: $scope.temp
                                }
                            }else{
                                $scope.num_entries = 0;
                                urf_match_records = data.urf_match_records;
                                for(var i=0; i<$scope.temp.length; ++i){
                                    urf_match_records.push($scope.temp[i]);
                                    $scope.num_entries += 1;
                                }
                                singleton = {
                                    urf_match_records: urf_match_records
                                }
                            }
                            
                            $scope.data = singleton;
                            console.log(singleton);
                            
                            var post = {
                                label: "urf_matches",
                                mode: "write",
                                data: singleton
                            }
                            return LcComms.send_request("ws/rw_static_def", post);
                        }).then(function () {
                            LcAlerts.success("wrote to "+$scope.num_entries+" matches to db");
                        });
                };
                
            });
            
            
        }]);