angular.module("internal.services")
    .factory("LcConfig", ["LcComms", '$q',
        function (LcComms, $q) {
            var config = {}
            
            var LcConfig = {
                get: function (label) {
                    return (config[label] || "LcConfig - Error");
                },
                set: function (label, data) {
                    config[label] = data;
                },
                initialize: function () {
                    var deferred = $q.defer();
                    
                    LcComms.send_request("ws/get_installed_patch")
                        // get patch that Lolcomp is on
                        .then(function (data) {
                            config['current_patch'] = data.version;
                            
                            var post = {
                                url: "static_data",
                                params: {
                                }
                            }
                            return LcComms.send_request("ws/riot_api_request", post)
                        })
                        // get the latest patch from Riot API
                        .then(function (r) {
                            config['latest_patch'] = r.data.version;
                        
                            deferred.resolve();
                        })
                    
                    return deferred.promise;
                }
            };

            return LcConfig;

        }]);