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
                    description : '',
                    type : ko.observable('amateur')
                };

            self.save = function() {
                $.post("/api/update_user", self.user, function() {
                    window.location = '#Login';
                });

                return false;
            }
           
        };
    }
);