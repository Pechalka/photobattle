define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.users = [
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '1'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '2'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '3'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '4'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '5'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '6'},
            	{ name : 'Вася Пупкин', avatar_path : 'img/ava_2.jpg', nick : 'komo' , _id : '7'}
            ];
        };    
    }
);