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
	avatar_path: { type : String, default : 'img/big_ava.jpg' },
	rating: { type : Number, default : 0 },
	type: { type : String, default : 'amateur' }
});


var BattleSchema = new Schema({
	title: String,
	description: String,
	
	sale_type : String,

	winner_type : String,

	start: Date,
	end: Date
});

db.Picture = new Schema({
	title: String,
	image_path: String,
	battle_id: { type: ObjectId, ref: 'Battle' }
});

db.User = mongoose.model('User', UserSchema);
db.Battle = mongoose.model('Battle', BattleSchema)

exports.db = db;


