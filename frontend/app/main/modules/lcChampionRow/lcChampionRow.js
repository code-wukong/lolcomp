angular.module("main.directives")
    .factory("lcChampionRowLinkFn", ["LcComms", "LcCache",
        function (LcComms, LcCache) {
            return function (scope, elem, attrs) {
                var cst;
                LcComms.is_ready().then(function (data) {
                    cst = data;
                })

                // model data
                scope.settings = {
                    selected: 0,
                    synergy: null,
                    counter: null,
                    background_urls: null,
                    my_team: (scope.lcSide === 'blue' ? scope.lcTeams.blue : scope.lcTeams.red),
                    enemy_team: (scope.lcSide === 'blue' ? scope.lcTeams.red : scope.lcTeams.blue),
                };
                if (scope.lcModel.name !== '') {
                    LcCache.get(scope.lcModel.name)
                        .then(function (data) {
                            var static = data.Static;
                            var get_url = function (api, filename) {
                                var url = scope.lcStatic.ddragon(api, filename);
                                return 'url("' + url + '")';
                            };

                            scope.settings.synergy = data.Synergy;
                            scope.settings.counter = data.Counter;
                            scope.settings.background_urls = {
                                champ: get_url("loading", static.image.full),
                                Q: get_url("spell", static.spells[0].image.full),
                                W: get_url("spell", static.spells[1].image.full),
                                E: get_url("spell", static.spells[2].image.full),
                                R: get_url("spell", static.spells[3].image.full),
                                Passive: get_url("passive", static.passive.image.full)
                            }
                        })
                }

                // helpers
                scope.spells = ['Passive', 'Q', 'W', 'E', 'R'];
                scope.get_pos = function (i, n) {
                    if (scope.lcSide === 'blue')
                        return i;

                    var right_side = n + 1
                    return -i + right_side;
                };

                // resources
                scope.background_url = {
                    champ: function () {
                        if (scope.lcModel.name === '') {
                            return ''
                        } else {
                            var params = {
                                key: 'MonkeyKing'
                            }
                            console.log('url(' + scope.lcStatic.ddragon_url('loading', params) + ')')
                            return 'url(' + scope.lcStatic.ddragon_url('loading', params) + ')'
                        }
                    }
                }
                scope.create_spell_img = function (k_obj) {
                    var name, url, element, i;
                    if (k_obj.name === "Wukong")
                        name = "MonkeyKing";
                    else
                        name = k_obj.name

                    var mapping = {
                        'Q': 0,
                        'W': 1,
                        'E': 2,
                        'R': 3,
                    };
                    var static = LcCache.try(k_obj.name).Static;
                    if(k_obj.key == "Passive")
                        url = scope.lcStatic.ddragon('spell', static.passive.image.full);
                    else
                        url = scope.lcStatic.ddragon('spell', static.spells[mapping[k_obj.key]].image.full);

                    element = "<img class='lc-skill-img' src='" + url + "' title='" + k_obj.key + "'></img>";
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
                    if (scope.lcModel.key === '')
                        return;

                    if (scope.lcModel.expanded === true) {
                        if (type !== scope.settings.selected) {
                            scope.settings.selected = type;
                        } else {
                            scope.lcModel.expanded = false;
                        }
                    } else {
                        scope.lcModel.expanded = true;
                        scope.settings.selected = type;
                    }

                    if (scope.lcModel.expanded === false) {
                        scope.settings.selected = 0;
                    } else {
                        angular.element(elem.children()[1].children[1])[0].scrollTop = 0;
                    }
                };
//                var initialize = function () {
//                    scope.images_url = {
//                        champ: function () {
//                            if (scope.lcModel.key === '')
//                                return ''
//                            else
//                                return 'url(' + scope.lcStatic.ddragon_url('loading', scope.lcModel) + ')'
//                        },
//                        spell: function (spell) {
//                            if (scope.lcModel.key === '')
//                                return ''
//                            else {
//                                return 'url(' + scope.lcStatic.ddragon_url('spell', {key: 'MonkeyKing', spell: spell}) + ')';
//                            }
//                        },
//                    };
//                    
//                }
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