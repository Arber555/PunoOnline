 $(function(){

        	$.validator.addMethod("passwordRegex", function(value, element) {
                        return this.optional(element) || /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(value);
                    }, "Shembull si duhet te jete nje password: Password123.");

                    $.validator.addMethod("noSpace", function(value, element) { 
                      return value.indexOf(" ") < 0 && value != ""; 
                    }, "Nuk lejohen hapesirat!");

                    $("#addUser").validate({
                        rules: {
                            emri: {
                                required: true,
                                minlength: 3,
                                maxlength: 20,
                                noSpace: "Required"
                            },
                            mbiemri: {
                                required: true,
                                minlength: 3,
                                maxlength: 20,
                                number: false,
                                noSpace: true
                            },
                            email: {
                                required: true,
                                email: true,
                                noSpace: true
                            },
                            username: {
                                required: true,
                                minlength: 5,
                                maxlength: 15,
                                noSpace: true
                            },
                            password: {
                                required: true,
                                passwordRegex: "Required"
                            },
                            confirm: {
                            	equalTo: "#password"
                            }
                        }, 
                    messages: {
                            emri: {
                                required: "* Ju lutem shkruani emrin tuaj!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!"),
                                number: "* Nuk lejohet te shtypen numra"
                            },
                            mbiemri: {
                               required: "* Ju lutem shkruani mbiemrin tuaj!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!"),
                                number: "* Nuk lejohet te shtypen numra"
                            },
                            email: {
                                required: "* Ju lutem shkruani email addresen tuaj!",
                                email: "Shembull emaili: test@test.com"
                                
                            },
                            username: {
                                required: "* Ju lutem shkruani username-in tuaj!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!")
                            },
                            password: {
                                required: "* Ju lutem shkruani nje password!"
                            },
                            confirm: {
                            	equalTo: "Fjalkalimi duhet te jete i njejt!"
                            }
                        },
                        
                    });

            $("#addUser").on("submit", function(event) {
            		

                
                event.preventDefault();

                var freelancer = false;
                var klient = false;
                var llojiKonsumatorit = $('input[name=llojiKonsumatorit]:checked').val();
                if(llojiKonsumatorit == 'Freelancer') {
                    freelancer = true;
                } else {
                    klient = true;
                }

                var newUser = {
                    'emri': $("input[name='emri']").val(),
                    'mbiemri': $("input[name='mbiemri']").val(),
                    'username': $("input[name='username']").val(),
                    'password': $("input[name='password']").val(),
                    'email': $("input[name='email']").val(), //for get email 
                    'freelancer': freelancer,
                    'klient': klient,
                    'gjinia': $("input[name='gjinia']:checked").val(),
                    'datalindjes': $("input[name='datalindjes']").val(),
                    //'statusi' : true
                };
               



                  $.ajax({
                    type: 'POST',
					url:'http://localhost:3000/users/register',
                    data: JSON.stringify(newUser),
                    contentType: 'application/json',
					dataType: 'JSON'
				 }).done(function( response ) {
                    if(response.success) {
                        window.location.replace('verify-account.html')
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ response.msg +
						"</div>");
                    }
                });
			});
		});


       function alphaOnly(event) {
          var key = event.keyCode;
          return ((key >= 65 && key <= 90) || key == 8 || key == 9 || key == 16);
        };