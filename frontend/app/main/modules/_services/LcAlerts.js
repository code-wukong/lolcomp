angular.module("main.services")
    .factory("LcAlerts", ["$mdToast",
        function ($mdToast) {
            var alert_position = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };
            var get_alert_position = function () {
                return Object.keys(alert_position)
                  .filter(function(pos) { return alert_position[pos]; })
                  .join(' ');
            };
            var LcAlerts = {
                error: function (msg) {
                    var toast = $mdToast.simple()
                        .content('ERROR - '+msg)
                        .action('X')
                        .highlightAction(false)
                        .position(get_alert_position());

                    $mdToast.show(toast)
                }
            };
            return LcAlerts;
        }]);