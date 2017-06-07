 $('#logout').click( function() {
            window.localStorage.clear();
        });
    
    
  
        function readFile() {
  
              if (this.files && this.files[0]) {
                
                var FR = new FileReader();
                
                FR.addEventListener("load", function(e) {
                  document.getElementById("editPic").src       = e.target.result;
                  //document.getElementById("base64stringi").innerHTML = e.target.result;
                  //console.log(e.target.result);
                  var abc = e.target.result;
                  //console.log(abc.charAt(22));
                  var k = abc.split(",");
                  document.getElementById("base64stringi").value = k[1];
                  
                }); 
                
                FR.readAsDataURL( this.files[0] );
              }
              
            }

            document.getElementById("inp").addEventListener("change", readFile);
  




  
        $(function(){
           
            $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/profiles/userProfile/' + localStorage.getItem('user_id'),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                 }).done(function( data ) {
                    if(data.success) {
                      //  window.location.replace('freelancer-profile.html');
                        localStorage.setItem('profile', JSON.stringify(data.profile));
                        localStorage.setItem('profile_id', data.profile._id);
                        $("#edukimi").val(data.profile.edukimi);
                        $("#pershkrimi").val(data.profile.pershkrimi);
                        $("#ora").val(data.profile.ora);
                        $("#telefoni").val(data.profile.telefoni);
                        $("#profesioni").val(data.profesioni);
                        $('#editPic').attr('src', "data:image/jpeg;base64,"+data.profile.foto_name);

                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
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
                      //  window.location.replace('freelancer-profile.html');
                      $("#emriprofil").text(data.emri);

                      $("#emri").val(data.emri);
                      $("#mbiemri").val(data.mbiemri);
                      $("#username").val(data.username);
                      $("#emaili").val(data.email);    

                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });



  
        



        //Update User
       $(function(){
            $("#changeUserData").on("submit", function(event) {

                event.preventDefault();
                
                

                var changeData = {
                    'emri': $("#emri").val(),
                    'mbiemri': $("#mbiemri").val(),
                    'username': $("#username").val(),
                    'email': $("#emaili").val(), //for get email 
                    
                };
                



                  $.ajax({
                    type: 'PUT',
                    url:'http://localhost:3000/users/updateUser/' + localStorage.getItem('user_id'),
                    data: JSON.stringify(changeData),
                    contentType: 'application/json',
                    dataType: 'JSON'
                  }).done(function( response ) {
                    if(response.success) {
                        window.location.replace('freelancer-profile.html')
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });
        });



      // Update Profile
       $(function(){
            $("#changeUserData").on("submit", function(event) {

                event.preventDefault();
                
                var fname = {
                    'name' : "foto1.jpg",
                    'content_type' : "image/jpg",
                    'file' : $('#base64stringi').val()
                }

                var changeData = {
                    'edukimi': $("#edukimi").val(),
                    'pershkrimi': $("#pershkrimi").val(),
                    'ora': $("#ora").val(),
                    'telefoni': $("#telefoni").val(), 
                    'foto_name': fname
                };
                

                $.ajax({
                  type: 'PUT',
                  url:'http://localhost:3000/profiles/editProfile/' + localStorage.getItem('profile_id'),
                  data: JSON.stringify(changeData),
                  contentType: 'application/json',
                  dataType: 'JSON',
                  headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                }).done(function( response ) {
                  if(response.success) {
                    window.location.replace('freelancer-profile.html')
                  } else {
                    $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                  }
                });
            });
        });



       function alphaOnly(event) {
          var key = event.keyCode;
          return ((key >= 65 && key <= 90) || key == 8);
        };