var notes = [];
var noteID = null;
var keywordID = null;

function Note(id, firstName, lastName, note, deckName) {
    this.postId = id;
    this.postedBy = firstName + " " + lastName;
    this.postedDate = this.postDate();
    this.postedTime = this.postTime();
    this.note = note;
    this.deckName = deckName || "Deck " + "#" + (this.postId + 1);
    this.keywords = [];
}

function Keyword(id, keyword, definition) {
    this.id = id;
    this.keyword = keyword;
    this.definition = definition|| " ";
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
Note.prototype.updateNote = function(note){
    this.note = note;
}
Note.prototype.addKeyword = function (id, keyword, definition) {
    this.keywords.push(new Keyword(id, keyword, definition));
}

Keyword.prototype.updateKeywordDefinition = function (input) {
    this.definition = input;
}
//creating a note
notes.push(new Note(noteID++, "Roger", "Chavez", "This is a test."));
notes.push(new Note(noteID++, "John", "Bianco", "A biome is a community or large ecological area on the earth's surface with plants and animals that have common characteristics for the environment with specific climatic conditions to suit the flora and fauna, they exist in and can be found over a range of continents. Biomes are distinct biological communities that have formed in response to a shared physical climate. 'Biome' is a broader term than 'habitat'; any biome can comprise a variety of habitats.", "biome"));
//creating a keyword
notes[0].addKeyword(keywordID++, "keyword 0", "Definition of the keyword 0.");
notes[0].addKeyword(keywordID++, "keyword 1", "Definition of the keyword 1.");
notes[0].addKeyword(keywordID++, "keyword 2", "Definition of the keyword 2.");
notes[0].addKeyword(keywordID++, "keyword 3", "Definition of the keyword 3.");
notes[0].addKeyword(keywordID++, "keyword 4", "Definition of the keyword 4.");
notes[0].addKeyword(keywordID++, "keyword 5", "Definition of the keyword 5.");


notes[1].addKeyword(keywordID++, "Tundra", "tree growth is hindered by low temperatures and short growing seasons.");
notes[1].addKeyword(keywordID++, "Taiga", " coniferous forests consisting mostly of pines, spruces and larches.");
notes[1].addKeyword(keywordID++, "Deciduous Forest", "dominated by trees that lose their leaves each year. They are found in areas with warm moist summers and mild winters.");
notes[1].addKeyword(keywordID++, "Grasslands", " areas where the vegetation is dominated by grasses.");
notes[1].addKeyword(keywordID++, "Desert", "barren area of landscape where little precipitation occurs and consequently living conditions are hostile for plant and animal life.");
notes[1].addKeyword(keywordID++, "Chaparral", "shrubland or heathland plant community found primarily in the U.S. state of California and in the northern portion of the Baja California Peninsula, Mexico");

//GET
function index(req, res, next) {
    res.json({ usersNotes: notes });
}

//POST
function create(req, res, next) {
    var tempUserNote = req.body.note;
    notes.push(new Note(noteID++, req.body.firstName, req.body.lastName, req.body.note, req.body.deckName));
    res.json({ note: notes });
}

function update(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            notes[i].updateNote(req.body.note);
            res.json({ note: notes });
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
//PUT
function updateKeywords(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            notes[i].addKeyword(keywordID++, req.body.keyword, req.body.definition);
            res.json({ keywords: notes[i].keywords });
        }
    }
    res.json({ error: "Sorry those notes do not exist." });
}
// PUT
function updateKeywordDefinition(req, res, next) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].postId == req.params.id) {
            for (var j = 0; j < notes[i].keywords.length; j++) {
                if (notes[i].keywords[j].id == req.params.id2) {
                    notes[i].keywords[j].updateKeywordDefinition(req.body.definition);
                    res.json({ keywords: notes[i].keywords });
                }
            }
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
                        res.json({ keywords: notes[i].keywords });
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
        destroyKeyword: destroyKeyword,
        updateKeywords: updateKeywords,
        updateKeywordDefinition: updateKeywordDefinition
    }