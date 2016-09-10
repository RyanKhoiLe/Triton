window.addEventListener('load', function(){

  var main = document.getElementById("mainContent"),
  startx,
  dist = 0,
  divleft,
  touchobj = null;

  main.style.left = "0px";

  main.addEventListener("touchstart", function(e){
    console.log("touch start");
    touchobj = e.changedTouches[0];
    divleft = parseInt(main.style.left);
    startx = parseInt(touchobj.clientX);
    e.preventDefault();
  }, false);

  main.addEventListener("touchmove", function(e){
    touchobj = e.changedTouches[0];
    var dist = parseInt(touchobj.clientX) - startx;
    console.log(dist);
    console.log(main.style.left);
    main.style.left = ( (divleft + dist > 0)?  0 : (divleft + dist < -1700)? -1700 : divleft + dist ) + 'px';
    e.preventDefault();
  }, false);

  // main.addEventListener("touchend", function(e){
  //   touchobj = e.changedTouches[0];
  //   //dist = 0;
  //   e.preventDefault();
  // }, false);
}, false);
