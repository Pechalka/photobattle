define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.title = '';
            self.description = '';
            self.sale_type = ko.observable('general');
            self.winner_type = ko.observable('vote');

            self.initial_fee = '';
            self.budget = ''; 

            self.jury = ko.observableArray([]);

            self.start = '';
            self.end = '';

            self.new_jury = {
                name : ko.observable(''),
                description : ko.observable('')
            };

            self.add_jury = function(){
                self.jury.push(self.new_jury);
                self.new_jury.name('');
                self.new_jury.description('');  
            }

            self.add_konkurs = function(){
                var data = {
                    title : self.title,

                    title : self.title,
                    description : self.description,
                    sale_type : self.sale_type,
                    winner_type : self.winner_type,

                    initial_fee : self.initial_fee,
                    budget : self.budget 
                };

                //ko.toJSON(self);
                $.post('/api/add_konkurs', data, function(){
                    window.location = '#Index';
                });
            }
        };
    }
);