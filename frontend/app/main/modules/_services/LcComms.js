angular.module("main.services")
    .factory("LcComms", ["$http", '$q',
        function ($http, $q) {
            var promise_ready;
            
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

                    promise_ready = deferred.promise;
                    return promise_ready;
                }, 
                is_ready: function () {
                    return promise_ready;
                }
                
            };

            return LcComms;

        }]);