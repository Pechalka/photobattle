define(["knockout", "jquery"],
    function(ko, $) {
        return function(model){
            var self = this;

            self.items = ko.observableArray([]);
            self.type = ko.observable('Общие');
            self.page = ko.observable(1);
            self.pages = ko.observableArray([]);

            self.set_all = function(){
                self.type('Общие');
            }
            self.set_sponsor = function(){
                self.type('Спонсорские');
            }
            self.set_blago = function(){
                self.type('Благотворительный');
            }


             ko.computed(function(){
                $.get("/api/list_of_konkurs", { page : self.page(), type : self.type() }, function(res) {
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