sessions = [];
sessionID = null;


// write a similar incementing if statement as the front end, only use the prototype to push if the id doesn't already exist (or push all the cards in the the rests array at some point and increment right and wrong answers as you go), increment by boolean like front end 
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
    if (minutes < 10) {
        minutes = minutes.toString();
        minutes = "0" + minutes;
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

// get hours in military time and multiply by 60, add to minutes and there's my start time. 
sessions.push(new Session(sessionID++,0, "Deck #1", "first session"))
// start time would be when the object was created within angular, end time would be when it's posted here so it would be generated on creation within the server db. Put it in terms of minutes, so 1am would be 60, 10am 600 etc.
sessions[0].newResult(1, "keyword", 5, 6);
// sessions[0].newName("test name method")

//GET
function index(req, res, next) {
    res.json({ sessions: sessions });
}

//POST
function create(req, res, next) {
    sessions.push(new Session(sessionID++, req.body.deckId, req.body.deckName, req.body.name));
    res.json({ sessionID: sessions[sessions.length-1].id });
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
    res.json({ error: "Sorry you can't edit sessions." });
}

//PUT Results
function update(req, res, next) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].id == req.params.id) {
            sessions[i].newResult(req.body.id, req.body.keyword, req.body.correct, req.body.wrong);
            sessions[i].setDuration(req.body.duration);
            res.json({ Session: sessions[i] });
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
    update: update,
    destroy: destroy
}