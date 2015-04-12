angular.module("internal.services")
    .factory("LcComms", ["$http", '$q',
        function ($http, $q) {
            var constants;
            var deferred = $q.defer();
            
            var LcComms = {
                send_request: function (ws_url, post) {
                    var deferred = $q.defer();

                    $http({
                        url: ws_url,
                        method: "POST",
                        data: post,
                    })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    })

                    return deferred.promise;
                },
                write_constants: function (data) {
                    constants = data;
                },
                read_constants: function () {
                    return constants;
                },
                is_ready: function (set) {
                    if(set && set === true)
                        deferred.resolve();
                    
                    return deferred.promise;
                }
            };

            return LcComms;

        }]);