define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.active = ko.observable("#Users");

            self.items = model;

        };
    }
);