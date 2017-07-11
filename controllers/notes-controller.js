var notes = [];
var noteID = null;
var keywordID = null;

function Note(id, firstName, lastName, input, deckName) {
    this.postId = id;
    this.postedBy = firstName + " " + lastName;
    this.postedDate = this.postDate();
    this.postedTime = this.postTime();
    this.note = input;
    this.deckName = "Deck " + "#" + (this.postId + 1) || deckName;
    this.keywords = [];
}

function Keyword(id, keyword, definition) {
    this.id = id;
    this.keyword = keyword;
    this.definition = definition;
}

Note.prototype.postTime = function () {
    function z(n) { return (n < 10 ? "0" : "") + n; }
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    if (hour >= 12) {
        hour -= 12;
    }
    return z(hour) + ":" + z(minutes);
}

Note.prototype.postDate = function () {
    var month = (1 + new Date().getMonth()) + "/";
    var day = new Date().getUTCDate() + "/";
    var year = new Date().getUTCFullYear();
    var concat = day + month + year;
    return concat
}

Note.prototype.addKeyword = function (id, keyword, definition) {
    this.keywords.push(new Keyword(id, keyword, definition));
}

//creating a note
notes.push(new Note(noteID++, "Roger", "Chavez", "This is a test."));
notes.push(new Note(noteID++, "Roger 1", "Chavez 1", "This is a test1."));
//creating a keyword
notes[0].addKeyword(keywordID++, "testing 0", "Definition of the keyword 0.");
notes[0].addKeyword(keywordID++, "testing 1", "Definition of the keyword 1.");
notes[0].addKeyword(keywordID++, "testing 2", "Definition of the keyword 2.");
notes[0].addKeyword(keywordID++, "testing 3", "Definition of the keyword 3.");
notes[0].addKeyword(keywordID++, "testing 4", "Definition of the keyword 4.");
notes[0].addKeyword(keywordID++, "testing 5", "Definition of the keyword 5.");


notes[1].addKeyword(keywordID++, "testing 6", "Definition of the keyword 6.");
notes[1].addKeyword(keywordID++, "testing 7", "Definition of the keyword 7.");
notes[1].addKeyword(keywordID++, "testing 8", "Definition of the keyword 8.");
notes[1].addKeyword(keywordID++, "testing 9", "Definition of the keyword 9.");
notes[1].addKeyword(keywordID++, "testing 10", "Definition of the keyword 10.");
notes[1].addKeyword(keywordID++, "testing 11", "Definition of the keyword 11.");

//GET
function index(req, res, next) {
    res.json({ usersNotes: notes });
}

//POST
function create(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == req.params.id) {
            var tempUserNote = req.body.note;
            notes[i].pushNote(tempUserNote);
            res.json({ newNote: tempUserNote });
        }
    }
}

//GET
function show(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            res.json({ notes: notes[i] })
        }
    }
    res.json({ error: "Sorry notes for that user do not exist." });
}
//PUT KEYWORD
function update(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            notes[i].addKeyword(keywordID++, req.body.keyword, req.body.definition);
            res.json({ Session: notes[i] });
        }
    }
    res.json({ error: "Sorry those notes do not exist." });
}
//DELETE NOTES
function destroy(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            notes.splice(i, 1);
            res.json({ user: notes });
        }
    }
    res.json({ error: "Sorry those notes don't exist." });
}
//DELETE KEYWORDS
function destroyKeyword(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            for (var j = 0; j < notes[i].keywords.length; j++) {
                if (notes[i].keywords[j].id == req.params.id2) {
                    notes[i].keywords.splice(j, 1);
                    res.json({ user: notes[i].keywords });
                }
            }
        }
    }
    res.json({ error: "Sorry there was an error, please check your notes id and your keyword id." });
}

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy,
    destroyKeyword: destroyKeyword
}