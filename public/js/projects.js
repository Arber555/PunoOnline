var projekti;
        var idProject = null;

        function getId(id, d, e) {
            if(id){
                idProject = id;
            }
            
            if(d){
                deleteProject(idProject);
            }
            
            if(e) {
                console.log("Mrenda Edit");
                getProjectById(idProject);
            } 
        }
        
        

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
                            "<div id='alertDanger'></div>"+
                            "<div class='col-xs-8 col-sm-8 col-md-8 col-md-offset-2'>"+
                                "<div class='well well-sm'>"+
                                    "<div class='row'>"+
                                        "<div class='col-sm-2 col-md-2 pull-right'>"+
                                            "<button class='btn btn-primary btn-sm' data-title='Edit' data-toggle='modal'  data-target='#"+item._id+"' data-placement='top' rel='tooltip'><span style='float:none; margin: 0 auto;' class='glyphicon glyphicon-pencil'></span></button>"+
                                            "<button style='margin-left: 10px;' class='btn btn-danger btn-sm' data-title='Delete' data-toggle='modal' data-target='#delete' data-placement='top' rel='tooltip'><span style='float:none; margin: 0 auto;' class='glyphicon glyphicon-trash'></span></button>"+
                                        "</div>"+
                                        "<div class='col-sm-12 col-md-12'>"+
                                            "<h3 class='emri_projektit'>"+ item.emri_projektit + "</h3>"+
                                            "<hr style='border-top: 1px white solid; border-bottom: 1px #F05F40 solid'>"+
                                            "<h5 style='margin-bottom: 20px'>Projekti do te zgjase: <strong class='koha_projektit' >"+item.koha_projektit+"</strong>"+ "&emsp;Buxheti projektit: <strong class='buxheti_projektit' >"+item.buxheti_projektit+"</strong> €</h5>"+
                                            "<p class='pershkrimi_projektit'>"+item.pershkrimi_projektit+"</p>"+
                                            "<input type='hidden' id='project_id'  value="+ item._id+">"+    
                                        "</div>"+
                                        "<div class='col-sm-4 col-md-4 pull-right'>" +
                                          "<a href='ofertat.html?"+ item._id + "' type='button' id='buttoni' class='btn btn-default'>OFERTAT RRETH KETIJ PROJEKTI</a>"+
                                        "</div>"+ 
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<div class='modal fade' id='"+item._id+"' tabindex='-1' role='dialog' aria-labelledby='edit' aria-hidden='true'>"+
                          "<div class='modal-dialog'>"+
                            "<div class='modal-content'>"+
                              "<div class='modal-header'>"+
                            "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                            "<h4 class='modal-title custom_align' id='Heading'>Edito projektin</h4>"+
                          "</div>"+
                          "<div class='modal-body'>"+
                              "<div class='form-group'>"+
                                    "<input class='form-control' type='text' id='emri_projektit"+item._id+"' value='"+item.emri_projektit+"'>"+
                              "</div>"+
                              "<div class='form-group'>"+
                                    "<input class='form-control' type='text' id='koha_projektit"+item._id+"' value='"+item.koha_projektit+"'>"+
                              "</div>"+
                             "<div class='form-group'>"+
                                    "<input class='form-control' type='text' id='buxheti_projektit"+item._id+"' value='"+item.buxheti_projektit+"'>"+
                              "</div>"+
                              "<div class='form-group'>"+
                                    "<textarea rows='6' id='pershkrimi_projektit"+item._id+"' class='form-control'>"+item.pershkrimi_projektit+"</textarea>"+
                              "</div>"+
                          "</div>"+
                              "<div class='modal-footer'>"+
                            "<button id='"+item._id+"' onclick='getId(this.id, false, true)' type='button' class='btn btn-warning btn-lg' style='width: 100%;'><span class='glyphicon glyphicon-ok-sign'></span> Perditeso</button>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                    "<div class='modal fade' id='delete' tabindex='-1' role='dialog' aria-labelledby='edit' aria-hidden='true'>"+
                        "<div class='modal-dialog'>"+
                            "<div class='modal-content'>"+
                                "<div class='modal-header'>"+
                                    "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                                        "<h4 class='modal-title custom_align' id='Heading'>Fshij Projektin</h4>"+
                                "</div>"+
                            "<div class='modal-body'>"+
                            "<div class='alert alert-warning'><span class='glyphicon glyphicon-warning-sign'></span> Jeni i sigurt qe deshironi ta fshini kete projekt?</div>"+
                        "</div>"+
                        "<div class='modal-footer'>"+
                            "<button type='button'  class='btn btn-warning' id='"+item._id+"' onclick='getId(this.id, true, false)'><span class='glyphicon glyphicon-ok-sign'></span> Po</button>"+
                            "<button type='button' class='btn btn-warning' ><span class='glyphicon glyphicon-remove'></span> Jo</button>"+
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
            
            function deleteProject(id) {
                event.preventDefault();

                $.ajax({
                    type: 'DELETE',
                    url:'http://localhost:3000/projects/removeProject/' + id,
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
				}).done(function( response ) {
                    if(response.success) {
                        alert(response.msg);
                        window.location.replace('projects.html')
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ response.msg +
						"</div>");
                    }
                });  
            };
        
        
        
            function updateProject(id) {
                projekti.emri_projektit = $('#emri_projektit'+id).val();
                projekti.koha_projektit = $('#koha_projektit'+id).val();
                projekti.buxheti_projektit = $('#buxheti_projektit'+id).val();
                projekti.pershkrimi_projektit = $('#pershkrimi_projektit'+id).val();
                
                $.ajax({
                    type: 'PUT',
                    url:'http://localhost:3000/projects/updateProject/' + id,
                    contentType: 'application/json',
                    dataType: 'JSON',
                    data: JSON.stringify(projekti),
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
				}).done(function( response ) {
                    if(response.success) {
                        window.location.replace('projects.html')
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ response.msg +
						"</div>");
                    }
                });  
            };
        
            
            function getProjectById(id) {   
                $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/projects/getProject/' + id,
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    }
				}).done(function( data ) {
                    if(data.success) {
                        projekti = data.project;
                        updateProject(id);
                    } else {
                        $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                }); 
            }





       

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