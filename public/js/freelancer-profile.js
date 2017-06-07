function decodeBase64Image(dataString) {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }

          response.type = matches[1];
          response.data = new Buffer(matches[2], 'base64');

          return response;
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
                        
                    
                        localStorage.setItem('profile', JSON.stringify(data.profile));
                        $("#edukimi").html("<strong>" + data.profile.edukimi + "</strong>");
                        $("#pershkrimi").text(data.profile.pershkrimi);
                        $("#profesioni").text(data.profesioni);
                        $("#paret").text(data.profile.ora);                        
                        $('#profilePic').attr('src', "data:image/jpeg;base64,"+data.profile.foto_name);
    
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
                        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                        ];
                        var date = new Date(data.datalindjes);
                        $("#emri-freelancerit").text(data.emri +" "+ data.mbiemri);
                        $("#datalindjes").html("<strong> " + (monthNames[date.getMonth()] ) + '/' + date.getDate() + '/' +  date.getFullYear() +"</strong>");
                        $("#emaili").html("<strong> " + data.email + "</strong>");
                        $("#emrimbiemri").html("<strong>" + data.emri + " " + data.mbiemri +"</strong>");
                        $("#emriprofil").text(data.emri);
                        
                         

                    } else {
                       $("#alertDanger").append("<div class='alert alert-danger fade in'>"+
							"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
							"<strong>Error! </strong>"+ data.msg +
						"</div>");
                    }
                });
            });
        
           $(function() {
                var vlersimi;
               
                $.ajax({
                    type: 'GET', 
                    url:'http://localhost:3000/vlersimet/getAVGVlersimiByUser/' + localStorage.getItem('user_id'),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    headers: {
                        'Authorization': localStorage.getItem('id_token')
                    },
                    success: function (data){
                      vlersimi = data.avg;
                      console.log(vlersimi);
                    },
                    async: false
                 });
               
               $("#ratingDiv").append("<div id='stars-existing' class='starrr' data-rating='"+vlersimi+"'></div>");
            });
  
        $('#logout').click( function() {
            window.localStorage.clear();
        });
   
    
    
        // Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'button', function(e) {
        return _this.syncRating(_this.$el.find('button').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'button', function(e) {
        return _this.setRating(_this.$el.find('button').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<button style='margin-right:3px' type='button' class='btn btn-default    btn-grey btn-sm' aria-label='Left Align'>"+
            "<span style='float:none;margin:0 auto;' class='glyphicon glyphicon-star' aria-hidden='true'></span>"+
        "</button>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('button').eq(i).removeClass('btn-default').addClass('btn-warning');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('button').eq(i).removeClass('btn-warning').addClass('btn-default');
        }
      }
      if (!rating) {
        return this.$el.find('button').removeClass('btn-warning').addClass('btn-default');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
      
  $('#stars').on('starrr:change', function(e, value){
    $('#count').html(value);
  });
  
  $('#stars-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);
  });
});