angular
    .module('noteApp')
    .filter('timerFilter', function () {
        return function (input) {
            function z(n) { return (n < 10 ? '0' : '') + n; }
            var seconds = input % 60;
            var minutes = Math.floor((input / 60) % 60);
            var hours = Math.floor((input / 60) / 60);
            return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
        };
    })