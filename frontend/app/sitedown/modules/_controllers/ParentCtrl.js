angular.module('sitedown.controllers')
    .controller('ParentCtrl', ['$scope',
        function ($scope) {
            
            $scope.static = {
                get_url: function (resource) {
                    var static_url = '/d117wggqwe1zl6.cloudfront.net/static/';
                    return static_url + resource;
                },
                get_year: function () {
                    var date = new Date();
                    return date.getFullYear();
                }
            }
        }]);