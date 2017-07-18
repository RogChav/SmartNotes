angular
  .module("noteApp")
  .controller("noteController", function ($scope, noteService, $http) {

    $scope.notes = [];
    $scope.definition = "";
    // This is the value of my select select element, it will change to whichever option I choose
    $scope.singleSelect = "";

    noteService.getUserNotes()
      .then(function (response) {
        $scope.notes = response.data.usersNotes;
        // console.log($scope.notes)
      });

    noteService.getUserNotes()

    function getSpecificUserNotes(currentID) {
      $http.get('http://localhost:8080/notes/' + currentID)
        .then(function (response) {
          $scope.theseNotes = response.data.notes;
          $scope.notesInput = $scope.theseNotes.note;
          // $scope.currentID = $scope.notes[i].postId
        });
    }

    $scope.$watch('singleSelect', function () {
      $scope.currentID = $scope.singleSelect;
    })

    $scope.$watch('currentID', function () {
      // console.log("this is running")
      // console.log($scope.currentID);

      if ($scope.singleSelect != "") {
        $scope.deckNamed = true;
        $scope.nameTheDeck = false;
        for (var i = 0; i < $scope.notes.length; i++) {
          if ($scope.notes[i].postId == $scope.currentID) {
            $scope.titleAndAuthor = $scope.notes[i].deckName + " by " + $scope.notes[i].postedBy;
            getSpecificUserNotes($scope.currentID);
          }
        }
      }
      else {
        $scope.currentID = "";
        $scope.theseNotes = "";
        $scope.keywordArray = [];
        $scope.notesInput = "";
        $scope.titleAndAuthor = "";
        $scope.deckNamed = false;
        $scope.nameTheDeck = true;
      }
    })


    $scope.keyWord = "display: inherit;"
    $scope.noteCol = "width:58%"
    $scope.keyWordCol = "width:42%;"
    $scope.notesCols = "100";
    $scope.hidden = false;

    $scope.minimize = function () {
      $scope.noteCol = "width: 100%;";
      $scope.keyWord = "display: none;";
      $scope.keyWordCol = "width:0%";
      $scope.notesCols = "200";
      $scope.hidden = true;
    }

    $scope.maximize = function () {
      $scope.noteCol = "width: 58%;";
      $scope.keyWord = "display: inherit;";
      $scope.keyWordCol = "width:42%";
      $scope.notesCols = "100";
      $scope.hidden = false;
    }

    $scope.users = [];

    $scope.note = [];
    $scope.newInputArray = [];
    $scope.keywordArray = [];
    var tempKeyword = "";
    $scope.deckNamed = false;
    $scope.nameTheDeck = true;
    $scope.titleAndAuthor = null;


    $scope.inputChange = function () {
      var newNotesArray = [];
      var newNotesInput = $scope.notesInput;
      newNotesInput = newNotesInput.split("`");
      for (var i = 0; i < newNotesInput.length; i++) {
        newNotesArray.push(newNotesInput[i]);
        if ((newNotesArray[i].charAt(newNotesArray[i].length - 1)) == "~") {
          tempKeyword = newNotesArray[i];
          tempKeyword = tempKeyword.replace("~", "");
          $scope.updateKeyword(tempKeyword, "");
          newNotesArray.splice(i, 1, tempKeyword);
          $scope.notesInput = newNotesArray.join("");
          tempKeyword = [];
        }
      }
      $scope.newInputArray = newNotesArray;
      updateNotes();
    }

    $scope.deleteKeyword = function (id) {
      $http.delete("/notes/" + $scope.currentID + "/keyword/" + id)
        .then(function (response) {
          // console.log('This is my destroy path');
          // console.log(response.data);
          $scope.theseNotes = response.data;
        })
    }
    $scope.SubmitNewNote = function () {
      $http.post("/notes/", { firstName: $scope.firstName, lastName: $scope.lastName, note: "Please complete me!", deckName: $scope.deckName })
        .then(function (response) {
          // console.log("These are my new notes!");
          // console.log(response)
          $scope.titleAndAuthor = response.data.note[response.data.note.length - 1].deckName + " by " + response.data.note[response.data.note.length - 1].postedBy;
          $scope.currentID = response.data.note[response.data.note.length - 1].postId;
          $scope.singleSelect = $scope.currentID;
          $scope.notes.push(response.data.note[response.data.note.length - 1]);
        })
      $scope.deckNamed = true;
      $scope.nameTheDeck = false;
    }

    function updateNotes() {
      $http.put("/notes/" + $scope.currentID, { note: $scope.notesInput })
        .then(function (response) {
          // $scope.notesInput = response.data.note[$scope.currentID].note;
          console.log("These are my updated notes!");
          console.log(response.data.note[$scope.currentID].note)
        })
    }

    $scope.updateKeyword = function (keyword, definition) {
      $http.put("/notes/" + $scope.currentID + "/keyword", { keyword: keyword, definition: definition })
        .then(function (response) {
          // console.log("These are my updated keywords!");
          // console.log(response.data)
          $scope.theseNotes = response.data;
        })
    }
    $scope.updateKeywordDefinition = function (cardID, definition) {
      console.log($scope.currentID);
      $http.put("/notes/" + $scope.currentID + "/definition/" + cardID, { definition: definition })
        .then(function (response) {
          // console.log("These are my notes with my updated definition!");
          // console.log(response.data)
          $scope.theseNotes = response.data;
        })
    }


    // users
    $scope.id = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.schoolName = "";
    $scope.email = "";
    $scope.note = "";

    // notePost
    $scope.notes = ""
    $scope.postId = "";
    $scope.postedBy = "";
    $scope.postedOn = "";

  });

