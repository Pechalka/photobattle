var db = require('./../database').db
	, User = db.User;


exports.add_user = function(req, res) {
	var data = req.body;
	var user = new User({
		name: data.name,
		nick: data.nick,
		email: data.email,
		avatar_path: data.avatar_path,
		rating: data.rating ?? 0,
		type: data.type
	}).save();
	res.json(user, 200);
};
