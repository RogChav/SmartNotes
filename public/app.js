var app = angular.module("noteApp", ["ui.router","chart.js"])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/") //needs to match "home" url

  $stateProvider

  .state("home", {
        url: "/",
        templateUrl: "./views/home.html",
        controller: "homeController"
    })

  .state("notes", {
        url: "/notes",
        templateUrl: "./views/notes.html", //the name on the address bar
        controller: "noteController"
    })
  
  .state("deck", {
        url: "/deck",
        templateUrl: "./views/deck.html",
        controller: "deckController"
    })
  
  .state("quiz", {
        url: "/quiz",
        templateUrl: "./views/quiz.html",
        controller: "quizController"
    })

 .state("data", {
        url: "/data",
        templateUrl: "./views/data.html",
        controller: "dataController"
    })

.state("newUser", {
        url: "/newUser",
        templateUrl: "./views/newUser.html",
        controller: "noteController"
    })

});
