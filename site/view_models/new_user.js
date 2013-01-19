define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.init_uploader = function() {
                new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: '/api/upload/photo',
                    onComplete: function(a, b, r){
                          self.user.avatar('content/uploads/photos/1358614721753.jpg');
                        
                    },
                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button btn btn-primary" style="width: auto;">upload</div>' +
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'

                });

            }

            self.user = {
                    name : '',
                    nick : '',
                    email : '',
                    avatar : ko.observable('')
                };

            self.save = function() {
                $.post("/api/user", self.user, function() {
                    window.location = '#Index';
                });
            }
           
        };
    }
);