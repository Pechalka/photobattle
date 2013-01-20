var express = require('express')
  , app = express()
  , path = require('path')
 // , passport = require('passport')
 // , LocalStrategy = require('passport-local').Strategy
  , db = require('./database').db
  , photo_processing = require('./routes/photo_processing');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.static(__dirname + "/../site/"));


app.get('/api/app_start', function(req, res){
  var data = {
                contests :[
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '1', image_path : 'img/ava_1.jpg' },
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '2', image_path : 'img/ava_1.jpg'},
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '3', image_path : 'img/ava_1.jpg'},
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '4', image_path : 'img/ava_1.jpg'},
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '5', image_path : 'img/ava_1.jpg'},
                                { title : 'Осень', sale_type : 'профессиональный' , _id : '6', image_path : 'img/ava_1.jpg'}                    
                            ],
                top_users : [
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '1'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '2'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '3'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '4'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '5'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '6'},
                { name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '7'}
            ],

            current_user : {
                user_name : '',
                _id : ''
            }

            };
    res.json(data, 200);        
});

app.get('/api/konkurs/:id', function(req, res){
  db.Battle.findById(req.params.id, function(e, item){
      res.json(item, 200);
  });
});

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

app.get('/api/list_of_konkurs', 
  function (req, res) {
    var qpage = req.query.page || 1;
    var qtype = req.query.type || "Общий";
    db.Battle.paginate({sale_type : qtype}, qpage, 10,
      function(e, pages_count, items) {
        res.json({
          items : items,
          total_pages : pages_count,
          page : qpage
        },200)
      });
});

app.post('/api/add_konkurs', function(req, res){
  //var data = JSON.parse(req.body);
  //console.log(data);
  
  var battle = new db.Battle(req.body);
  battle.save();

  res.json('ok');
});

app.get('/api/user/:id', function(req, res){
  console.log(req.params);
  db.User.findById(req.params.id, function(e, user){
      res.json(user, 200);
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

app.get('/api/users_pager', 
  function (req, res) {
    var qpage = req.query.page || 1;
    var qtype = req.query.type || "amateur";
    db.User.paginate({type : qtype}, qpage, 10,
      function(e, pages_count, items) {
        res.json({
          users : items,
          total_pages : pages_count,
          page : qpage
        },200)
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

app.post('/api/update_user', function (req, res) {
  console.log(req.body._id);
  db.User.findById(req.body._id, function (err, user) {
      if (err) throw err;

      user.name = req.body.name;
      user.nick = req.body.nick;
      user.description = req.body.description;
      user.save();
      
      res.json(user, 200);
    });
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