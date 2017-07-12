angular
    .module('noteApp')
    .controller('dataController', function ($scope, dataService) {
        $scope.displayOnGraph = "";
        // POST scopes
        $scope.deckId = "";
        $scope.deckName = "";
        $scope.name = "";

        // PUT scopes
        $scope.thisDeckId = null;
        $scope.id = null;
        $scope.duration = dataService.postID();
        $scope.correct = 0
        $scope.wrong = 0;

        dataService.getSessionData()
            .then(function (response) {
                $scope.sessions = response.data.sessions;
                console.log($scope.sessions)

                function grabPropertyPerc(arr, prop, newloc) {
                    var tempArr = [];
                    for (var i = 0; i < arr.length; i++) {
                        tempArr.push(arr[i][prop])
                    }
                    $scope[newloc].push(tempArr);
                }
                function grabPropertyData(id, arr, prop, newloc) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr.id == id) {
                            $scope[newloc].push(arr[i][prop]);
                        }
                    }
                }
                $scope.currentDeck = null;
                $scope.showThis = function (id) {
                    // if ($scope.currentSession == null) {
                    $scope.currentSession = id;
                }
                $scope.$watch('currentSession', function () {
                    grabPropertyData($scope.currentSession, $scope.sessions, "name", "series");

                    grabPropertyData($scope.currentSession, $scope.sessions[0].results, "keyword", "labels");

                    for (var i = 0; i < $scope.sessions.length; i++) {
                        if ($scope.sessions[i].id == $scope.currentSession) {
                            $scope.currentDeck = $scope.sessions[i].deckIDTested;
                            grabPropertyPerc($scope.sessions[i].results, "percentage", "data");
                        }
                    }
                })
                // grabPropertyData($scope.currentSession, $scope.sessions, "name", "series");
                // grabPropertyData($scope.sessions[0].results, "keyword", "labels");
                // for (var i = 0; i < $scope.sessions.length; i++) {
                //     grabPropertyPerc($scope.sessions[i].results, "percentage", "data");
                // }
                $scope.$watch('displayOnGraph', function () {
                    console.log($scope.displayOnGraph);
                })
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

        $scope.clearGraph = function () {
            $scope.currentSession = null;
            $scope.labels = [];
            $scope.series = [];
            $scope.data = [];
        }

        $scope.currentSession = null;
        $scope.labels = [];
        $scope.series = [];
        $scope.data = [];
        console.log($scope.labels)
        console.log($scope.series)
        console.log($scope.data)
    })