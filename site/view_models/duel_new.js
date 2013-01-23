define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.type = ko.observable('Открытая');

            self.avatar_path1 = ko.observable('img/no_ava.jpg');
            self.avatar_path2 = ko.observable('img/no_ava.jpg');


            self.users = model;

            self.user1 = ko.observable();
			self.user2 = ko.observable();

			self.name1 = '';
			self.name2 = '';

            self.create = function(){
            	var data = {
            		avatar_path1 : self.avatar_path1(),
            		user_nick1 : self.user1().nick,
            		user_id1 : self.user1()._id,
            		name1 : self.name1,

            		avatar_path2 : self.avatar_path2(),
            		user_nick2 : self.user2().nick,
            		user_id2 : self.user1()._id,
            		name2 : self.name2,

            		type : self.type()
            	};

            	$.post('/api/duel_create', data, function(res){
            		window.location = '#duel';
            	});
            };

			self.init_uploader = function() {
                new qq.FileUploader({
                    element: $('#photo-upload1')[0],
                    action: '/api/upload/contest',
                    
                    onComplete: function(a, b, r){
                          $('.qq-upload-list').hide();
                          self.avatar_path1( r.image_path);
                    }
                    ,                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button"><button  class="grey_button " type="button" >Изменить изображение</button></div>' + 
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'
                });
           
           		new qq.FileUploader({
                    element: $('#photo-upload2')[0],
                    action: '/api/upload/contest',
                    onComplete: function(a, b, r){
                          $('.qq-upload-list').hide();
                          self.avatar_path2( r.image_path);
                    }
                    ,                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button"><button  class="grey_button " type="button" >Изменить изображение</button></div>' + 
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'
                });
            };

        };
    }
);