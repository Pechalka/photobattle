
require.config({
    paths: {
        "jquery": "vendor/jquery-latest",
        "knockout": "vendor/knockout/knockout-min",
        "ko.mapping" : "vendor/knockout/knockout.mapping",
        "text": "vendor/require/text",
        "sammy" : "vendor/sammy-latest.min",
        "bootstrap" : "vendor/bootstrap/js/bootstrap.min",
        "qq" : "vendor/qq/qq",


        "stringTemplateEngine": "libs/stringTemplateEngine",
        "ViewModelContainer" : "libs/ViewModelContainer",
        "Grid" : "libs/SimpleGrid",

        "colorbox" : "vendor/colorbox/jquery.colorbox-min"
    },
    shim: {
        "ko.mapping" : ["knockout"],
        "stringTemplateEngine": ["knockout"],
        "bootstrap" : ["jquery"],
       "colorbox" : ["jquery"]
    }
});

require([

	"knockout",
    "jquery",

    "app",

    "libs/enterKey",
    "stringTemplateEngine",

    "bootstrap"

    ], function(ko, $, App, Sammy){
        
		$(function() {

			window.app = App;
			ko.applyBindings(app);

 //           $(app).trigger('login', 'vasa');

			app.run();
		});


	
});