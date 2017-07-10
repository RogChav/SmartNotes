angular
    .module("noteApp")
    .service("dataService", function ($http) {

        //** Get
        this.getSessionData = function () {
            return $http.get("http://localhost:8080/session");
        }
        // POST make an instance of a session 
        this.postSession = function (deckId, deckName, name) {
            $http.post("localhost:8080/session", {deckId: deckId, deckName:deckName, duration:duration, name:name})
                .then(function (response) {
                    console.log('This is my new instance of session and its id');
                    console.log(response.data);
                })
        }
        //PUT uploading Results
        this.updateResults = function (id) {
            $http.put("localhost:8080/session/"+id, { id:id, keyword:keyword, correct:correct, wrong:wrong})
                .then(function (response) {
                    console.log('This is my update path');
                    console.log(response.data);
                })
        }
        // DELETE
        this.deleteSession = function (id) {
            $http.delete("localhost:8080/session/"+ id)
                .then(function (response) {
                    console.log('This is my destroy path');
                    console.log(response.data);
                })
        }
    })