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
              //  return true;
                return   self.agree_to_the_terms() 
                && self.user.nick() != ''
                && self.user.email() != ''
                && self.user.password() != ''
                && self.user.password() == self.user.repeat_password();
            });


            self.init_validation = function(){
                // alert($('.register_form').length);
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



