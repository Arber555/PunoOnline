var x = null;

$(function(){
            $("#login-form").on("submit", function(event) {
                event.preventDefault();

                var loginUser = {
                    'username': $("#username").val(),
                    'password': $("#password").val(),
                };

                  $.ajax({
                    type: 'POST',
                    url:'http://localhost:3000/users/authenticate',
                    data: JSON.stringify(loginUser),
                    contentType: 'application/json',
                    dataType: 'JSON',
                 }).done(function( data ) {
                    if(data.success) {
                        window.localStorage.setItem('id_token', data.token);
                        window.localStorage.setItem('user_id', data.user.id);
						
						p(localStorage.getItem('user_id'));

                    } else {
						$("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                        
                    }
                });
            });
        });
		
		
		function p(y){
			
			$.ajax({
					type: 'GET',
					url:'http://localhost:3000/profiles/userProfile/' + y,
					contentType: 'application/json',
					dataType: 'JSON',
					
				}).done(function( data1 ) {
					if(data1.success) {
						x = "freelancer-profile.html";
				
						window.location.replace('freelancer-profile.html');
					} else {
						window.location.replace('create-profile.html');
					}
				
			}).fail(function() {
				alert("Sorry. Server unavailable. ");
			});
		}