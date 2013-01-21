define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;
            //Blackrainbow

            $.extend(self, model);
        };
    }
);