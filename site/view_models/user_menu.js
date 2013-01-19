define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.user_name = ko.observable('');

            self.login = function(user_name){
                self.user_name(user_name);
            }

            self.logout = function(){
                self.user_name('');
                window.location = '#Index';
            }
        };
    }
);