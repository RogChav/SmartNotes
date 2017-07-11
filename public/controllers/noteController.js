angular
  .module("noteApp")
  .controller("noteController", function ($scope, noteService, $http) {

$scope.test = "test"; 


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
    var currentID = -1;

    $scope.inputChange = function() {
      var newNotesArray = [];
      var newNotesInput = $scope.notesInput;
      newNotesInput = newNotesInput.split("`");
      for (var i = 0; i < newNotesInput.length; i++) {
        newNotesArray.push(newNotesInput[i]);
          if ((newNotesArray[i].charAt(newNotesArray[i].length - 1)) == "~") {
            tempKeyword = newNotesArray[i];
            tempKeyword = tempKeyword.replace("~", ""); 
            $scope.keywordArray.push(tempKeyword);
            newNotesArray.splice(i, 1, tempKeyword);
            $scope.notesInput = newNotesArray.join("");
            tempKeyword = [];   
          }
        }
        $scope.newInputArray = newNotesArray;
      }

      $scope.deleteKeyword = function(keyword) {
        console.log(keyword)
      }

      $scope.SubmitNewNote = function() {
        $http.post("http://localhost:8080/notes/", {firstName: $scope.firstName, lastName: $scope.lastName, note: "Please complete me!", deckName: $scope.deckName, keywords: []})
        .then(function(response) {
          console.log("These are my new notes!");
          console.log(response)
          $scope.titleAndAuthor = response.data.note[response.data.note.length-1].deckName + " by " + response.data.note[response.data.note.length-1].postedBy;
          currentID = response.data.note[response.data.note.length-1].postId;
        })
        $scope.deckNamed = true;
        $scope.nameTheDeck = false;
      }

      $scope.updateNotes = function() {
        $http.put("http://localhost:8080/notes/" + currentID, {firstName: $scope.firstName, lastName: $scope.lastName, note: $scope.notesInput, deckName: $scope.deckName, keywords: $scope.keywordArray})
        .then(function(response) {
          console.log("These are my updated notes!");
          console.log(response)
        })
      }

      $scope.updateKeywordDefinition = function() {
        console.log($scope.keyword)
      }
    
    //     $animate.on('enter', container,
    //    function callback(element, phase) {
    //      // cool we detected an enter animation within the container
    //    }
    // );

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

        noteService.getUserNotes()
            .then(function (response) {
                $scope.notes = response.data.usersNotes;

            });

    //** Get
    // $scope.getUserNotes = function () {
    //   $scope.note = [];
    //   $http.get('http://localhost:8080/user/notes')
    //     .then(function (response) {
    //       for (var i = 0; i < response.data.usersNotes.length; i++) {
    //         $scope.note.unshift(response.data.usersNotes[i]);
    //         console.log('This is my index path');
    //         console.log(response.data);
    //       }
    //     })
    // }
    // $scope.getUserNotes();

    // $scope.getUsers = function () {
    //   $scope.note = [];
    //   $http.get('http://localhost:8080/users')
    //     .then(function (response) {
    //       // for (var i = 0; i < response.data.usersNotes.length; i++) {
    //       $scope.users.push(response.data);
    //       console.log('This is my index path');
    //       console.log(response.data);
    //       // }
    //     })
    // }
    // $scope.getUsers()
    // ****************************** Button functions ******************************:

    // Submit Button POST
    // $scope.submitButton = function (notes) {
    //   console.log("get's here")
    //   $http.post('http://localhost:8080/user/notes/0', { note: notes })
    //     .then(function (response) {
    //       console.log('This is my create path');
    //       console.log(response.data);
    //       $scope.getUserNotes();
    //     })
    // }


    // $scope.editButton = function(user) {
    //   for (var i = 0; i < $scope.users.length; i++) {
    //     if(($scope.users[i] ==  user.id) && $scope.notepost == notepost.id)){
    //       currentUserIndex = i

    //       currentUserId = user.id
    //       $scope.firstName = user.firstName;
    //       $scope.lastName = user.lastName;
    //       $scope.userPost = user.userPost;
    //     }
    //   }
    // }

    // Delete Button
    // $scope.deleteButton = function (id) {
    //   $http.delete('http://localhost:8080/user/notes/' + 0 + "/" + id)
    //     .then(function (response) {
    //       console.log('This is my destroy path');
    //       console.log(response.data);
    //       $scope.getUserNotes();
    //     })
    // }


  });
