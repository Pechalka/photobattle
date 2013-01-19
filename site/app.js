define(["knockout", "jquery",

	"ViewModelContainer",

    "sammy"

	],function(ko, $, 
		ViewModelContainer,
		Sammy

		) {
		
	return Sammy(function(){
		var app = this;

		app.menu = ViewModelContainer("widgets/menu", '/api/menu');
		app.content = ViewModelContainer();

        app.rating = ViewModelContainer("widgets/rating");

        this.get('#Index', function () {
        	app.content.render("index");     	
        });

		this.get('', function () {			
        	window.location = '#Users';
        });



	});
});		