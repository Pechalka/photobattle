define(["knockout", "jquery", "qq", "ko.mapping"],
    function(ko, $, qq, mapping) {
        return function(model){
            var self = this;

            self.user = mapping.fromJS({
                    name : '',
                    nick : '',
                    email : '',
                    password : '',
                    repeat_password : '',
                    description : '',
                    type : 'amateur'
                });

            self.save = function() {
                $.post("/api/user", ko.toJS(self.user), function() {
                    window.location = '#login_success';
                });

                return false;
            }

           self.agree_to_the_terms = ko.observable(false);

            self.can_create = ko.computed(function(){
             return   self.agree_to_the_terms() 
                && self.user.nick() != ''
                && self.user.email() != ''
                && self.user.password() != ''
                && self.user.password() == self.user.repeat_password();
            });
        };
    }
);