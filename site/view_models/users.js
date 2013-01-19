define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.users = ko.observableArray([]);

            self.type = ko.observable('amateur');
            self.page = ko.observable(1);
            self.pages = ko.observableArray([])

            self.set_professional = function(){
                self.type('professional');                
            }

            self.set_amateur = function(){
                self.type('amateur');
            }

             ko.computed(function(){
                $.get("/api/users_pager", { page : self.page() }, function(res) {
                    self.pages([]);
                    for (var i=1, j=res.total_pages; i <= j; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 
                    self.users(res.users);
                });
             });   

            
        };
    }
);