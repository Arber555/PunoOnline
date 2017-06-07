$("#btn-signup").on("click", function(event) {
            event.preventDefault();

           var url = window.location.href;
           var projectID = url.split("?");
            
            
            var oferta = {
                'shuma': $("#shuma").val(),
                'pershkrimi': $("#pershkrimi").val(),
                'projectID': projectID[1],
                'userID': localStorage.getItem('user_id')
            };
  

            
            
            

              $.ajax({
                type: 'POST',
                url:'http://localhost:3000/ofertat/create',
                data: JSON.stringify(oferta),
                contentType: 'application/json',
                dataType: 'JSON',
                headers: {
                    'Authorization': localStorage.getItem('id_token')
                }
             }).done(function( response ) {
                if(response.success) {
                    window.location.replace("detaje-projektit.html?"+ projectID[1]);
                } else {
                    $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ response.msg +
						"</div>");
                }
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