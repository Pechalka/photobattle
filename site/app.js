define(["knockout", "jquery",

	"ViewModelContainer",

    "sammy",
    "colorbox"

	],function(ko, $, 
		ViewModelContainer,
		Sammy

		) {
	if (!window.app)  
	window.app = Sammy(function(){
		var app = this;

		app.content = ViewModelContainer();

        app.user_menu = ViewModelContainer();

        app.user_list = ViewModelContainer();
        app.list_of_contests = ViewModelContainer();
        app.popup = ViewModelContainer();


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

        $(app).on('show_login', function(){
            app.popup.render('login_form', null, function(){
                $.colorbox({
                    onClosed : function(){
                        app.popup(null);
                    },
                    inline : true,
                    href : '#login_form'
                });
            });
        });

        $(app).on('show_add_photo', function(e, user_id){
            app.popup.render('user/add_photo', { user_id : user_id }, function(popup){
                $.colorbox({
                    onClosed : function(){
                        app.popup(null);
                    },
                    inline : true,
                    href : '.popup'
                });
                popup.init_uploader();
            });

        });

        this.get('#Index', function () {
        	app.content.render("index", "/api/index");     	
            app.current_page(''); 
            app.layout_css('');
        });

        this.get('#Users', function () {
            app.content.render("user/list"); 
            app.current_page('#Users'); 
            app.layout_css('inner_wrapper');
        });

        this.get('#Users/new', function () {
            app.content.render("user/new");
            app.current_page('#Users');   
            app.layout_css('');
        });

        this.get('#Users/:id', function(){
            app.content.render('user/details', '/api/user/' + this.params["id"]);
            app.current_page('#Users');
            app.layout_css('inner_wrapper');
        });

        this.get('#Users/:id/edit', function() {
            app.content.render('user/edit', '/api/user/' + this.params["id"],
                function(user) {
                    user.init_uploader();
                });
            app.layout_css('');
        });

        this.get('#sponsor', function () {
            app.content.render("sponsor");   
            app.current_page('#sponsor');
            app.layout_css('inner_wrapper');
        });

        

        this.get('#add_konkurs', function(){
            app.content.render('add_konkurs', null, function(page) {
                    page.init_uploader();
            });
            app.current_page('#list_of_konkurs');
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


        this.get('#duel/new', function(){
            app.content.render('duel_new', '/api/duel_new', function(page) {
                    page.init_uploader();
                });
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
            app.content.render('critic_details', '/api/critic/' + this.params["id"], function(content){
                if (app.user)
                    content.show_add_comment_form(app.user);
            });
            app.current_page('#critic');
            app.layout_css('inner_wrapper');
        });

        this.get('#login_success', function(){
            app.content.render('login_success');
            app.current_page('');
            app.layout_css('inner_wrapper');
        });

		this.get('', function () {	
       	    window.location = '#Index';
        });
	});
    return window.app;
});		