angular
  .module("noteApp")
  .controller("noteController", function ($scope, noteService) {

$scope.test = "test"; 


    $scope.keyWord = "display: inherit;"
    $scope.noteCol = "width:58%"
    $scope.keyWordCol = "width:42%;"

    $scope.minimize = function () {
      $scope.noteCol = "width: 100%;";
      $scope.keyWord = "display: none;";
      $scope.keyWordCol = "width:0%";
    }

    $scope.maximize = function () {
      $scope.noteCol = "width: 58%;";
      $scope.keyWord = "display: inherit;";
      $scope.keyWordCol = "width:42%";
    }

    $scope.users = [];

    $scope.note = [];

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
