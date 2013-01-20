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
        app.user_menu = ViewModelContainer('user_menu');

        app.current_user = null;

        app.layout_css = ko.observable('wrapper');


        $(app).on('login', function(e, user){
            app.user_menu.action(function(menu){
                menu.login(user);
            });
        });

        this.get('#Index', function () {
        	app.content.render("index", "/api/index");     	
        });

        this.get('#Users', function () {
            app.content.render("users");   
        });



        this.get('#NewUser', function () {
            app.content.render("new_user");   
        });

                
        this.get('#Login', function(){
            $.colorbox({
                onClosed : function(){
                    window.location = '#Index';
                },
                html:"<div id='test'><h1>Вход</h1><input data-bind='value : login' type='text'/> <input type='text' data-bind='value : password'/> <input type='button'  value='Войти' data-bind='click : login_click'/></div>"
            });

            var loginVM = function() {
                var self = this;
                self.login = '';
                self.password = '';
                self.login_click = function(){
                    window.location = '#Index';
                    $.colorbox.close();
                    $(app).trigger('login', 'vasa');
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
        });

        this.get('#add_konkurs', function(){

            app.content.render('defaulLoq', function(content){
                content.content.render('add_konkurs');
            });
            app.content.render('add_konkurs');
        });

		this.get('', function () {	
        	window.location = '#Index';
        });




	});
});		