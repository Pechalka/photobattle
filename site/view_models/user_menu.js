define(["knockout", "jquery", "app"],
    function(ko, $, app) {
        return function(model){
            var self = this;

            model = model || {
                name : '',
                _id : ''
            }

            self.user_name = ko.observable(model.name);
            self.user_id = ko.observable(model._id);



            self.login = function(user){
                self.user_name(user.name);
                self.user_id(user._id);
            }

            self.show_login = function(){
                $(app).trigger('show_login');
            };

            self.logout = function(){
                $.post('/api/logout', function(){
                    $(app).trigger('logout');
                    app.user = null;
                    self.user_name('');
                    self.user_id('');
                  //  window.location = '#Index';
                });

            }
        };
    }
);