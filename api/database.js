var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = Schema.ObjectId
	,db = {};

mongoose.Model.paginate = function(q, pageNumber, resultsPerPage, callback){ 
  var model = this;
  callback = callback || function(){};
  
  var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
  var query = model.find(q).skip(skipFrom).limit(resultsPerPage);

  query.exec(function(error, results) {
    if (error) {
      callback(error, null, null);
    } else {
      model.count(q, function(error, count) {
        if (error) {
          callback(error, null, null);
        } else {
          var pageCount = Math.ceil(count / resultsPerPage);
          if (pageCount == 0) // fix : 1 of 0
            pageCount = 1;
          callback(null, pageCount, results);
        }
      });
    }
  });
};

mongoose.connect('mongodb://localhost/photobattle');

var UserSchema = new Schema ({
	name: String,
	password: String,
	nick: String,
	email: String,
	description: { type : String, default : '' },
	avatar_path: { type : String, default : 'img/no_ava.jpg' }, //  img/big_ava.jpg
	rating: { type : Number, default : 0 },
	type: { type : String, default : 'amateur' }
});


var BattleSchema = new Schema({
	title: String,
	description: String,
	
	sale_type : String,

	winner_type : String,

	start: Date,
	end: Date,

	image_path : { type : String, default : 'img/no_ava.jpg' } //img/ava_1.jpg
});

var CriticSchema = new Schema({
	name : String,
	description: String,
	
	user_id : String,
	user_nick : String,
	user_type : String, 

	image_path : { type : String, default : 'img/img_2.jpg' } 

});

var CommentSchema = new Schema({
	text : String,
	date: String,
	
	user_id : String,
	user_nick : String,

	avatar_path : String,

	critic_id : String
});

var DuelSchema = new Schema({
	avatar_path1 : String,
	user_nick1 : String,
	user_id1 : String,
	name1 : String,

	avatar_path2 : String,
	user_nick2 : String,
	user_id2 : String,
	name2 : String,

	type : String
});

var PhotoSchema = new Schema({
	title: String,
	description: String,

	image_path :  String,

	created_date : { type: Date, default: Date.now }
});



db.User = mongoose.model('User', UserSchema);
db.Battle = mongoose.model('Battle', BattleSchema);
db.Critic = mongoose.model('Critic', CriticSchema); 
db.Comment = mongoose.model('Comment', CommentSchema); 
db.Duel = mongoose.model('Duel', DuelSchema); 
db.Photo = mongoose.model('Photo', PhotoSchema); 

exports.db = db;


