angular.module("main.directives")
    .factory("lcQuickSelectLinkFn", ["LcComms",
        function (LcComms) {
            return function (scope, elem, attrs) {
                scope.get_pos = function (i, n) {
                    if (scope.lcSide === 'blue') return i;
                    
                    var right_side = n + 1
                    return -i + right_side;
                };

            var post = {
                label: "champ_data",
                mode: "read"
            }
            LcComms.call_ws("ws/rw_static_def", post)
                .then(function (data) {
                    scope.all_champs = [];
                    for(var i in data.data){
                        scope.all_champs.push({
                            name: data.data[i].name,
                            key: i
                        });
                    }
                    scope.settings = {
                        selected: "",
                        search_txt: "",
                        on_select: function (obj) {
                            scope.lcModel.add(scope.lcSide, obj);
                            scope.settings.search_txt = "";
                        }
                    };
                    scope.square_url = function (key) {
                        return 'url(' + scope.lcStatic.ddragon_url('square', {champ:key}) +') left top';
                    }
                });
            };
        }])
    .directive("lcQuickSelect", ["lcQuickSelectLinkFn",
        function (lcQuickSelectLinkFn) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "lcQuickSelect/lcQuickSelect.html",
                scope: {
                    lcSide: "@",
                    lcModel: "=",
                    lcStatic: "="
                },
                link: lcQuickSelectLinkFn
            };
        }]);