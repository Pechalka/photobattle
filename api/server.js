var express = require('express')
  , app = express()
  , path = require('path')
 // , passport = require('passport')
 // , LocalStrategy = require('passport-local').Strategy
  , db = require('./database').db
  , photo_processing = require('./routes/photo_processing');

app.use(express.static(__dirname + "/../site/"));
app.use(express.bodyParser());



app.get('/api/index', function(req, res){

var result = {
    top_users : [
        { name : 'test1', nick : 'test2', avatar_path : 'test.jpg', _id : '' },
        { name : 'test2', nick : 'test2', avatar_path : 'test.jpg', _id : '' },
        { name : 'test3', nick : 'test2', avatar_path : 'test.jpg', _id : '' },
        { name : 'test4', nick : 'test2', avatar_path : 'test.jpg', _id : '' },
        { name : 'test5', nick : 'test2', avatar_path : 'test.jpg', _id : '' }
    ],
    top_images : [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",        
    ],
    current_batle : {
                image_path : 'test.jpg',
                name : 'лучшй пейзаж'
            },
            winner :  {
                photo_path : 'test.jpg',
                photo_name : 'метрополитен',
                user_name : 'Иван Иваныч'
            }
};

  res.json(200, result);
});


// photo processing

app.post('/api/upload/photo', 
  photo_processing.uploadPhoto
);

app.listen(8080, function(){
  console.log("Express server listening on port %d", '8080');
});