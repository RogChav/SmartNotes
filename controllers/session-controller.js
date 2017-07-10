sessions = [];
sessionID = null;
// write a similar incrementing if statement as the front end, only use the prototype to push if the id doesn't already exist (or push all the cards in the the rests array at some point and increment right and wrong answers as you go), increment by boolean like front end; 

function Session(id, deckId, deckName, name) {
    this.id = id;
    this.deckIDTested = deckId;
    this.deckName = deckName;
    this.postDate = this.postDate();
    this.localTime = this.localTime();
    this.duration = null;
    this.name = name || this.postDate + " " + this.localTime;
    this.results = [];
}

function Result(id, keyword, correct, wrong) {
    this.cardID = id;
    this.keyword = keyword;
    this.correct = correct;
    this.wrong = wrong;
    this.total = this.correct + this.wrong;
    this.getPercentage = function () {
        return Math.round(100 * (this.correct / this.total * 100)) / 100;
    }
    this.percentage = this.getPercentage();
}

Session.prototype.newName = function (name) {
    this.name = name;
}

Session.prototype.setDuration = function (time) {
    this.duration = time;
}

Session.prototype.newResult = function (id, keyword, correct, wrong) {
    this.results.push(new Result(id, keyword, correct, wrong));
}

Session.prototype.localTime = function () {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()
    var temp = "";
    if (hour >= 12) {
        hour -= 12;
        minutes += " PM";
    }
    else {
        minutes += " AM";
    }
    return z(hour) + ":" + z(minutes);
}

Session.prototype.postDate = function () {
    var month = (1 + new Date().getMonth()) + "/";
    var day = new Date().getUTCDate() + "/";
    var year = new Date().getUTCFullYear();
    var concat = day + month + year;
    return concat
}

// seeding my database
sessions.push(new Session(sessionID++, 0, "Deck #1", "First session"));
// sessions.push(new Session(sessionID++, 0, "Deck #1", "Second session"));
// sessions.push(new Session(sessionID++, 0, "Deck #1", "Third session"));
// sessions.push(new Session(sessionID++, 0, "Deck #1", "Fourth session"));
// sessions.push(new Session(sessionID++, 0, "Deck #1", "Fifth session"));

sessions[0].newResult(1, "keyword", 5, 6);
sessions[0].newResult(1, "keyword 1", 4, 7);
sessions[0].newResult(1, "keyword 2", 8, 3);
sessions[0].newResult(1, "keyword 3", 9, 2);
sessions[0].newResult(1, "keyword 4", 2, 9);
sessions[0].newResult(1, "keyword 5", 6, 5);
sessions[0].newResult(1, "keyword 6", 11, 0);
sessions[0].newResult(1, "keyword 7", 5, 6);
sessions[0].newResult(1, "keyword 8", 4, 7);


//GET
function index(req, res, next) {
    res.json({ sessions: sessions });
}

//POST
function create(req, res, next) {
    console.log("this create path got hit")
    sessions.push(new Session(sessionID++, req.body.deckId, req.body.deckName, req.body.name));
    res.json({ sessionID: sessions[sessions.length - 1] });
}

//GET
function show(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            res.json({ Session: sessions[i] });
        }
    }
    res.json({ error: "Sorry that session does not exist." });
}

//PUT session name
function updateName(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            sessions[i].newName(req.body.name);
            res.json({ Session: sessions[i] });
        }
    }
    res.json({ error: "error, please double check your input." });
}
//PUT Results
function update(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            sessions[i].newResult(req.body.id, req.body.keyword, req.body.correct, req.body.wrong);
            res.json({ Session: sessions });
        }
    }
    res.json({ error: "error, please double check your input." });
}
// PUT FINISHED SESSION - Duration
function updateDuration(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            sessions[i].setDuration(req.body.duration);
            res.json({ Session: sessions });
        }
    }
    res.json({ error: "error, please double check your input." });
}
//DELETE
function destroy(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            sessions.splice(i, 1);
            res.json({ Session: sessions });
        }
    }
    res.json({ error: "Sorry that session does not exist." });
}

module.exports = {
    index: index,
    create: create,
    show: show,
    updateName: updateName,
    updateDuration: updateDuration,
    update: update,
    destroy: destroy
}