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
                        if(info.key === "") return false;
                        
                        var api_url, extension, full_filename;
                        var show_version = true;
                        var show_skin = false;
                        switch (api) {
                            case "square":
                                api_url = "champion/";
                                extension = ".png";
                                if(info.key === "MonkeyKing")
                                    return cst.static_url + '/static/img/CodeMonkeyKing.jpg';
                                break;
                            case "loading":
                                api_url = "champion/loading/";
                                extension = ".jpg"
                                show_version = false;
                                show_skin = true;
                                info.skin = 0;
                                if(info.key === "MonkeyKing"){
                                    info.skin = 2;
                                }
                                break;
                            case "spell":
                                var static_info = cst.static_data.data[info.key];
                                var api_url = "spell/";
                                var index;
                                switch(info.spell){
                                    case 'Q': // Q
                                        index = 0; break;
                                    case 'W': // W
                                        index = 1; break;
                                    case 'E': // E
                                        index = 2; break;
                                    case 'R': // R
                                        index = 3; break;
                                    case 'Passive': // Passive
                                        api_url = "passive/";
                                        break;
                                }
                                full_filename = (index > -1 ? static_info.spells[index].image.full : static_info.passive.image.full);
                                extension = "";
                                break;
                            default:
                                console.log("incorrect ddragon api")
                        }
                        var url = "http://ddragon.leagueoflegends.com/cdn/" 
                                 + (show_version ? cst.static_data.version+'/' : '')
                                 + "img/"
                                 + api_url
                                 + (full_filename ? full_filename : info.key)
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