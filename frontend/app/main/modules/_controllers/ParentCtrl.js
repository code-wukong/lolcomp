angular.module('main.controllers')
    .controller('ParentCtrl', ['$scope', 'LcComms',
        function ($scope, LcComms) {
            var cst;
            
            LcComms.call_ws("ws/cst_main", {"test": null})
                .then(function (data) {
                    cst = $scope.cst = data;
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
                    ddragon_url: function (api, info) {
                        var api_url, extension;
                        var show_version = true;
                        var show_skin = false;
                        switch (api) {
                            case "square":
                                api_url = "champion/";
                                extension = ".png";
                                if(info.champ === "MonkeyKing")
                                    return cst.static_url + '/static/img/CodeMonkeyKing.jpg';
                                break;
                            case "loading":
                                api_url = "champion/loading/";
                                extension = ".jpg"
                                show_version = false;
                                if(info.champ === "MonkeyKing")
                                    info.skin = 2;
                                    show_skin = true;
                                break;
                            case "spell":
                                api_url = "spell/";
                                extension = ".png";
                                break;
                            default:
                                console.log("incorrect ddragon api")
                        }
                        var url = "http://ddragon.leagueoflegends.com/cdn/" 
                                 + (show_version ? cst.static_data.version+'/' : '')
                                 + "img/"
                                 + api_url
                                 + info.champ
                                 + (show_skin ? '_'+info.skin : '')
                                 + extension
                        return url;
                    }
                };
                $scope.navbar = {
                    model: [{
                        text: "Home",
                        url: "/"
                    }, {
                        text: "About",
                        url: "/about"
                    }]
                }
            }

        }]);