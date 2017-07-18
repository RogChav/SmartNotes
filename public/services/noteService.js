angular
    .module('noteApp')
    .service('noteService', function ($http) {

        //** Get
        this.getUserNotes = function () {
            return $http.get('/notes');
        }

    })