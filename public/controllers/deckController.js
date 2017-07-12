angular
    .module('noteApp')
    .controller('deckController', function ($scope, noteService) {
        $scope.singleSelect = "";
        noteService.getUserNotes()
            .then(function (response) {
                $scope.notes = response.data.usersNotes;
                console.log($scope.notes)
            });
             $scope.$watch('singleSelect', function () {
      console.log("this is running")

      if ($scope.singleSelect != "") {
        for (var i = 0; i < $scope.notes.length; i++) {
          if ($scope.notes[i].postId == $scope.singleSelect) {
            $scope.theseNotes = $scope.notes[i];
            $scope.currentID = $scope.notes[i].postId
          }
        }
      }
      else {
        $scope.currentID = "";
        $scope.theseNotes = "";
      }
    })
    })