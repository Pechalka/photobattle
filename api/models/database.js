var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photobattle');
var Schema = mongoose.Schema;


var User = new Schema ({
	name: String,
	nick: String,
	avatar_path: String,
	rating: Number
	type:
});

var Battle = new Schema({
	title: String,
	image_path: String,
	description: String,
	type: Number,
	start_date: Date,
	end_date: Date,
	prize: Number
});

var Picture = new Schema({
	title: String,
	image_path: String,
	battle_id: { type: ObjectId, ref: 'Battle' }
})


var battle_types = {
	0 : "general",
	1 : "sponsor",
	2 : "duel" 
};

var user_type = {
	0: "admin",
	1: "amateur",
	2: "professional"
}
