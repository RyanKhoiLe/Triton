$(document).ready(function(){
  $('a[href^="#"]').on('click', function(e){
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      window.location.has = target;
    });
  });
  $('.moveDownIcon').hover(
    function(){
      $ (this).attr("src", "../images/icons/down_arrow_lightgray.png");
    }, function(){
      $ (this).attr("src", "../images/icons/down_arrow_gray.png");
  });
  $(window).keydown(
    function(e){
      var target;
      if($(document).scrollTop < 1000){
        target = '#page2';
      }
      if($(document).scrollTop > 1000 && $(document).scollTop < 2000){
        target = '#page3';
      }
      console.log('keypress');
      if(e.keyCode === 39){
        $('html, body').stop().animate({
          'scrollTop': $(target).offset().top
        }, 900, 'swing', function() {
          window.location.has = target;
        });
      }
    }
  )
});
