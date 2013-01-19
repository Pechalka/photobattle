define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.users = ko.observableArray([]);

            self.type = ko.observable('amateur');
            self.page = ko.observable(1);

            self.set_professional = function(){
                self.type('professional');                
            }

            self.set_amateur = function(){
                self.type('amateur');
            }

             ko.computed(function(){
                $.get("/api/users_by_rating", { type : self.type() , page : self.page() }, self.users);
             });   

            
        };
    }
);