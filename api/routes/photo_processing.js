var fs = require('fs')
var photo_upload_dir = __dirname + '/../../site/content/uploads/photos/';
var db = db = require('./../database').db;

exports.uploadPhoto = function(req, res) {
	var params		= req.query;
	var name		= (new Date()).valueOf() + '.' + params.qqfile.split('.').pop(),
		ws			= fs.createWriteStream(photo_upload_dir + name);

	req.on('data', function(data){
		ws.write(data);
	});

	req.on('end', function(){	
		console.log(req.query.user_id);	
		//todo : resize avatar (150x150, 36x36)
		db.User.findById(req.query.user_id, function(e, user){
	     	user.avatar_path = 'content/uploads/photos/' + name
	     	user.save(function(){
				res.json({ 
					avatar_path: user.avatar_path,
					success: true 
					}
				);
	     	});		  	
	  	});		
	});
};

exports.upload_contest_photo = function(req, res) {
	var params		= req.query;
	var name		= (new Date()).valueOf() + '.' + params.qqfile.split('.').pop(),
		ws			= fs.createWriteStream(photo_upload_dir + name);

	req.on('data', function(data){
		ws.write(data);
	});

	req.on('end', function(){	
		res.json({ 
			image_path: 'content/uploads/photos/' + name,
			success: true 
			}
		);	
	});
};

