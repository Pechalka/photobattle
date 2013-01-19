var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dburl = 'mongodb://localhost/grid';

mongoose.connect(dburl);

var userSchema = new Schema({
    FirstName: String,
    LastName: String,
    Gender: Boolean,
    Age: {type:Number, default: 1 }
});

mongoose.model('User', userSchema);

var User = mongoose.model('User');

User.remove({}, function(){
});

for (var i = 0; i<100; i++){
    var newUser = new User({
        FirstName: "User " + i ,
        LastName: "User "+i+" LastName",
        Gender: true,
        Age: Math.floor((Math.random()*25)+16)
    });
    newUser.save(function(err){
        console.log(err);
    });
} 

mongoose.disconnect();