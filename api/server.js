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
  db.User.find({}, function(e, users){
    var result = {
        top_users : users,
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
});
// user

app.get('/api/users', 
  function (req, res) {
    db.User.find({ type : req.body.type }, function(e, users){
      res.json(users, 200);
    });
});

app.get('api/top_users',
  function (req, res) {
    db.User.find({ type : req.body.type }, function(e, users){
      res.json(users, 200);
    });
});


app.post('/api/user', 
  function (req, res) {
    console.log(req.body);
    var user = new db.User(req.body).save();
    res.json(user, 200);
  });
// battle

app.get('/api/battles', 
  function (req, res) {
    db.Battle.find( function(e, battles){
      res.json(battles, 200);
    });
});

app.get('api/active_battles',
  function (req, res) {
    db.Battle.find()
    .where('start_date').lt(new Date())
    .where('end_date').gt(new Date())
    .exec(function(e, battles){
      res.json(battles, 200);
    });
});

app.post('/api/battle', 
  function (req, res) {
    console.log(req.body);
    var battle = new db.Battle(req.body).save();
    res.json(battle, 200);
});

// photo processing

app.post('/api/upload/photo', 
  photo_processing.uploadPhoto
);

app.listen(8080, function(){
  console.log("Express server listening on port %d", '8080');
});