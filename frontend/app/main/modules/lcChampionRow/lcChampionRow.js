angular.module("main.directives")
    .factory("lcChampionRowLinkFn", ["LcComms",
        function (LcComms) {
            return function (scope, elem, attrs) {
                scope.get_pos = function (i, n) {
                    if (scope.lcSide === 'blue') return i;
                    
                    var right_side = n + 1
                    return -i + right_side;
                };
                           
            LcComms.call_ws("ws/cst_main", {"test": null})
                .then(function (data) {
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
                        spell: function (spell, strip) {
                            if(scope.lcModel.key === '')
                                return ''
                            else{
                                return 'url('+scope.lcStatic.ddragon_url('spell', {key:scope.lcModel.key,spell:spell})+')';
                            }
                        },
                    };
                    scope.create_spell_img = function (k_obj) {
                        var name, url, element;
                        if(k_obj.name === "Wukong")
                            name = "MonkeyKing";
                        else
                            name = k_obj.name
                        
                        url = scope.lcStatic.ddragon_url('spell', {key:name,spell:k_obj.key});
                        element = "<img class='lc-skill-img' src='"+url+"' title='"+k_obj.key+"'></img>";
                        
                        return element;
                    };
                    scope.create_relation_elem = function (rel_obj) {
                        var img_k1 = scope.create_spell_img(rel_obj.k1);
                        var img_k2 = scope.create_spell_img(rel_obj.k2);
                        
                        var element = angular.copy(rel_obj.description);
                        element = element.replace('%label%', rel_obj.label);
                        element = element.replace('%k1%', img_k1);
                        element = element.replace('%k2%', img_k2);

                        return element;
                    }
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