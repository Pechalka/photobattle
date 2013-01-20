define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.name = '';
            self.description = '';
            self.type = '';
        };
    }
);