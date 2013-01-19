var db = require('./database').db
	,User = db.User;

var user1 = new User({
	name: "Dmitry Dmitrievich",
	nick: "Dimon",
	avatar_path: "/dimon.jpeg",
	rating: 0,
	type: 1
});

user1.save();