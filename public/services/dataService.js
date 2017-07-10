angular
    .module("noteApp")
    .service("dataService", function ($http) {

        this.postID = "";
        //Get
        this.getSessionData = function () {
            return $http.get("http://localhost:8080/session");
        }
        // POST make an instance of a session 
        this.postSession = function (deckId, deckName, name) {
            $http.post("/session", { deckId: deckId, deckName: deckName, name: name })
                .then(function (response) {
                          this.postID = response.data.sessionID.id;
                    console.log('This is my new instance of session and its id');
                    console.log(response.data.sessionID.id);
                })
        }
        //PUT Finishing up a Session. Setting the duration length.
        this.updateDuration = function (thisDeckId, duration) {
            $http.put("session/duration/" + thisDeckId, { duration: duration })
                .then(function (response) {
                    console.log('This is my duration update path');
                    console.log(response.data);
                })
        }
        this.postID = function(){
            return this.postID;
        }
        //PUT uploading Results
        this.updateResults = function (thisDeckId, id, keyword, correct, wrong) {
            $http.put("session/" + thisDeckId, { id: id, keyword: keyword, correct: correct, wrong: wrong })
                .then(function (response) {
                    console.log('This is my update results path');
                    console.log(response.data);
                })
        }
        // DELETE
        this.deleteSession = function (id) {
            console.log("In the delete function")
            $http.delete("session/" + id)
                .then(function (response) {
                    console.log('This is my destroy path');
                    console.log(response.data);
                })
        }
    })