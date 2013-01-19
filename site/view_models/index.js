define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;


            self.top_users = model.top_users;
            self.top_images = model.top_images;

        };
    }
);