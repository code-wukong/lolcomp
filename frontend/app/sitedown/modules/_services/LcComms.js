angular.module("sitedown.services")
    .factory("LcComms", ["$http", '$q',
        function ($http, $q) {
            var LcComms = {
                call_ws: function (ws_url, post) {
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
                }
            };

            return LcComms;

        }]);