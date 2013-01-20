define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.user_name = ko.observable(model.name);
            self.user_id = ko.observable(model._id);


            self.login = function(user){
                self.user_name(user.name);
                self.user_id(user._id);
            }

            self.logout = function(){
                $.post('/api/logout', function(){
                    self.user_name('');
                    self.user_id('');
                    window.location = '#Index';
                });

            }
        };
    }
);