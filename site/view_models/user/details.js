define(["knockout", "jquery", "app"],
    function(ko, $, app) {
        return function(model){
            var self = this;
            $.extend(self, model);

            self.add_photo = function(){
            	$(app).trigger('show_add_photo', self._id);
            }

            $(app).on('add_photo', function(){
                self.go_to_page(self.page());
            });

            self.page = ko.observable(1);
            self.pages = ko.observableArray([]);

            self.photos = ko.observableArray(model.photos);

            self.go_to_page = function(page){
                $.get('/api/user_photos/', { page : page, user_id : self._id},function(res){
                    self.pages([]);
                    for (var i=1, l=res.total_pages; i <= l; i++) {
                        self.pages.push(i);
                    }
                    self.page(res.page); 
                    self.photos(res.items);

                    //init colorbox
                    $("a.group1").colorbox({
                        rel:'group1' 
                        , returnFocus : false 
                        , current : 'Фото {current} из {total}'  
                        , width:"50%", height:"50%" 
                    });
                });
            }

            self.go_to_page(1); // when page load, load photos
        };
    }
);