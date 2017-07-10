angular
    .module('noteApp')
    .controller('dataController', function ($scope, dataService) {

        dataService.getSessionData()
            .then(function (response) {
                $scope.sessions = response.data;
                console.log($scope.sessions)
            });
            
            
        $scope.test = "test";

        $scope.labels = ['Keyword', 'keyword2', 'keyword3', 'keyword4', 'keyword5', 'keyword6', 'keyword7'];
        $scope.series = ['Session1', 'Session 2', 'session 3'];

        $scope.data = [
            [65, 59, 0, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [28, 48, 40, 19, 1, 1, 1]
        ];

    })