 $(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 277;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Me shume >";
    var lesstext = "Me pak <";
    

    $('.more').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});


    


       $(function() {
            $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/projects/,
                    contentType: 'application/json',
                    dataType: 'JSON',
                 }).done(function( data ) {
                    if(data) {
                        $.each(data, function(i, item) {

                            $("#content").append("");
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