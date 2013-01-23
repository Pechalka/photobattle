define(["knockout", "jquery", "app"],
    function(ko, $, app) {
        return function(model){
            var self = this;

            self.critic = model.critic;

            self.new_coment = ko.observable('');

            self.add_coment = function(){
            	var data = { 
            		text : self.new_coment(), 
            		date : '15/12/2003', 
            		user_nick : self.current_user.name, 
            		user_id : self.current_user._id, 
            		avatar_path : self.current_user.avatar_path ,
            		critic_id : self.critic._id
            	};
            	self.new_coment('');
            	$.post('/api/critic/add_comment', data, function(res){
                    self.pages([]);
                    for (var i=1, l=res.total_pages; i <= l; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 
                    self.comments(res.items);
            	});
            }

            self.show_add_comment_form = function(user){
            	self.can_add(true);
            	self.current_user = user;
            }

            self.current_user = null;
            self.can_add = ko.observable(false);

            self.page = ko.observable(1);
            self.pages = ko.observableArray([1, 2, 3]);

            self.comments = ko.observableArray(model.comments);

            self.pages([]);
            for (var i=1, l=model.total_pages; i <= l; i++) {
                self.pages.push(i);
            }
            self.page(model.page); 
            self.comments(model.items);

            self.go_to_page = function(page){
            	$.get('/api/critic/' + self.critic._id , { page : page},function(res){
            		self.pages([]);
                    for (var i=1, l=res.total_pages; i <= l; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 
                    self.comments(res.items);
            	});
            }


            $(app).on('login', function(user){
                self.show_add_comment_form(user);
            });

            $(app).on('logout', function(user){
                self.current_user = null;
                self.can_add(false);
            });
        };
    }
);