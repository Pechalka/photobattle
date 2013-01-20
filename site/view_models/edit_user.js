define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;
            self.user = ko.observable(model);

            self.save = function() {
                
                $.post("/api/update_user", self.user(), function() {
                    window.location = '#User/' + self.user()._id;
                });

                return false;
            }
           
        };
    }
);