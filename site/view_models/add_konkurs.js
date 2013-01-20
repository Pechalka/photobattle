define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.name = '';
            self.description = '';
            self.sale_type = ko.observable('general');
            self.winner_type = ko.observable('vote');

            self.start = '';
            self.end = '';

            self.add_konkurs = function(){
                alert('sdf');
            }
        };
    }
);