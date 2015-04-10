(function (window) {
    var helpers = {};

    helpers.getFunctions = function (arr, obj, prefix) {
        if (prefix === undefined || prefix.constructor !== String) {
            prefix = "";
        }

        angular.forEach(obj, function (value, key) {
            if (angular.isFunction(value)) {
                this.push(prefix + key);
            } else if (angular.isObject(value) && angular.isArray(value) === false) {
                helpers.getFunctions(this, value, (prefix + key + "."));
            }
        }, arr);

        return arr;
    };

    window.helpers = helpers;
})(window);