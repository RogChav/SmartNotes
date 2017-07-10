angular
    .module('noteApp')
    .service('noteService', function ($http) {

        //** Get
        this.getUserNotes = function () {
            return $http.get('http://localhost:8080/notes');       
        }
        
    })