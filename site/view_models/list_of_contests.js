define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.contests = [
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '1', image_path : 'img/ava_1.jpg' },
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '2', image_path : 'img/ava_1.jpg'},
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '3', image_path : 'img/ava_1.jpg'},
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '4', image_path : 'img/ava_1.jpg'},
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '5', image_path : 'img/ava_1.jpg'},
            	{ title : 'Осень', sale_type : 'профессиональный' , _id : '6', image_path : 'img/ava_1.jpg'}            		
            ];
        };    
    }
);