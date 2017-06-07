if(!window.localStorage.getItem('id_token')) {
            window.location.replace('login.html');
        }

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
                        window.location.replace('freelancer-profile.html');
                    } 
            });
        });