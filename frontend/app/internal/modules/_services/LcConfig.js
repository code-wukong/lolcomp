angular.module("internal.services")
    .factory("LcConfig", ["LcComms", '$q',
        function (LcComms, $q) {
            var config = {}
            
            var LcConfig = {
                get: function (label) {
                    return config[label];
                },
                set: function (label, data) {
                    config[label] = data;
                    var post = {
                        label: "config",
                        mode: "write",
                        data: config
                    }
                    LcComms.send_request("ws/rw_static_def", post)
                },
                initialize: function () {
                    var deferred = $q.defer();
                    
                    var post = {
                        label: "config",
                        mode: "read"
                    }
                    LcComms.send_request("ws/rw_static_def", post)
                        // load config from server
                        .then(function (data) {
                            config = data;

                            var post = {
                                url: "static_data",
                                params: {}
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