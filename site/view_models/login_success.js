define(["app"],
    function(app) {
        return function(model){
            this.show_login = function(){
                $(app).trigger('show_login');    
            }

            $(app).on('login', function(user){
                window.location = '#Index';
            });            
        };
    }
);