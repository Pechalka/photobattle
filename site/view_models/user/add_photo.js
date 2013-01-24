define(["knockout", "jquery", "qq", "app"],
    function(ko, $, qq, app) {
        return function(model){
            var self = this;

            self.user_id = model.user_id;
            self.image_path = ko.observable('img/no_image.png');
            self.title = ko.observable('');
            self.description = '';

            self.close = function(){
                $.colorbox.close();
            }

            self.init_uploader = function() {
                new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: '/api/upload/contest',

                    onComplete: function(a, b, r){
                          $('.qq-upload-list').hide();
                          self.image_path( r.image_path);
                    }
                    ,                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button"><button  class="grey_button " type="button" >Добавить изображение</button></div>' +
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'
                });

            };

            self.add_photo = function(){
                var data = {
                    user_id : self.user_id,
                    image_path : self.image_path,
                    title : self.title(),
                    description : self.description
                };
                $.post('/api/user/add_photo', data, function(){
                    $(app).trigger('add_photo');
                });
                $.colorbox.close();
            }

            self.can_create = ko.computed(function(){
                return self.user_id != ''
                && self.title() != ''
                && self.image_path() != ''
                && self.image_path() != 'img/no_image.png';
            });
        };
    }
);