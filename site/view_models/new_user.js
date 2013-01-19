define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.user = {
                    name : '',
                    nick : '',
                    email : '',
                    password : '',
                    repeat_password : '',
                    type : ko.observable('amateur')
                };

            self.save = function() {
                $.post("/api/user", self.user, function() {
                    window.location = '#Index';
                });
            }
           
        };
    }
);