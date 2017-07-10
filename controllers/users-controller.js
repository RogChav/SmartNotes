var users = [];
var userId = 0;

// function randomInRange(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function User(id, firstName, lastName, schoolName, email) {
    var postId = 0
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.schoolName = schoolName;
    this.email = email;
    this.notes = [];
    this.postDate = function () {
        var day = new Date().getUTCDate();
        var month = (1 + new Date().getMonth()) + "/";
        var year = "/" + new Date().getUTCFullYear();
        var hour = new Date().getHours() - 12
        var minutes = new Date().getMinutes()
        var concat = hour + ":" + minutes + " PM " + month + day + year;
        return concat;
    }
    this.pushNote = function (input) {
        this.notes.push({ postId: postId++, postedBy: this.firstName + " " + this.lastName, postedOn: this.postDate(), note: input });
    }
}

users.push(new User(userId++, "Ron", "Weasley", "Red Wood", "Ron.Weasley@gmail.com"));
users.push(new User(userId++, "Sirius", "Black", "Red Wood", "SirBK@gmail.com"));
users.push(new User(userId++, "Severus", "Snape", "Red Wood", "SeverSnape@gmail.com"));

users[0].pushNote("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores omnis rerum atque vitae Prize Picture explicabo recusandae unde, excepturi doloribus officiis, odio ratione animi. Magnam expedita fuga deserunt illo optio!");
users[0].pushNote("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores omnis rerum atque vitae Winner Winner facilis explicabo recusandae unde, excepturi doloribus officiis, odio ratione animi. Magnam expedita fuga deserunt illo optio!");
users[0].pushNote("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores omnis rerum atque Chicken Dinner facilis explicabo recusandae unde, excepturi doloribus officiis, odio ratione animi. Magnam expedita fuga deserunt illo optio!");
users[0].pushNote("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores omnis rerum atque vitae saepe facilis explicabo recusandae unde, excepturi doloribus officiis, odio ratione animi. Magnam expedita fuga deserunt illo optio!");
//GET
function index(req, res, next) {
    res.json({ users: users });
}

//POST
function create(req, res, next) {
    var tempUser = new User(userId++, req.body.firstName, req.body.lastName, req.body.schoolName, req.body.email);
    users.push(tempUser);
    res.json({ user: tempUser });
}

//GET
function show(req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            res.json({ user: users[i] });
        }
    }
    res.json({ error: "Sorry that user does not exist." });
}

//PUT
function update(req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users.splice(i, 1, new User(parseInt(req.params.id), req.body.firstName, req.body.lastName, req.body.schoolName, req.body.email, req.body.email));
            res.json({ user: users[i] });
        }
    }
}

//DELETE
function destroy(req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users.splice(i, 1);
            res.json({ user: users });
        }
    }
    res.json({ error: "Sorry that user didn't exist." });
}

module.exports = {
    users: users,
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy
}