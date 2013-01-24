define(["knockout", "jquery", "qq", "app"],
    function(ko, $, qq, app) {
        return function(model){
            var self = this;

            self.users = ko.observableArray([]);

            self.type = ko.observable('amateur');
            self.page = ko.observable(1);
            self.pages = ko.observableArray([]);

            self.set_professional = function(){
                self.type('professional');                
            }

            self.set_amateur = function(){
                self.type('amateur');
            }

            self.refresh = function(){
                $.get("/api/users_pager", { page : self.page(), type : self.type() }, function(res) {
                    self.pages([]);
                    for (var i=1, j=res.total_pages; i <= j; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 

                    var users = ko.utils.arrayMap(res.users, function(item) {
                        item.show_button = app.user;
                        item.is_me = app.user && app.user._id == item._id;
                        return item;
                    });
                    self.users(users);
                });
             };
            ko.computed(self.refresh);   

            //todo: clear memory mechanism
            $(app).on('login', function(user){
                self.refresh();
            });

            $(app).on('logout', function(user){
                self.refresh();
            });
            
        };
    }
);