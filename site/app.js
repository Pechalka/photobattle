define(["knockout", "jquery",

	"ViewModelContainer",

    "sammy",
    "colorbox"

	],function(ko, $, 
		ViewModelContainer,
		Sammy

		) {
		
	return Sammy(function(){
		var app = this;

		app.content = ViewModelContainer();

        app.user_menu = ViewModelContainer();

        app.user_list = ViewModelContainer();
        app.list_of_contests = ViewModelContainer();

        app.current_page = ko.observable('#Users');
        app.layout_css = ko.observable('');

        app.user = null;

        app.init = function(init_data){
            app.list_of_contests.render('list_of_contests', init_data.contests);

            app.user_list.render('user_rating', init_data.top_users);

            app.user_menu.render('user_menu', init_data.current_user);
            if (init_data.current_user)
                app.user = init_data.current_user;

            app.run();
        }


        $(app).on('login', function(e, user){
            app.user_menu.action(function(menu){
                menu.login(user);
                app.user = user;
            });
        });

        this.get('#Index', function () {
        	app.content.render("index", "/api/index");     	
            app.current_page(''); 
            app.layout_css('');
        });

        this.get('#Users', function () {
            app.content.render("users"); 
            app.current_page('#Users'); 
            app.layout_css('inner_wrapper');
        });



        this.get('#NewUser', function () {
            app.content.render("new_user");
            app.current_page('#Users');   
            app.layout_css('');
        });

        this.get('#sponsor', function () {
            app.content.render("sponsor");   
            app.current_page('#sponsor');
            app.layout_css('inner_wrapper');
        });

                
        this.get('#Login', function(){
            $.colorbox({
                onClosed : function(){
                    window.location = '#Index';
                },
                html:"<div id='test'><h1>Вход в систему</h1><span style='font-size:17px;'>Имя пользователя:</span><input data-bind='value : login' type='text'/> </br> <span style='font-size:17px;'>Пароль:</span> <input type='password' data-bind='value : password'/> </br> <input type='button'  value='Войти' data-bind='click : login_click'/></div>"
            });

            var loginVM = function() {
                var self = this;
                self.login = '';
                self.password = '';
                self.login_click = function(){
                    window.location = '#Index';
                    $.colorbox.close();
                    $.post('/api/login', { login : self.login, password : self.password}, function(result){
                        if (result.success)
                            $(app).trigger('login', result.user);
                                   
                    });
                }
            };

            ko.applyBindings(new loginVM(), $('#test')[0]);
        });


        this.get('#User/:id', function(){
            app.content.render('user_details', '/api/user/' + this.params["id"]);
            app.current_page('#Users');
            app.layout_css('inner_wrapper');
        });

        this.get('#add_konkurs', function(){
            app.content.render('add_konkurs', null, function(page) {
                    page.init_uploader();
            });
            app.current_page('#list_of_konkurs');
        });
        
        this.get('#EditUser/:id', function() {
            app.content.render('edit_user', '/api/user/' + this.params["id"],
                function(user) {
                    user.init_uploader();
                });
            app.layout_css('');
        });


        this.get('#list_of_konkurs', function(){        
            app.content.render('list_of_konkurs');
            app.current_page('#list_of_konkurs');
            app.layout_css('inner_wrapper');
        })

        this.get('#konkurs/:id', function(){
            app.content.render('konkurs_details', '/api/konkurs/' + this.params["id"]);
            app.current_page('#list_of_konkurs');
            app.layout_css('inner_wrapper');
        });

        this.get('#duel', function(){
            app.content.render('duel');
            app.current_page('#duel');
            app.layout_css('inner_wrapper');
        });

        this.get('#critic', function(){
            app.content.render('critic');
            app.current_page('#critic');
            app.layout_css('inner_wrapper');
        });

        this.get('#critic/new', function(){
            if (!app.user)  {
                window.location = '#Index';
                return;
            }

            app.content.render('critic_new', app.user,  function(page) {
                    page.init_uploader();
                });
            app.current_page('#critic');
            app.layout_css('inner_wrapper');
        });


        this.get('#critic/:id', function(){
            app.content.render('critic_details');
            app.current_page('#critic');
            app.layout_css('inner_wrapper');
        });

        

		this.get('', function () {	
       	    window.location = '#Index';
        });
	});
});		