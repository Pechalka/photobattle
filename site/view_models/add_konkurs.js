define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.title = '';
            self.description = '';
            self.sale_type = ko.observable('Общий');
            self.winner_type = ko.observable('vote');

            self.initial_fee = '';
            self.budget = ''; 

            self.jury = ko.observableArray([]);

            self.start = '';
            self.end = '';

            self.image_path = ko.observable('img/no_ava.jpg');

            self.new_jury = {
                name : ko.observable(''),
                description : ko.observable('')
            };

            self.add_jury = function(){//todo: sent jury on server
                self.jury.push(self.new_jury);
                self.new_jury.name('');
                self.new_jury.description('');  
            }

            self.add_konkurs = function(){
                var data = {
                    title : self.title,

                    title : self.title,
                    description : self.description,
                    sale_type : self.sale_type,
                    winner_type : self.winner_type,

                    initial_fee : self.initial_fee,
                    budget : self.budget ,

                    start :    self.start,
                    end   :     self.end ,

                    image_path : self.image_path
                };

                //ko.toJSON(self);
                $.post('/api/add_konkurs', data, function(){
                    window.location = '#Index';
                });
            }

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
        };
    }
);