define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.init = function() {
             new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: '/api/upload/photo',
                    onSubmit: function(a, b){
                       // $bar.width(0);
                       // $success.hide();
                       // $alert.add($progress)
                         //   .show();
                    },
                    onProgress: function(a, b, c){
                        // var percent = Math.floor(100 * (b / c)) + '%';
                        // $bar.width(percent);
                    },
                    onComplete: function(a, b, r){
                        // self.collection.create({ src: r.src, name : r.name });
                        // $progress.hide();
                        // $success.show();
                        // $alert.delay(1200).fadeOut(500);
                    },
                    template: '<div class="qq-uploader">' +
                                    '<pre class="qq-upload-drop-area"><span>{dragText}</span></pre>' +
                                    '<div class="qq-upload-button btn btn-primary" style="width: auto;">upload</div>' +
                                    '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                                    '</div>'

                });

            }


           
        };
    }
);