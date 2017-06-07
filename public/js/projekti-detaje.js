/* $(document).ready(function() {

        
           var a = window.location.href;
           var k = a.split("?");
           console.log(k[1]);

            $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/projects/getProject/'+ k[1],
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
                 }).done(function( data ) {
                    if(data) {
                            $("#content").append("<div class='row'>"+
                            "<div class='col-xs-8 col-sm-8 col-md-8'>"+
                                "<div style='background-color: white' class='well well-sm'>"+
                                    "<div class='row'>"+
                                        "<div class='col-sm-12 col-md-12'>"+
                                            "<h3 style='margin-bottom: 50px'>Detajet</h3>"+
                                            "<p style='margin-bottom: 30px' class='pershkrimi_projektit'>"+data.pershkrimi_projektit+"</p>"+ 
                                            "<h5 style='margin-bottom: 20px'>Projekti do te zgjase: <strong class='koha_projektit' >"+data.koha_projektit+"</strong></h5>"+
                                            "<h5>"+ "Buxheti projektit: <strong class='buxheti_projektit' >"+data.buxheti_projektit+"</strong> €</h5>"+
                                             "<h5>"+ "Buxheti projektit: <strong class='buxheti_projektit' >"+data.buxheti_projektit+"</strong> €</h5>"+
                                               
                                        "</div>"+
                                        "<div class='col-sm-4 col-md-4'>" +
                                          "<a href='propozimet.html?"+ k[1] + "' type='button' class='btn btn-default'>Ofert</a>"+
                                        "</div>"+ 
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>");
                       $("#emri_proj").html(data.emri_projektit);
                    } else {
                        alert('Error: ' + data.msg);
                    }
                });
            });*/





       

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