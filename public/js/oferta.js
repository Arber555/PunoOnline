
    
          //$('#content').append("Aaaaaaaaa");
        
        
            /*$(function() {

                $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/ofertat/getOfertaByUserIDAndProjectID/'+ window.localStorage.getItem('user_id') + '/'+ window.localStorage.getItem('project_id');,
                    contentType: 'application/json',
                    dataType: 'JSON',
                 }).done(function( data ) {
                    if(data) {
                        $.each(data, function(i, item) {
                            $('#content').append("<div class='row'>"+
                                "<div class='col-xs-8 col-sm-8 col-md-8 col-md-offset-2'>"+
                                    "<div class='well well-sm'>"+
                                        "<div class='row'>"+
                                            "<div class='col-sm-12 col-md-12'>"+
                                                "<h3 class='emri_projektit'>aaaaaaa</h3>"+
                                                 "<hr style='border-top: 1px white solid; border-bottom: 1px #F05F40 solid'>"+
                                                 "<h5 style='margin-bottom: 20px'>Klienti ka ofruar: <strong class='shuma'>123<span> €/hr</span></strong>" + "&emsp;Buxheti projektit: <strong class='buxheti_projektit' >12333</strong> <span>€</span></h5>"+
                                                 "<p class='pershkrimi_projektit'>Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di... Une pe boj kete ofert sepse une di...</p>"+
                                                 "<input type='hidden' id='project_id'  value='item._id'>"+
                                            "</div>"+
                                        "<div class='col-sm-4 col-md-4 pull-right'>"+
                                            "<a href='ofertat-detaje.html' type='button' id='buttoni' class='btn btn-default'>ME SHUME RRETH KESAJ OFERTE</a>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>");
                        });
                    } else {
                        alert('Error: ' + data.msg);
                    }
                });
            });*/


       /*$("div").click(function() {
        console.log($("#project_id").attr("value"));*/
          
     
 





       

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