$(function(){
             $.validator.addMethod("passwordRegex", function(value, element) {
                return this.optional(element) || /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(value);
            }, "Shembull si duhet te jete nje password: Password123.");

            $.validator.addMethod("noSpace", function(value, element) { 
              return value.indexOf(" ") < 0 && value != ""; 
            }, "Nuk lejohen hapesirat!");

            $("#password-form").validate({
                rules: {
                    password: {
                        required: true,
                        passwordRegex: "Required"
                    },
                    confirm: {
                        equalTo: "#password"
                    }
                }, 
            messages: {
                    password: {
                        required: "* Ju lutem shkruani nje password!"
                    },
                    confirm: {
                        equalTo: "* Fjalkalimi duhet te jete i njejt!"
                    }
                },

            });
            
            $("#password-form").on("submit", function(event) {

                event.preventDefault();

               var newPassword = {
                    'password': $("#password").val(),
                };

                var a = window.location.href;
                var k = a.split("=");
                console.log(k[1]);



                  $.ajax({
                    type: 'PUT',
                    url:'http://localhost:3000/users/updatePassUser/'+ k[1],
                    data: JSON.stringify(newPassword),
                    contentType: 'application/json',
					dataType: 'JSON'
                  }).done(function( response ) {
                    if(response.success) {
                        window.location.replace('login.html')
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });
        });