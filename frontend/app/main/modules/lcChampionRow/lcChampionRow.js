angular.module("main.directives")
    .factory("lcChampionRowLinkFn", ["LcComms", "$window",
        function (LcComms, $window) {
            return function (scope, elem, attrs) {
                var get_pos = function (i, n) {
                    if (scope.lcSide === 'blue') return i;
                    
                    var right_side = n + 1
                    return -i + right_side;
                };

                LcComms.is_ready().then(function () {
                    scope.settings = {
                        champ_obj: scope.lcModel,
                        selected: -1,
                        position: {
                            img: get_pos(1, 3),
                            synergy: get_pos(2, 3),
                            counter: get_pos(3, 3),
                        },
                        url: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/MonkeyKing_2.jpg",
                    };
                    scope.text = {
                        synergy: "Synergy",
                        counter: "Counters"
                    };
                    scope.toggle_expand = function (type) {
                        
                        if(scope.lcModel.expanded === true){
                            if(type !== scope.settings.selected){
                                scope.settings.selected = type;
                            }else{
                                scope.lcModel.expanded = false;
                            }
                        }else{
                            scope.lcModel.expanded = true;
                            scope.settings.selected = type;
                        }
                        
                        if(scope.lcModel.expanded === false){
                            scope.settings.selected = 0;
                        }else{
                            angular.element(elem.children()[1].children[1])[0].scrollTop = 0;
                        }
                    };
                });
            };
        }])
    .directive("lcChampionRow", ["lcChampionRowLinkFn",
        function (lcChampionRowLinkFn) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "lcChampionRow/lcChampionRow.html",
                scope: {
                    lcSide: "@",
                    lcModel: "=",
                    lcStatic: "=",
                    lcEnemies: "="
                },
                link: lcChampionRowLinkFn
            };
        }]);