define(["knockout", "jquery", "qq", "ko.mapping","jquery.validate"],
    function(ko, $, qq, mapping) {
        return function(model){
            var self = this;

            self.user = mapping.fromJS({
                    name : '',
                    nick : '',
                    email : '',
                    password : '',
                    repeat_password : ''
                });

            self.save = function() {
                $.post("/api/user", ko.toJS(self.user), function() {
                    window.location = '#login_success';
                });

                return false;
            }

           self.agree_to_the_terms = ko.observable(false);

            self.can_create = ko.computed(function(){
              var email_pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

              return  self.agree_to_the_terms() 
                && self.user.nick() != ''
                && self.user.email() != ''
                && email_pattern.test(self.user.email())
                && self.user.password() != ''
                && self.user.password() == self.user.repeat_password();
            });


            self.init_validation = function(){

                $(".register_form").validate({

                  rules:{
                       
                       nick:{
                           required: true
                       },
                       email:{
                            required: true,
                            email: true
                       },
                       password:{
                            required: true,
                            minlength: 4,
                            maxlength: 16
                       },
                       repeat_password:{
                            required: true,
                            equalTo : "input[name='password']"
                       }
                  },
                  
                  messages:{
                       
                       nick:{
                           required: "Это поле обязательно для заполнения"
                       },
                       email:{
                            required: "Это поле обязательно для заполнения",
                            email: "Введите корректный email"
                       },
                       password:{
                            required: "Это поле обязательно для заполнения",
                            minlength: "Пароль должен быть минимум 4 символа",
                            maxlength: "Максимальное число символо - 16"
                       },
                       repeat_password:{
                            equalTo : "Повторите пароль"
                       }
                  }
                });
            }
        };
    }
);



