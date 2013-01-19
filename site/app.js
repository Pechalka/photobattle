define(["knockout", "jquery",

	"ViewModelContainer",

    "sammy"

	],function(ko, $, 
		ViewModelContainer,
		Sammy

		) {
		
	return Sammy(function(){
		var app = this;

		app.content = ViewModelContainer();

        this.get('#Index', function () {

        	app.content.render("index", "/api/index");     	
        });

        this.get('#Users', function () {
            app.content.render("users");   
        });

        this.get('#NewUser', function () {
            app.content.render("new_user");   
        });

		this.get('', function () {	
        		
        	window.location = '#Index';
        });



	});
});		