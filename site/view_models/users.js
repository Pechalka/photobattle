define(["knockout", "jquery", "qq"],
    function(ko, $, qq) {
        return function(model){
            var self = this;

            self.users = ko.observableArray([]);

            $.get("/api/users", { }, self.users);
        };
    }
);