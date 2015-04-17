angular.module("main.directives")
    .factory("lcChampionRowLinkFn", ["LcComms",
        function (LcComms) {
            return function (scope, elem, attrs) {
                scope.get_pos = function (i, n) {
                    if (scope.lcSide === 'blue') return i;
                    
                    var right_side = n + 1
                    return -i + right_side;
                };

                LcComms.is_ready().then(function (data) {
                    if(angular.isUndefined(scope.lcModel) === false){
                        initialize();
                        scope.report = {
                            model: data.lolcomp_report,
                            get_section: function (champ1, champ2, type) {
                                var rel_list = this.model[champ1][type][champ2];
                                return rel_list;
                            }
                        }
                    }
                });
                
                var initialize = function () {
                    scope.settings = {
                        selected: 0,
                        my_team: (scope.lcSide==='blue' ? scope.lcTeams.blue : scope.lcTeams.red),
                        enemy_team: (scope.lcSide==='blue' ? scope.lcTeams.red : scope.lcTeams.blue),
                    };
                    scope.spells = ['Passive', 'Q', 'W', 'E', 'R'];
                    scope.images_url = {
                        champ: function () {
                            if(scope.lcModel.key === '')
                                return ''
                            else
                                return 'url('+scope.lcStatic.ddragon_url('loading', scope.lcModel)+')'
                        },
                        spell: function (spell) {
                            if(scope.lcModel.key === '')
                                return ''
                            else
                                return 'url('+scope.lcStatic.ddragon_url('spell', {key:scope.lcModel.key,spell:spell})+')'
                        }
                    };
                    scope.toggle_expand = function (type) {
                        if(scope.lcModel.key === '') return;
                        
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
                }
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
                    lcTeams: "=",
                    lcRemove: "=",
                    lcIndex: "="
                },
                link: lcChampionRowLinkFn
            };
        }]);