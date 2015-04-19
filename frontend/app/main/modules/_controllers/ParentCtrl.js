angular.module('main.controllers')
    .controller('ParentCtrl', ['$scope', 'LcComms', '$location',
        function ($scope, LcComms, $location) {
            var cst;
            
            LcComms.send_request("ws/cst_main", {"test": null})
                .then(function (data) {
                    cst = data;
                    console.log(cst);
                    initialize();
                })
                .catch(function (data) {
                    console.log(data, "catch")
                })
                
            var initialize = function () {
                $scope.static = {
                    get_url: function (resource) {
                        return cst.static_url + '/static/' + resource;
                    },
                    get_year: function () {
                        var date = new Date();
                        return date.getFullYear();
                    },
                    ddragon: function (api, filename) {
                        var api_url, show_version;
                        switch (api) {
                            case "loading":
                                var extension = ".jpg";
                                api_url = "champion/loading/";
                                var parts = filename.split('.');
                                if(parts[0] === "MonkeyKing")
                                    filename = parts[0]+"_2"+extension;
                                else
                                    filename = parts[0]+"_0"+extension;
                                show_version = false;
                                break;
                            case "spell":
                                var api_url = "spell/";
                                show_version = true;
                                break;
                            case "passive":
                                var api_url = "passive/";
                                show_version = true;
                                break;
                        }
                        var url = "https://ddragon.leagueoflegends.com/cdn/" 
                                 + (show_version ? cst.version+'/' : '')
                                 + "img/"
                                 + api_url
                                 + filename
                        return url;
                    },
                    
                };
                $scope.navbar = {
                    model: [{
                        text: "Home",
                        url: "/"
                    }, {
                        text: "About",
                        url: "/about"
                    }],
                    go_to: function (url) {
                        $location.path(url);
                    }
                }
            }

        }]);