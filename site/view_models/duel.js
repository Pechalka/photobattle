define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;
            self.items = ko.observableArray([]);

            self.type = ko.observable('Открытая');
            self.page = ko.observable(1);
            self.pages = ko.observableArray([]);

            self.set_open= function(){
                self.type('Открытая');                
            }

            self.set_close = function(){
                self.type('Закрытая');
            }

             ko.computed(function(){
                $.get('/api/duel_list', { page : self.page(), type : self.type() }, function(res) {
                    self.pages([]);
                    for (var i=1, j=res.total_pages; i <= j; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 
                    self.items(res.items);
                });
             });   


        };
    }
);