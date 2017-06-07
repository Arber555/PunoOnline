var citiesByCategory = {
            Kosove: ["Peje", "Prishtine", "Mitrovice", "Gjakove", "Prizeren", "Ferizaj"],
            Shqiperi: ["Shkup", "Tetove", "Gostivar", "Ohrid"],
            Maqedoni: ["Shkoder", "Tirane", "Durres", "Gjirokaster", "Vlore"]
        }

    function changeCat(value) {
        if (value.length == 0) document.getElementById("category").innerHTML = "<option></option>";
        else {
            var catOptions = "";
            for (categoryId in citiesByCategory[value]) {
                catOptions += "<option>" + citiesByCategory[value][categoryId] + "</option>";
            }
            document.getElementById("category").innerHTML = catOptions;
        }
    }
        
        function readFile() {
  
              if (this.files && this.files[0]) {
                
                var FR = new FileReader();
                
                FR.addEventListener("load", function(e) {
                  document.getElementById("img").src       = e.target.result;
             
                  var abc = e.target.result;
               
                  var k = abc.split(",");
                  document.getElementById("base64stringi").value = k[1];
                  
                }); 
                
                FR.readAsDataURL( this.files[0] );
              }
              
            }

            document.getElementById("inp").addEventListener("change", readFile);

    

    
    




        $(function(){
            $("#createProfile-form").on("submit", function(event) {
                $(function() {

                    $.validator.addMethod("phoneRegex", function(value, element) {
                        return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/i.test(value);
                    }, "Numri telefonit eshte invalid!");

                    $.validator.addMethod("noSpace", function(value, element) { 
                      return value.indexOf(" ") < 0 && value != ""; 
                    }, "Nuk lejohen hapesirat!");

                    $("#createProfile-form").validate({
                        rules: {
                            profesioni: {
                                required: true
                            },
                            edukimi: {
                                required: true,
                                minlength: 10,
                                maxlength: 50,
                                number: false
                            },
                            ora: {
                                required: true,
                                number: true,
                                maxlength: 3,
                                noSpace: true
                            },
                            pershkrimi: {
                                required: true,
                                minlength: 100,
                                maxlength: 5000
                            },
                            shteti: {
                                required: true
                            },
                            category: {
                                required: true,
                            },
                            adresa: {
                                required: true,
                                minlength: 10, 
                                maxlength: 40
                            },
                            telefoni: {
                                required: true,
                                maxlength: 15,
                                phoneRegex: "Required"
                            }
                        }, 
                    messages: {
                            profesioni: {
                                required: "* Ju lutem zgjidhni nje profesion!"
                            },
                            edukimi: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!"),
                                number: "* Nuk lejohet te shtypen numra"
                            },
                            ora: {
                                required: "Kjo fushe eshte e kerkuar!",
                                maxlength: $.validator.format("* Shtypni maximum {0} numra!"),
                                number: "* Ju lutem shtypni numra!"
                            },
                            pershkrimi: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!")
                            },
                            shteti: {
                                required: "* Ju lutem zgjidhni nje shtet!"
                            },
                            category: {
                                required: "* Ju lutem zgjidhni nje qytet!",
                            },
                            adresa: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!")
                            },
                            telefoni: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                maxlength: $.validator.format("* Shtypni maximum {0} numra!"),
                                number: "* Ju lutem shtypni numra!"
                            }
                        }
                    });
                });
                
      
                
                var fname = {
                    'name' : "foto.jpg",
                    'content_type' : "image/jpg",
                    'file' : $('#base64stringi').val()
                }
                
               

                event.preventDefault();

                var profile = {
                  'profesioni': $('#profesioni').val(),
                  'edukimi': $('#edukimi').val(),
                  'ora': $('#ora').val(),
                  'pershkrimi': $('#pershkrimi').val(),
                  'telefoni': $('#telefoni').val(),
                  'shteti': $('#shteti').val(),
                  'qyteti': $('#category').val(),
                  'adresa': $('#adresa').val(),
                  'foto_name': fname,
                  'userID': localStorage.getItem('user_id')
                };
                
                

            

                 $.ajax({
                    type: 'POST',
                    url:'http://localhost:3000/profiles/create',
                    data: JSON.stringify(profile),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                 }).done(function( data ) {
                    if(data.success) {
                     
                        window.location.replace('freelancer-profile.html');
                        localStorage.setItem('profile', JSON.stringify(data.profile));

                        
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });

            
  
        
            
        });
        
        $(function(){
           
            $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/users/'+ localStorage.getItem('user_id'),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                 }).done(function( data ) {
                    if(data) {
                        $("#emriwelcome").html("<strong>" + data.emri + "</strong>");

                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });
        
        $('#logout').click( function() {
            window.localStorage.clear();
        });
