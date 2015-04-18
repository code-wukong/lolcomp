angular.module("main.services")
    .factory("LcCache", ["LcComms", '$q',
        function (LcComms, $q) {
            var cache = {};
            
            var LcCache = {
                get: function (name) {
                    var deferred = $q.defer()
                    
                    if(angular.isUndefined(cache[name]) === true){
                        // cache miss
                        LcComms.send_request("ws/get_champs_data", {"champs": [name]})
                            .then(function (response) {
                                cache[name] = response.data[0];
                                deferred.resolve(cache[name]);
                            })
                    }else{
                        // cache hit
                        deferred.resolve(cache[name]);
                    }
                        
                    return deferred.promise;
                },
                try: function (name) {
                    return cache[name];
                }
            };

            return LcCache;

        }]);