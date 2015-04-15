angular.module("internal.directives")
    .factory("lcEditRelObjTypeLinkFn", [
        function () {
            return function (scope, elem, attrs) {
                scope.$watch('edit_model', function () {
                    scope.update_edit_model();
                }, true);
                scope.update_edit_model = function () {
                    if(angular.isDefined(scope.lcEditModel)){
                        if(scope.is_exception === true){
                            scope.lcEditModel.data = scope.edit_model.exception;
                            scope.lcEditModel.obj_type = 'exception';
                        }else{
                            scope.lcEditModel.data = scope.edit_model.tag;
                            scope.lcEditModel.obj_type = 'tag';
                        }
                    }
                }
                scope.is_exception = false;
                scope.edit_model = {
                    tag: "",
                    exception: {
                        champ: "",
                        skill: ""
                    }
                };
                scope.skill_types = [{
                        label: "Passive",
                        group: "normal"
                    }, {
                        label: "Q",
                        group: "normal"
                    }, {
                        label: "W",
                        group: "normal"
                    }, {
                        label: "E",
                        group: "normal"
                    }, {
                        label: "R",
                        group: "normal"
                    }];
                scope.edit_model[scope.lcOriginal.obj_type] = angular.copy(scope.lcOriginal.data);
                scope.is_exception = (scope.lcOriginal.obj_type === 'exception');
            };
        }])
    .directive("lcEditRelObjType", ["lcEditRelObjTypeLinkFn",
        function (lcEditRelObjTypeLinkFn) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    lcOriginal: "=",
                    lcEditModel: "="
                },
                templateUrl: "lcEditRelObjType/lcEditRelObjType.html",
                link: lcEditRelObjTypeLinkFn
            };
        }]);