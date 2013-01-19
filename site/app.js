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

		this.get('', function () {			
        	window.location = '#Index';
        });



	});
});		