window.addEventListener('load', function(){

  var main = document.getElementById("mainContent");
  var startx = 0;
  var dist = 0;
  var divleft;
  var touchobj = null;

  main.addEventListener("touchstart", function(e){
    console.log("touch start");
    touchobj = e.changedTouches[0];
    startx = parseInt(touchobj.clientX);
    divleft = parseInt(main.style.left);
    //main.style.left = "-300px";
    e.preventDefault();
  }, false);

  main.addEventListener("touchmove", function(e){
    touchobj = e.changedTouches[0];
    dist = parseInt(touchobj.clientX) - startx;
    console.log(dist);
    console.log(main.style.left);
    main.style.left = ( (divleft + dist)) + 'px';
    e.preventDefault();
  }, false);

  main.addEventListener("touchend", function(e){
    touchobj = e.changedTouches[0];
    //dist = 0;
    e.preventDefault();
  }, false);
})
