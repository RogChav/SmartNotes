angular
    .module('noteApp')
    .controller('quizController', function ($scope, $timeout, noteService) {
        // below is the code for my timer
        $scope.counter = 0;
        $scope.onTimeout = function () {
            $scope.counter++;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);
        $scope.stopTimeout = function () {
            $timeout.cancel(mytimeout);
        }
        $scope.stopTimeout();
        // this displays the select header bar and hides it after a deck is chosen
        $scope.display = "display:inherit";
        // key that displays a bar that displays which deck is currently being studied
        $scope.studyOn = "display:none";
        // This is the value of my select select element, it will change to whichever option I choose
        $scope.singleSelect = "";
        // This will be set to true when someone starts a study session
        $scope.continueStudy = false;
        // variable used to keep track of which deck to reset the cards into
        var thisIndex = null;
        // variable hold the id of the question, the function that checks if the answers are correct accesses this
        var questionID = null;
        // temporary container for cards
        var tempCardCont = [];
        //This array contains all the id's for the given deck, this insures the cards are tested randomly, but that the whole deck is studied complely before repeating cards.
        var wholeDeckIDs = [];
        //variable that displaysthat displays deck length
        $scope.deckSize = 0;
        // This variable stores the total amount of questions that have been asked, 
        $scope.questionTotal = 0;
        // this variable stores the total amount of correct answers
        $scope.answerCorrect = 0;
        // this variable stores the total amount of wrong answers
        $scope.answerWrong = 0;
        // this variable stores card name on the global scope
        $scope.cardName = [];
        // this scope will be able to tell if a person got a question wrong
        $scope.notWrong = true;
        // this is where the deck object  is retrieved from the noteService, which get's it from my nodeserver 
        noteService.getUserNotes()
            .then(function (response) {
                $scope.notes = response.data.usersNotes;
                console.log($scope.notes);
                $scope.startStudy = function () {
                    // hide/show display
                    $scope.display = "display:none";
                    $scope.studyOn = "display:inherit";
                    //  This for loops goes throught the data called and finds the right deck by key, which is attained from the select menu on my quiz screen
                    for (var i = 0; i < $scope.notes.length; i++) {
                        if ($scope.notes[i].postId == $scope.singleSelect) {
                            // fill the wholeDeckIDs only when it's completly empty, on deck completion or when starting up a study session
                            if (wholeDeckIDs.length == 0) {
                                for (var n = 0; n < $scope.notes[i].keywords.length; n++) {
                                    wholeDeckIDs.push($scope.notes[i].keywords[n].id);
                                }
                            }
                            //sets current notes index to variable accessible to global scope 
                            thisIndex = i;
                            //sets the variable equal to the name of the deck
                            $scope.deckName = $scope.notes[i].deckName;
                            //set's variable to the length of the deck
                            $scope.deckSize = $scope.notes[i].keywords.length + " cards";
                            // get's a random number between 0 and the length of an inputted array
                            var randomNumber = function (arr) {
                                return Math.floor(Math.random() * (arr.length));
                            }
                            // shuffles items in an array
                            var shuffleArray = function (arr) {
                                for (var j = 0; j < 30; j++) {
                                    var temp = arr[0];
                                    var newNumber = randomNumber(arr);
                                    if (arr[0] != arr[newNumber]) {
                                        arr.splice(0, 1, arr[newNumber]);
                                        arr.splice(newNumber, 1, temp);
                                    }
                                }
                            }
                            shuffleArray(wholeDeckIDs);
                            console.log(wholeDeckIDs);
                            // This represents the id that will be displayed as a question and is referece that that the program could find the complimentary answer and makes sure to display it in the answer selectioins
                            questionID = wholeDeckIDs.splice(0, 1);
                            // console.log("This is the answer and question ID:" + questionID);
                            // array of keywords will plugged into the function and will be shuffled
                            var shuffleKeywords = function (input) {
                                rightAnswer = "";
                                // this for loop splices out the right answer and stores it into a temporary variable
                                for (var k = 0; k < input.length; k++) {
                                    if (input[k].id == questionID) {
                                        rightAnswer = input.splice(k, 1);
                                    }
                                }
                                shuffleArray(input);
                                // this for loop will shorten the answer selection to 3
                                while (input.length > 3) {
                                    var temp = input.pop();
                                    tempCardCont.push(temp);
                                }
                                console.log(questionID);
                                if ($scope.cardName.length > 1) {
                                    $scope.cardName.shift();
                                }
                                $scope.cardName.push(rightAnswer[0].keyword);
                                input.splice(randomNumber(input), 0, rightAnswer[0]);
                            }
                            shuffleKeywords($scope.notes[i].keywords);
                            // The question (keyword definition) that is being displayed on the quiz screen
                            for (var l = 0; l < $scope.notes[i].keywords.length; l++) {
                                if ($scope.notes[i].keywords[l].id == questionID) {
                                    $scope.definition = $scope.notes[i].keywords[l].definition;
                                }
                            }
                            // The keywords array that is displaying below the quiz screen
                            $scope.keyWords = $scope.notes[i].keywords;
                        }
                    }
                }
                function countFilter(input) {
                    function z(n) { return (n < 10 ? '0' : '') + n; }
                    var seconds = input % 60;
                    var minutes = Math.floor((input / 60) % 60);
                    var hours = Math.floor((input / 60) / 60);
                    return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
                };
                $scope.endStudy = function () {
                    // stop timeout timer
                    $scope.stopTimeout();
                    console.log(countFilter($scope.counter));
                    // ejects out of the while loop to stop the study session
                    $scope.continueStudy = false;
                    // this displays the select header bar and hides it after a deck is chosen
                    $scope.display = "display:inherit";
                    // key that displays a bar that displays which deck is currently being studied
                    $scope.studyOn = "display:none";
                    // resets the select optioins menu back to a  blank option
                    $scope.singleSelect = "";
                    // resets the array of ids used to select id's at random
                    wholeDeckIDs = [];
                    // resets the quiz screen to a blank screen
                    $scope.definition = "";
                    //resets the keyword buttons below the quiz screen
                    $scope.keyWords = "";
                    //pushes all the cards back in the appropriate deck 
                    for (var i = 0; i < tempCardCont.length; i++) {
                        $scope.notes[thisIndex].keywords.push(tempCardCont[i]);
                    }
                    // resets string that displays deck length
                    $scope.deckSize = 0;
                    // This variable stores the total amount of questions that have been asked, 
                    $scope.questionTotal = 0;
                    // this variable stores the total amount of correct answers
                    $scope.answerCorrect = 0;
                    // this variable stores the total amount of wrong answers
                    $scope.answerWrong = 0;
                    //empty the temporary container
                    tempCardCont = [];
                    // reset temp index
                    thisIndex = null;
                    //resets timer to 0
                    $scope.counter = 0;
                }
                $scope.checkAnswer = function (id) {
                    if (id == questionID) {
                        if ($scope.notWrong == true) {
                            $scope.answerCorrect++;
                            console.log("Correct!");
                        }
                        else {
                            $scope.answerWrong++;
                            console.log("Correct, but you got your first attept(s) wrong.");
                        }
                        $scope.questionTotal = $scope.answerCorrect + $scope.answerWrong;
                        resetStudy();
                        $scope.startStudy();
                        console.log($scope.cardName[0]);
                    }
                    else {
                        $scope.notWrong = false;
                        $scope.questionTotal = $scope.answerCorrect + $scope.answerWrong;
                        console.log("Wrong Answer!");
                    }
                }
                function resetStudy() {
                    // resets the quiz screen to a blank screen
                    $scope.definition = "";
                    //resets the keyword buttons below the quiz screen
                    $scope.keyWords = "";
                    //pushes all the cards back in the appropriate deck 
                    for (var i = 0; i < tempCardCont.length; i++) {
                        $scope.notes[thisIndex].keywords.push(tempCardCont[i]);
                    }
                    //empty the temporary container
                    tempCardCont = [];
                    // reset temp index
                    thisIndex = null;
                    $scope.notWrong = true;
                }
            });
    })
