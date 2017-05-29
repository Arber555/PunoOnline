var x = null;

$(function(){
            $("#login-form").on("submit", function(event) {
                event.preventDefault();

                var loginUser = {
                    'username': $("#username").val(),
                    'password': $("#password").val(),
                };

                
				
                //window.localStorage.setItem('id_token', loginUser.token);

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

                       // window.location.replace('create-profile.html');
					
						p(localStorage.getItem('user_id'));
						
						/*if(x != null && x != "sboni"){
							window.location.replace('freelancer-profile.html');
						}
						else{
							window.location.replace('create-profile.html');
						}*/
                        
                    } else {
                        alert('Error: ' + data.msg);
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
						
					  //  window.location.replace('freelancer-profile.html');
						//window.location.replace('freelancer-profile.html');
						
						x = "freelancer-profile.html";
						console.log(x);
						window.location.replace('freelancer-profile.html');
					} else {
						x = "sboni";
						window.location.replace('create-profile.html');
					}
					//return x;
			}).fail(function() {
				alert("Sorry. Server unavailable. ");
			});
		}