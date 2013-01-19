var express = require('express')
  , app = express()
  , path = require('path')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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
]
};

  res.json(result);
});

app.listen(8080, function(){
  console.log("Express server listening on port %d", '8080');
});