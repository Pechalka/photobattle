define(["knockout", "jquery", "qq", "ko.mapping"],
    function(ko, $,qq, mapping) {
        return function(model){
            var self = this;
            self.user = mapping.fromJS(model);

            self.save = function() {
                
                $.post("/api/update_user", ko.toJS(self.user), function() {
                    window.location = '#Users/' + self.user._id();
                });

                return false;
            };

            self.init_uploader = function() {
                new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: '/api/upload/photo',
                    params : { user_id : self.user._id() },


                    onComplete: function(a, b, r){
                          $('.qq-upload-list').hide();
                          self.user.avatar_path( r.avatar_path);
                    }
                    ,                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button"><button  class="grey_button " type="button" >Изменить изображение</button></div>' +
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'
                });

            };
        };
});