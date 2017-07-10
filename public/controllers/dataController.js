angular
    .module('noteApp')
    .controller('dataController', function ($scope, dataService) {
        // POST scopes
        $scope.deckId = "";
        $scope.deckName = "";
        $scope.name = "";

        // PUT scopes
        $scope.thisDeckId = null;
        $scope.id = null;
        $scope.duration =  dataService.postID();;
        $scope.correct = 0
        $scope.wrong = 0;

        dataService.getSessionData()
            .then(function (response) {
                $scope.sessions = response.data;
                console.log($scope.sessions)
            });
        $scope.postSession = function () {
            dataService.postSession($scope.deckId, $scope.deckName, $scope.name);
        }
        $scope.updateDuration = function () {
            dataService.updateDuration($scope.thisDeckId, $scope.duration);
        }
        $scope.updateResults = function () {
            dataService.updateResults($scope.thisDeckId, $scope.id, $scope.keyword, $scope.correct, $scope.wrong);
        }
        $scope.deleteSessions = function () {
            console.log("inside my delete function")
            dataService.deleteSession($scope.id);
        }
      
        $scope.labels = ['Keyword', 'keyword2', 'keyword3', 'keyword4', 'keyword5', 'keyword6', 'keyword7'];
        $scope.series = ['Session1', 'Session 2', 'session 3'];
        $scope.data = [
            [65, 59, 0, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [28, 48, 40, 19, 1, 1, 1]
        ];
    })