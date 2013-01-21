define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(current_user){
            var self = this;

            self.image_path = ko.observable('img/no_ava.jpg');
            self.name = '';
            self.description = '';

            self.init_uploader = function() {
                new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: '/api/upload/contest',
                   // params : { user_id : self.user._id() },


                    onComplete: function(a, b, r){
                          $('.qq-upload-list').hide();
                          self.image_path( r.image_path);
                    }
                    ,                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<button class="grey_button qq-upload-button" >Изменить изображение</button>' + 
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'
                });
           
            };

            self.save = function(){
            	var data = {
            		image_path : self.image_path(),
		            name : self.name,
		            description : self.description,
		            user_id : current_user._id,
		            user_nick : current_user.nick,
		            user_type : current_user.type
            	};
                debugger
            	$.post('/api/critic/new', data, function(){
            		window.location = '#critic';
            	});
            }
        };
    }
);