define(["jquery", "knockout", "stringTemplateEngine"], function ($, ko) {
    return function() {
        var observable = ko.observable(null);

        var rendring_procces = null;
        var render_by_model = function(view_model_name, model, callback) {
            rendring_procces = $.Deferred();
            require(["text!/views/" + view_model_name + ".html", "/view_models/" + view_model_name + ".js"],
                function(view, ViewModel) {
                    var viewModel = new ViewModel(model);
                    observable({
                        data: viewModel,
                        html: view,
                        view_model_name: view_model_name
                    });
                    if (callback)
                        callback(viewModel);

                    rendring_procces.resolve(viewModel);
                }
            );
            return rendring_procces.promise();
        };

        observable.render = function(view_model_name, data, callback) {
            if (typeof(data) == 'string') { // if model string like app.page.render('general/schoolyears', 'api/catalog/schoolyears.json');
                var $get_data = $.get(data);

                rendring_procces = $get_data.pipe(function(model){
                    return render_by_model(view_model_name, model, callback);
                });

                return rendring_procces;
            } else {
                return render_by_model(view_model_name, data, callback);
            }
        };

        observable.is = function (view_model_name) {
            return observable() && observable().view_model_name && observable().view_model_name == view_model_name;
        };

        observable.action = function (callback) {
            //todo: rendring_procces = null;
            rendring_procces.done(function(){
                callback(observable().data);
            });            
        };

        if (arguments.length > 0){
            observable.render.apply(observable, arguments);
        }

        return observable;
    };
});