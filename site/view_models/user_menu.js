define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.user_name = ko.observable('');
            self.user_id = ko.observable('');


            self.login = function(user){
                self.user_name(user.name);
                self.user_id(user._id);
            }

            self.logout = function(){
                self.user_name('');
                window.location = '#Index';
            }
        };
    }
);