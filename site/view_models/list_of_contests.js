define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.contests = model;
        };    
    }
);