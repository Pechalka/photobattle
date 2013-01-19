define(["knockout", "jquery"], 
	function(ko, $) {

		// var render_partical = function(observable, name, model){
		// 	require(["text!/views/" + name + ".html", "/view_models/" + name + ".js"], 
		// 		function(view, ViewModel){
		// 			observable({
		// 				data : new ViewModel(model),
		// 				html : view
		// 			});
		// 		});
		// }

		// var render_action = function(observable, name, data_url) {
		// 	$.get(data_url, function(model) {
		// 		render_partical(observable, name, model);
		// 	});
		// };

		// return {
		// 	render_partical : render_partical,
		// 	render_action : render_action
		// };

		return function(observable, name, model){
			require(["text!/views/" + name + ".html", "/view_models/" + name + ".js"], 
				function(view, ViewModel){
					observable({
						data : new ViewModel(model),
						html : view
					});
				});
		}
	}	
);