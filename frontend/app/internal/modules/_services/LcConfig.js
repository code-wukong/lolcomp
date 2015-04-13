angular.module("internal.services")
    .factory("LcConfig", ["LcComms", '$q',
        function (LcComms, $q) {
            var config = {};
            var ready_promise;
            
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
                    ready_promise = deferred.promise;
                    
                    var post = {
                        label: "config",
                        mode: "read"
                    }
                    LcComms.send_request("ws/rw_static_def", post)
                        // load config from server
                        .then(function (data) {
                            config = data;
                            deferred.resolve();
                        })
                        
                    return deferred.promise;
                },
                is_ready: function () {
                    return ready_promise;
                }
            };

            return LcConfig;

        }]);