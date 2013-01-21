var express = require('express')
  , app = express()
  , path = require('path')
  , db = require('./database').db
  , photo_processing = require('./routes/photo_processing');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.static(__dirname + "/../site/"));

app.use(express.session({ secret: 'gangnam style'} ));


app.get('/api/app_start', function(req, res){

  db.User.find({}, function(e, users){      
     db.Battle.find({}, function(e, contests) {
            var data = {
                  contests :contests,
                  top_users : users
              ,
              current_user : req.session.current_user 

              };
    res.json(data, 200);  
      });     
  }); 
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
  db.User.findById(req.params.id, function(e, user){
      res.json(user, 200);
  });
});

// user


app.post('/api/logout', function(req, res){
  req.session.destroy();
  res.json('logout');
});

app.post('/api/login', function(req, res){
  db.User.find({ nick : req.body.login, password : req.body.password}, function(e, users){
      
      req.session.current_user = users[0];

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


app.post('/api/critic/new', function(req, res){
    var critic = new db.Critic(req.body).save();
    res.json(critic, 200);
});

app.get('/api/critic/list', function(req, res){
    var qpage = req.query.page || 1;
    var qtype = req.query.type || "amateur";
    db.Critic.paginate({user_type : qtype}, qpage, 10,
      function(e, pages_count, items) {
        res.json({
          items : items,
          total_pages : pages_count,
          page : qpage
        },200)
      });
});


app.post('/api/upload/contest', 
  photo_processing.upload_contest_photo
 );

app.listen(8080, function(){
  console.log("Express server listening on port %d", '8080');
});

