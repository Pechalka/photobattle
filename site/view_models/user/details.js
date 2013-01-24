define(["knockout", "jquery", "app"],
    function(ko, $, app) {
        return function(model){
            var self = this;
            $.extend(self, model);

            self.add_photo = function(){
            	$(app).trigger('show_add_photo', self._id);
            }

            $(app).on('add_photo', function(){
            	alert('update photo');
            });
        };
    }
);