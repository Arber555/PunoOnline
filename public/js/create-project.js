$( "#kategorite" )
          .change(function() {
            var str = "";
            $( "#kategorite option:selected" ).each(function() {
              str += $( this ).text() + " ";
            });
           // $( "#testDivJem" ).text( str );
          })
          .trigger( "change" );




        
        $(function(){
            $("#createProject-form").validate({
                        rules: {
                            emri_projektit: {
                                required: true,
                                minlength: 10,
                                maxlength: 60
                            },
                            buxheti_projektit: {
                                required: true,
                                minlength: 1,
                                maxlength: 7,
                                min: 1,
                                max: 999999
                            },
                            pershkrimi_projektit: {
                                required: true,
                                minlength: 100,
                                maxlength: 5000,
                            },
                            koha_projektit: {
                                required: true,
                                maxlength: 7,
                                min: 1,
                                max: 30
                            },
                            koha: {
                                required: true
                            }
                        }, 
                        messages: {
                            emri_projektit: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!")
                            },
                            buxheti_projektit: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} numra!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} numra!"),
                                min: $.validator.format("Minimum {0}"),
                                max: $.validator.format("Maximum {0}")
                            },
                            pershkrimi_projektit: {
                                required: "Kjo fushe eshte e kerkuar!",
                                minlength: $.validator.format("* Shtypni minimum {0} karaktere!"),
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!")
                            },
                            koha_projektit: {
                                required: "* Kjo fushe eshte e kerkuar!",
                                maxlength: $.validator.format("* Shtypni maximum {0} karaktere!"),
                                min: $.validator.format("Minimum {0}"),
                                max: $.validator.format("Maximum {0}")
                            },
                            koha: {
                                required: "Zgjidhni njërën prej kohëve"
                            }
                        }
                    });

              $(function() {

                $("#createProject-form").on("submit", function(event) {
                    
                    
                    
                var a = $('#koha_projektit').val() + " " + $('#koha').val();
             

                 
                event.preventDefault();

                var project = {
                  'emri_projektit': $('#emri_projektit').val(),
                  'buxheti_projektit': $('#buxheti_projektit').val(),
                  'pershkrimi_projektit': $('#pershkrimi_projektit').val(),
                  'koha_projektit': a,
                  'categoryID' : "5915be61e05cf612fcbc42c5",
                  'userID': localStorage.getItem('user_id')
                };

            

                


                $.ajax({
                    type: 'POST',
                    url:'http://localhost:3000/projects/create',
                    data: JSON.stringify(project),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                 }).done(function( data ) {
                    if(data.success) {
                        
                    
                        
                        window.location.replace('job-feed.html');
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
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
                        
                        $("#emriprofil").text(data.emri);

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
        