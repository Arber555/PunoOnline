$(document).ready(function() {

        


            $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/projects/getAllProjects',
                    contentType: 'application/json',
                    dataType: 'JSON',
                 }).done(function( data ) {
                    if(data) {
                        $.each(data, function(i, item) {
                           /* $('#buxheti_projektit').html(item.buxheti_projektit);
                            alert(item.buxheti_projektit);*/


                            $("#content").append("<div class='row'>"+
                            "<div class='col-xs-6 col-sm-6 col-md-6 col-md-offset-3'>"+
                                "<div class='well well-sm'>"+
                                    "<div class='row'>"+
                                        "<div class='col-sm-12 col-md-12'>"+
                                            "<h3 class='emri_projektit'>"+ item.emri_projektit + "</h3>"+
                                            "<hr style='border-top: 1px white solid; border-bottom: 1px #F05F40 solid'>"+
                                            "<h5 style='margin-bottom: 20px'>Projekti do te zgjase: <strong class='koha_projektit' >"+item.koha_projektit+"</strong>"+ "&emsp;Buxheti projektit: <strong class='buxheti_projektit' >"+item.buxheti_projektit+"</strong> €</h5>"+
                                            "<p class='pershkrimi_projektit'>"+item.pershkrimi_projektit+"</p>"+
                                            "<input type='hidden' id='project_id'  value="+ item._id+">"+    
                                        "</div>"+
                                        "<div class='col-sm-4 col-md-4'>" +
                                          "<a href='detaje-projektit.html?"+ item._id + "' type='button' id='buttoni' class='btn btn-default'>Shiko Projektin</a>"+
                                        "</div>"+ 
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>");
                        });
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