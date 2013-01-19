var fs = require('fs')
var photo_upload_dir = __dirname + '/../../site/content/uploads/photos/';

exports.uploadPhoto = function(req, res) {
	var params		= req.query;
	var name		= (new Date()).valueOf() + '.' + params.qqfile.split('.').pop(),
		ws			= fs.createWriteStream(photo_upload_dir + name);

	req.on('data', function(data){
		ws.write(data);
	});

	req.on('end', function(){		
		res.json({ 
			success: true 
			}
		);
	});
};