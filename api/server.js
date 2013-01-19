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
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",   
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",
            "img/small_img_3.jpg",
            "img/small_img_3.jpg"     
        ],
        current_batle : {
                    image_path : 'img/img_1.jpg',
                    name : 'лучшй пейзаж'
                },
                winner :  {
                    photo_path : 'img/img_2.jpg',
                    photo_name : 'метрополитен',
                    user_name : 'Иван Иваныч'
                }
    };
    res.json(200, result);
  });
});
// user

app.post('/api/login', function(req, res){
  db.User.find({ nick : req.body.login, password : req.body.password}, function(e, users){
      var data = {
        success : users.length > 0,
        user :  users[0]
      };
      console.log(data);
      res.json(data, 200);
  });
});

app.get('/api/users', 
  function (req, res) {
    db.User.find({}, function(e, users){
      res.json(users, 200);
    });
});

app.get('/api/users_by_rating', 
  function (req, res) {
    db.User.find({})
    .sort('-rating')
    .exec(
      function(e, users){
        res.json(users, 200);
    });
});

app.get('/api/top_users',
  function (req, res) {
    db.User.find({})
    .sort('-rating')
    .limit(10)
    .exec(
      function(e, users){
        res.json(users, 200);
    });
});


app.post('/api/user', 
  function (req, res) {
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


// <a href="#" class="prev_img">
//                             <img src="img/small_img_1.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_2.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_3.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_1.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_2.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_3.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_2.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_3.jpg" alt=""/>
//                         </a>
//                         <a href="#" class="prev_img">
//                             <img src="img/small_img_2.jpg" alt=""/>
//                         </a>

// {# <ul data-bind="foreach : top_users">
//     <li>
//         <img src="" data-bind="attr : { src : avatar_path}">
//         <a href="#" data-bind="text: nick"></a>
//         <span data-bind="text : name"></span>
//     </li>
// </ul>


// <ul data-bind="foreach : top_images">
//     <li>
//         <img src="" data-bind="attr : { src : $data}">
//     </li>
// </ul>

// <div data-bind="with : current_batle"> 
//     <img data-bind="attr : { src : image_path}">
//     <span data-bind="text : name"></span>
// </div>


// <div data-bind="with : winner"> 
//     <img data-bind="attr : { src : photo_path}">
//     <span data-bind="text : photo_name"></span>
//     <span data-bind="text : user_name"></span>
// </div> #}


// <h1>Регистрация</h1>

// <div data-bind="with : user">
//   <span>Имя:</span>
//     <input type="text" data-bind="value : name"/></br>
//     <span>Ник:</span>
//     <input type="text" data-bind="value : nick"/></br>
//     <span>Емэйл:</span>
//     <input type="text" data-bind="value : email"/></br>
    
//     <input type="radio" name="group1" value="amateur" data-bind="checked : type"> Любитель</br>
//     <input type="radio" name="group1" value="professional" data-bind="checked : type"> Профи</br> 
// </br>
    
// </div>

// <input type="button" value="save" data-bind="click : save" />