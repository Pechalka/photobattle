define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;
                self.login = '';
                self.password = '';
                self.login_click = function(){
                    if (self.login == '' || self.password == '')
                        return;
                    $.post('/api/login', { login : self.login, password : self.password}, function(result){
                        if (result.success){
                            $(app).trigger('login', result.user);
                            $.colorbox.close();
                        }
                    });
                }
        };
    }
);