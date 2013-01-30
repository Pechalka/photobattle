define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;
debugger
            self.top_users = model.top_users;
            self.top_images = model.top_images;


            self.current_batle = model.current_batle;

            self.winner =  model.winner;
        };
    }
);