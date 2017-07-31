var sidebarOpen = false;
var keypadOpen = false;
var commentOpen = false;
var publicRef;
var privateRef;
var COLOR_CODES = {
  cowell: {
    thisRoom: "cowell",
    thisColor: "rgba(253, 185, 39,0.8)",
    navbarColor: "rgba(255, 248, 213, 0.9)",
    slide1Color: "rgba(247, 198, 91, 1)",
    slide2Color: "rgba(247, 221, 165, 1)",
    slide3Color: "rgba(255, 231, 181,1)",
    slide4Color: "rgba(242, 224, 186, 1)"
  },
  warburton: {
    thisRoom: "warburton",
    thisColor: "rgba(238, 59, 66,0.8)",
    navbarColor: "rgba(252, 214, 203, 0.9)",
    slide1Color: "rgba(175, 42, 48, 1)",
    slide2Color: "rgba(242, 109, 99, 1)",
    slide3Color: "rgba(245, 141, 124, 1)",
    slide4Color: "rgba(249, 176, 146, 1)"
  },
  sculpture: {
    thisRoom: "sculpture",
    thisColor: "rgba(77, 130, 57,0.8)",
    navbarColor: "rgba(33, 149, 70, 0.9)",
    slide1Color: "rgba(33, 149, 70, 1)",
    slide2Color: "rgba(128, 173, 142, 1)",
    slide3Color: "rgba(161, 201, 173, 1)",
    slide4Color: "rgba(204, 234, 213, 1)"
  },
  rotunda: {
    thisRoom: "rotunda",
    thisColor: "rgba(249, 247, 248,0.8)",
    navbarColor: "rgba(214, 205, 209, 0.9)",
    slide1Color: "rgba(127, 121, 124, 1)",
    slide2Color: "rgba(211, 194, 203, 1)",
    slide3Color: "rgba(255, 234, 234, 1)",
    slide4Color: "rgba(216, 216, 216, 1)",
  },
  permanent:{
    thisRoom: "permanent",
    thisColor: "rgba(0, 103, 166,0.8)",
    navbarColor: "rgba(227, 244, 247, 0.9)",
    slide1Color: "rgba(90, 146, 195, 1)",
    slide2Color: "rgba(139, 174, 212, 1)",
    slide3Color: "rgba(202, 216, 234, 1)",
    slide4Color: "rgba(229, 237, 248, 1)"
  },
  jbhouse: {
    thisRoom: "jbhouse",
    thisColor: "rgba(0, 103, 166,0.8)",
    navbarColor: "rgba(227, 244, 247, 0.9)",
    slide1Color: "rgba(90, 146, 195, 1)",
    slide2Color: "rgba(139, 174, 212, 1)",
    slide3Color: "rgba(202, 216, 234, 1)",
    slide4Color: "rgba(229, 237, 248, 1)"
  }
}
function scrollDownALittle(){
  window.scrollBy(0,200);
}
function toggleComment(){
  if(!commentOpen){
    document.getElementById("showComment").innerHTML = "<i class='fa fa-caret-up' style='padding-right: 5px;'></i> Hide Comments ";
    commentOpen = true;
  }
  else if(commentOpen){
    document.getElementById("showComment").innerHTML = "<i class='fa fa-caret-down' style='padding-right: 5px;'></i> Show Comments ";
    commentOpen = false;
  }
}
function openSideNav(){
  console.log("clicked");
  // if(sidebarOpen){
  //   console.log('it is open!');
  //   closeNav();
  //   return;
  // }
  // document.getElementById("sidenav").style.width = "250px";
  // document.getElementById("sidebarButton").style.color = "white";
  sidebarOpen = true;
}
function closeNav(){
  // document.getElementById("sidenav").style.width = "0";
  // document.getElementById("sidebarButton").style.color = "black";
  // sidebarOpen = false;
}
function openHome(){
  //document.getElementById("navBar").style.backgroundColor = "rgba(250,23,62,0.8)";
  closeNav();
  closeKeypad();
  closeSlick();
  document.getElementById("navBar").style.backgroundColor = "rgba(187, 195, 204, 0.01)";
  document.body.style.backgroundColor = "white";
}
function backButton(){
  window.history.back();
}
function newPage(){
  closeNav();
  closeKeypad();
  closeSlick();
  $(document).ready(function(){

    var thisColor;
    if(window.location.href.includes("cowell")){
      thisColor = "rgba(255,201,14,0.9)";
    }
    else if(window.location.href.includes("warburton")){
      thisColor = "rgba(252, 214, 203,0.9)";
    }
    else if(window.location.href.includes("sculpture")){
      thisColor = "rgba(34,177,76,0.8)";
    }
    else if(window.location.href.includes("rotunda")){
      thisColor = "rgba(180,234,245,0.8)";
    }
    else if(window.location.href.includes("permanent")){
      thisColor = "rgba(0,162,232,0.8)";
    }
    else{
      thisColor = "rgba(250,23,62,0.8)";
    }
    console.log(thisColor);
    $(".colored").css("background-color", thisColor);
  });

}
function closeSlick(){
  $(document).ready(function(){
    $('.regular').slick('unslick');
  });
}
function openKeypad(){
  console.log("clicked");
  if(keypadOpen){
    console.log('it is open!');
    closeKeypad();
    return;
  }
  document.getElementById("keypad").style.width = "250px";
  document.getElementById("keypadButton").style.color = "white";
  keypadOpen = true;
}
function closeKeypad(){
  document.getElementById("keypad").style.width = "0";
  document.getElementById("keypadButton").style.color = "black";
  keypadOpen = false;
}
var app = angular.module("app", ["ngRoute", "firebase"]);

app.config(function($routeProvider){
  $routeProvider

    .when('/', {
      templateUrl: "newhome.html",
      controller: "mainController"
    })
    .when('/landing', {
      templateUrl: "museum_front.html",
      controller: "mainController"
    })
    .when('/exhibit', {
      templateUrl: "exhibit.html",
      controller: "slideInfo"
    })
    .when('/cowell',{
      templateUrl: "cowell.html",
      controller: "mobileHome"
    })
    .when('/rotunda',{
      templateUrl: "cowell.html",
      controller: "mobileHome"
    })
    .when('/warburton', {
      templateUrl: "cowell.html",
      controller: "mobileHome"
    })
    .when('/permanent', {
      templateUrl: "cowell.html",
      controller: "mobileHome"
    })
    .when('/sculpture', {
      templateUrl: "cowell.html",
      controller: "mobileHome"
    })
    .when('/jbhouse', {
      templateUrl: "cowell.html",
      controller: "mobileHome"
    });

  var config = {
    apiKey: CONFIG.FB_KEY,
    authDomain: "lunaspheretriton.firebaseapp.com",
    databaseURL: "https://lunaspheretriton.firebaseio.com",
    storageBucket: "lunaspheretriton.appspot.com",
  };
  firebase.initializeApp(config);
  publicRef = firebase.database().ref().child("public");
  privateRef = firebase.database().ref().child("private");
});
app.filter('reverse', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    };
  });
app.controller("keypadController", ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location){
  $scope.exhibitCode;
  var exhibitsRef = firebase.database().ref('exhibits');
  $scope.exhibitArray = [];
  //cowell
  var cowellRef = exhibitsRef.child("cowell");
  $scope.cowellExhibits = $firebaseArray(cowellRef);
  $scope.cowellExhibits.$loaded().then(function(){
    angular.forEach($scope.cowellExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.cowellExhibits);
    //console.log($scope.exhibitArray);
  });
  //Warburton room
  var warburtonRef = exhibitsRef.child("warburton");
  $scope.warburtonExhibits = $firebaseArray(warburtonRef);
  $scope.warburtonExhibits.$loaded().then(function(){
    angular.forEach($scope.warburtonExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibit = exhibit.exhibit;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.warburtonExhibits);
    //console.log($scope.exhibitArray);
  });
  //permanent
  var permanentRef = exhibitsRef.child("permanent");
  $scope.permanentExhibits = $firebaseArray(permanentRef);
  $scope.permanentExhibits.$loaded().then(function(){
    angular.forEach($scope.permanentExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.permanentExhibits);
    //console.log($scope.exhibitArray);
  });
  //sculpture
  var sculptureRef = exhibitsRef.child("sculpture");
  $scope.sculptureExhibits = $firebaseArray(sculptureRef);
  $scope.sculptureExhibits.$loaded().then(function(){
    angular.forEach($scope.sculptureExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.sculptureExhibits);
    //console.log($scope.exhibitArray);
  });
  //rotunda
  var rotundaRef = exhibitsRef.child("rotunda");
  $scope.rotundaExhibits = $firebaseArray(rotundaRef);
  $scope.rotundaExhibits.$loaded().then(function(){
    angular.forEach($scope.rotundaExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.rotundaExhibits);
    //console.log($scope.exhibitArray);
  });
  //jbhouse
  var jbRef = exhibitsRef.child("jbhouse");
  $scope.jbExhibits = $firebaseArray(jbRef);
  $scope.jbExhibits.$loaded().then(function(){
    angular.forEach($scope.jbExhibits, function(exhibit){
      var id = exhibit.$id;
      var code = exhibit.exhibitCode;
      var exhibitName = exhibit.exhibit;
      $scope.exhibitArray.push({id, exhibitName, code});
    });
    //console.log($scope.jbExhibits);
    //console.log($scope.exhibitArray);
  });

  $scope.goToExhibitKeypad = function(){
    $scope.exhibitArray.forEach(function(Object){
      //console.log(Object);
      //console.log(Object.code);
      if($scope.exhibitCode == Object.code){
        //console.log("MATCH!");
        $location.path("/exhibit").search([Object.exhibitName, Object.id]);
        //console.log($location.path);
        closeKeypad();
      }
    });
  }
}]);
app.controller("mainController", ['$scope', function($scope){
  $scope.message = "SUP";
  //$scope.showLogo = true;
  //$scope.navbarColor = "blue";//"rgba(250,23,62,0.8)";
  setTimeout(function(){
    $(document).ready(function(){
      var request;
      $("#newsLetterForm").submit(function(event){

        //Abort any pending request
        if(request){
          request.abort();
        }

        //set up some local variables
        var $form = $(this);

        // Select and cache all the fields
        var $inputs = $form.find("input", "button");

        // Serialize the data
        var serializedData = $form.serialize();

        // Disable inputs while ajax requesting
        $inputs.prop("disabled", true);

        //Fire the request to /form.php
        request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycbxpuQ0yfpnBJkLMR4sdAXhtxrAagpwYJiQIY0NooTJyX980Tas/exec",
          type: "post",
          data: serializedData
        });

        //Callback handler on success
        request.done(function(response, textStatus, jqXHR){
          console.log("It worked");
          console.log(response);
          console.log(textStatus);
          console.log(jqXHR);
          alert("Thank you for subscribing to our newsletter!");
        });

        //Callback handler on failure
        request.fail(function(jqXHR, textStatus, errorThrown){
          console.error(
            "The following error occured: " +
            textStatus, errorThrown
          );
        });

        //Callback handler regardless
        request.always(function(){
          $inputs.prop("disabled", false);
        });

        event.preventDefault();
      });
      $("body").css("overflow-x", "hidden");
      $("#navBarLogo").css("display", "none");
      $("body").css("background-color", "rgba(250,250,250,0.9)");
      //$("#navBar").css('background-color', 'rgba(250,23,62,0.8)')
    });
  }, 0);
  if(window.location.href.includes("cowell")){
    $scope.currentRoom = "Cowell Room";
  }
  else {
    $scope.currentRoom = "Triton";
  }

}]);

app.controller("mobileHome", ["$scope", "$firebaseArray", "$location", function($scope, $firebaseArray, $location){
  $scope.showLogo = true;

  setTimeout(function(){
    $(document).ready(function(){
      console.log("jquery running");

      var thisColor;
      var showName;
      var showTitleRef;
      var exhibitColorData;
      if(window.location.href.includes("cowell")){
        exhibitColorData = COLOR_CODES.cowell;
        showTitleRef = publicRef.child('cowell');
      }
      else if(window.location.href.includes("warburton")){
        exhibitColorData = COLOR_CODES.warburton;
        showTitleRef = publicRef.child('warburton');
      }
      else if(window.location.href.includes("sculpture")){
        exhibitColorData = COLOR_CODES.sculpture;
        showTitleRef = publicRef.child('sculpture');
      }
      else if(window.location.href.includes("rotunda")){
        exhibitColorData = COLOR_CODES.rotunda;
        showTitleRef = publicRef.child('rotunda');
      }
      else if(window.location.href.includes("permanent")){
        exhibitColorData = COLOR_CODES.permanent;
        showTitleRef = publicRef.child('permanent');
      }
      else if(window.location.href.includes("jbhouse")){
        exhibitColorData = COLOR_CODES.jbhouse;
        showTitleRef = publicRef.child('cowell');
      }
      else{
        thisColor = "rgba(250,23,62,0.8)";
        showName = " ";
      }
      if(showTitleRef != null){
        showTitleRef.once('value').then(function(snapshot) {
            showName = snapshot.val().ShowTitle;
        });
      }
      if(exhibitColorData != null){
        thisColor = exhibitColorData.thisColor;
      }

      console.log(thisColor);
      if(showName != " "){
        document.getElementById("showName").innerHTML = showName;
      }
      $("#navBar").css("background-color", "rgba(187, 195, 204, 0.4)");
      $(".colored").css("background-color", thisColor);
      $("body").css("background-color", thisColor);
      $("#navBarLogo").css('display', 'block');
    });
  }, 0);

  $scope.fbID = window.location.href.substring(window.location.href.indexOf("?") + 4);
  $scope.title = "HELLO!";
  $scope.logo = "../images/tritonLogo.png";
  $scope.exhibitCode = "";
  $scope.exhibitKeys = [];
  $scope.showName = "";
  var thisRoom, thisColor, navbarColor, slide1Color, slide2Color, slide3Color, slide4Color;
  var exhibitColorData, exhibitFBRef;
  if(window.location.href.includes("cowell")){
    exhibitColorData = COLOR_CODES.cowell;
    exhibitFBRef = publicRef.child('cowell');
  }
  else if(window.location.href.includes("warburton")){
    exhibitColorData = COLOR_CODES.warburton;
    exhibitFBRef = publicRef.child('warburton');
  }
  else if(window.location.href.includes("sculpture")){
    exhibitColorData = COLOR_CODES.sculpture;
    exhibitFBRef = publicRef.child('sculpture');
    exhibitFBRef = firebase.database().ref('exhibits/sculpture/');
  }
  else if(window.location.href.includes("rotunda")){
    exhibitColorData = COLOR_CODES.rotunda;
    exhibitFBRef = publicRef.child('rotunda');
  }
  else if(window.location.href.includes("permanent")){
    exhibitColorData = COLOR_CODES.permanent;
    exhibitFBRef = publicRef.child('permanent');
  }
  else if(window.location.href.includes("jbhouse")){
    exhibitColorData = COLOR_CODES.jbhouse;
    exhibitFBRef = publicRef.child('jbhouse');
  }
  else if(window.location.href.includes("archive")){
      thisRoom = "archive";
      thisColor = "rgba(255, 255, 255, 0.8)";
      navbarColor = "rgba(255, 255, 255, 0.8)";
      slide1Color = "rgba(255, 255, 255, 0.8)";
      slide2Color = "rgba(255, 255, 255, 0.8)";
      slide3Color = "rgba(255, 255, 255, 0.8)";
      slide4Color = "rgba(255, 255, 255, 0.8)";
  }
  else{
    thisRoom = "";
    thisColor = "rgba(250,23,62,0.8)";
    navbarColor = thisColor;
  }
  if(exhibitColorData != null){
    thisRoom = exhibitColorData.thisRoom;
    thisColor = exhibitColorData.thisColor;
    navbarColor = exhibitColorData.navbarColor;
    slide1Color = exhibitColorData.slide1Color;
    slide2Color = exhibitColorData.slide2Color;
    slide3Color = exhibitColorData.slide3Color;
    slide4Color = exhibitColorData.slide4Color;
  }
  if(exhibitFBRef != null){
    exhibitFBRef.once('value').then(function(snapshot) {
        $scope.showName = snapshot.val().ShowTitle;
        $scope.$apply();
    });
  }

  //document.getElementById("navBar").style.backgroundColor = navbarColor;
  navbarColor = "rgba(187, 195, 204, 0.4)";
  console.log("thisRoom: " + thisRoom);
  $scope.thisColor = thisColor;
  //$scope.navbarColor = navbarColor;
  // var coloredObjects = document.getElementsByClassName("colored");
  // console.log(coloredObjects);
  // for(var i = 0; i < coloredObjects.length; i++){
  //   coloredObjects[i].style.backgroundColor = thisColor;
  // }


  $scope.room = thisRoom;
  //console.log("room: "+ $scope.room);

  $scope.goToExhibit = function(){
    //console.log("typed in a number");
    $scope.exhibitKeys.forEach(function(Object){
      //console.log(Object);
      //console.log(Object.thisCode);
      if($scope.exhibitCode == Object.thisCode){
        $location.path("/exhibit").search([Object.exhibitName, Object.id]);
        //console.log($location.path);
        closeKeypad();
      }
    });
  }

  var ref = firebase.database().ref();
  var exhibitId;
  if(window.location.href.includes("cowell")){
    console.log("THIS IS COWELL!!");
    exhibitId = "cowell";
  }
  else if(window.location.href.includes("warburton")){
    console.log("THIS IS WARBURTON!");
    exhibitId = "warburton";
  }
  else if(window.location.href.includes("sculpture")){
    console.log("THIS IS SCULPTURE!");
    exhibitId = "sculpture";
  }
  else if(window.location.href.includes("permanent")){
    console.log("THIS IS PERMANENT!");
    exhibitId = "permanent";
  }
  else if(window.location.href.includes("rotunda")){
    console.log("THIS IS ROTUNDA!");
    exhibitId = "rotunda";
  }
  else if(window.location.href.includes("jbhouse")){
    console.log("THIS IS ROTUNDA!");
    exhibitId = "jbhouse";
  }
  else if(window.location.href.includes("archive")){
    exhibitId = "archive";
  }
  else{
    exhibitId = "";
  }
  var exhibitRef = firebase.database().ref().child('exhibits/' + exhibitId);
  $scope.ExhibitList = $firebaseArray(exhibitRef);
  $scope.imagesUpdated = false;
  $scope.ExhibitList.$loaded().then(function(){
    angular.forEach($scope.ExhibitList, function(exhibit){
      var thisId = exhibit.$id;
      var thisCode = exhibit.exhibitCode;
      //console.log(thisId, thisCode);
      $scope.exhibitKeys.push({thisId, thisCode});
      //$scope.exhibitKeys.push({exhibit.exhibitCode, exhibit.$id});
      if(exhibit.exhibitImage){
        //console.log(exhibit);
        var imgPath = exhibit.exhibitImage;
        //console.log(imgPath);
        var storage = firebase.storage();
        var storageRef = storage.ref();

        storageRef.child(imgPath).getDownloadURL().then(function(url){
          var test = url;
          exhibit.exhibitImage = test;
          document.getElementById(exhibit.$id).setAttribute('src', test);
          //console.log(exhibit.exhibitImage);
          //console.log(ExhibitList);
        }).catch(function(error){

        });

      }
    });
    $scope.imagesUpdated = true;
    //console.log($scope.exhibitKeys);
  });

  //console.log($scope.ExhibitList);
}]);

app.controller("slideInfo", ["$scope" ,"$firebaseArray", function($scope, $firebaseArray){
  //console.log("slideInfo");

  $scope.videoLink = "";
  setTimeout(function(){
    $(document).ready(function(){
      //console.log("Slick loading");
      $("#navBar").css("background-color", "rgba(187, 195, 204, 0.4)");
      $("#navBarLogo").css('display', 'block');
      $(".regular").slick({
        dots: true,
        infinite: true,
        focusOnSelect: false,
      });

    });
  }, 0);
  $scope.showLogo = true;
  var exhibitColorData, exhibitFBRef;
  if(window.location.href.includes("cowell")){
    exhibitColorData = COLOR_CODES.cowell;
    exhibitFBRef = publicRef.child('cowell');
  }
  else if(window.location.href.includes("warburton")){
    exhibitColorData = COLOR_CODES.warburton;
    exhibitFBRef = publicRef.child('warburton');
  }
  else if(window.location.href.includes("sculpture")){
    exhibitColorData = COLOR_CODES.sculpture;
    exhibitFBRef = publicRef.child('sculpture');
    exhibitFBRef = firebase.database().ref('exhibits/sculpture/');
  }
  else if(window.location.href.includes("rotunda")){
    exhibitColorData = COLOR_CODES.rotunda;
    exhibitFBRef = publicRef.child('rotunda');
  }
  else if(window.location.href.includes("permanent")){
    exhibitColorData = COLOR_CODES.permanent;
    exhibitFBRef = publicRef.child('permanent');
  }
  else if(window.location.href.includes("jbhouse")){
    exhibitColorData = COLOR_CODES.jbhouse;
    exhibitFBRef = publicRef.child('jbhouse');
  }
  else if(window.location.href.includes("archive")){
      thisRoom = "archive";
      thisColor = "rgba(255, 255, 255, 0.8)";
      navbarColor = "rgba(255, 255, 255, 0.8)";
      slide1Color = "rgba(255, 255, 255, 0.8)";
      slide2Color = "rgba(255, 255, 255, 0.8)";
      slide3Color = "rgba(255, 255, 255, 0.8)";
      slide4Color = "rgba(255, 255, 255, 0.8)";
  }
  else{
    thisRoom = "";
    thisColor = "rgba(250,23,62,0.8)";
    navbarColor = thisColor;
  }
  if(exhibitColorData != null){
    thisRoom = exhibitColorData.thisRoom;
    thisColor = exhibitColorData.thisColor;
    navbarColor = exhibitColorData.navbarColor;
    slide1Color = exhibitColorData.slide1Color;
    slide2Color = exhibitColorData.slide2Color;
    slide3Color = exhibitColorData.slide3Color;
    slide4Color = exhibitColorData.slide4Color;
  }
  if(!(window.location.href.includes("edit"))){

  }
  document.body.style.backgroundColor = thisColor;
  var ref = firebase.database().ref();
  var thisUrl = window.location.href;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 3;
  var idEndAt = thisUrl.indexOf('&');
  var fbID = thisUrl.substring(idEndAt + 3);
  var exhibitId = thisUrl.substring(idStartAt, idEndAt);
  if(thisUrl.includes("#")){
    var idEndAt = thisUrl.indexOf("#");
    if(idEndAt > idStartAt){
      fbID = thisUrl.substring(idStartAt, idEndAt);
    }
  }
  firebase.database().ref().child("exhibits").child(thisRoom).child(fbID).once('value').then(function(snapshot){
    var exhibitData = snapshot.val();
    var fieldArray = Object.keys(exhibitData);

    fieldArray.forEach(function(key){
      if(exhibitData[key] !== ''){
        $scope[key] = exhibitData[key];
        if(key === 'slides'){
          //console.log($scope.slides);
          for(var i = 0; i < $scope.slides.length; i++){
            if($scope.slides[i] === ""){
              $scope.slides.splice(i, 1);
              i--;
            }
          }
        }
        //console.log($scope[key]);
        // if(key==='symbols'){
        //   $scope.symbols = exhibitData.symbols.split(';');
        // }
        if(key==='exhibitImage'){
          if($scope.exhibitImage != ''){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var spaceRefAudio = storageRef.child(exhibitData[key]);
            storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
              var test = url;
              $scope.exhibitImage = test;
              document.getElementById("image1").setAttribute("src", test);
              //console.log($scope.exhibitImage);
            }).catch(function(error){
            });
          }
        }
        if(key==='exhibitAudio'){
          if($scope.exhibitAudio != ''){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var spaceRefAudio = storageRef.child(exhibitData[key]);
            storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
              var test = url;
              $scope.exhibitAudioFile = test;
              document.getElementById("exhibitAudioPlayer").setAttribute("src", test);
              //console.log($scope.exhibitAudioFile);
            }).catch(function(error){

            });
          }
        }
        if(key === 'videos'){

          var url = exhibitData[key];
          var code = url.substring(url.indexOf("=") + 1);
          //console.log(code);

          var finalUrl = "https://www.youtube.com/embed/"+code;
          //console.log(finalUrl);
          $scope.videoLink = finalUrl;
          //https://www.youtube.com/embed/_QdPW8JrYzQ
          document.getElementById("videoPlayer").setAttribute("src", finalUrl);
        }
      }
    });
    firebase.database().ref().child("exhibits").child(thisRoom).child(fbID).update({
      views: $scope.views + 1
    });
    if($scope.slides.length === 1){
      var info = "";
      if($scope.title != ''){
        info = info + "Title: " + $scope.title;
      }
      if($scope.artist != ''){
        info = info + "\n Artist: " + $scope.artist;
      }
      if($scope.media != ''){
        info = info + "\n Media: " + $scope.media;
      }
      if($scope.genre != ''){
        info = info + "\n Genre: " + $scope.genre;
      }
      if($scope.year != ''){
        info = info + "\n Year: " + $scope.year;
      }
      $scope.slides.push(info);
    }

    var commentRef = firebase.database().ref().child("exhibits").child(thisRoom).child(fbID).child("comments");
    $scope.comments = $firebaseArray(commentRef);

    $scope.$apply();
  });
  $scope.name = "";
  $scope.comment ="";
  function getTimeStamp(){
    var now = new Date();
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    var time = [now.getHours(), now.getMinutes()];
    var suffix = (time[0] < 12) ? "AM" : "PM";
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    for(var i = 1; i < 3; i++){
      if(time[i] < 10) {
        time[i] = "0" + time[i];
      }
    }

    return date.join("/") + ", " + time.join(":") + " " + suffix;
  }
    $scope.postComment = function(){
      var time = getTimeStamp();
      var name = $scope.name;
      var comment = $scope.comment;
      var thisUrl = window.location.href;
      //window.location.href = thisUrl;
      var idQ = thisUrl.indexOf('?');
      var idStartAt = idQ + 3;
      var idEndAt = thisUrl.indexOf('&');
      var fbID = thisUrl.substring(idEndAt + 3);
      //console.log("fbID: " + fbID);
      var exhibitId = thisUrl.substring(idStartAt, idEndAt);
      //console.log("exhibitId" + exhibitId);
      if(thisUrl.includes("#")){
        var idEndAt = thisUrl.indexOf("#");
        if(idEndAt > idStartAt){
          fbID = thisUrl.substring(idStartAt, idEndAt);
        }
      }
      //console.log(fbID);
      var badWords = ["fuck", "shit", "cock", "dick", "pussy", "bitch", "ass", "<", ">"]; //excuse the language, gotta filter it out!

      for( var i = 0; i < badWords.length; i++){
        if(name.includes(badWords[i])){
          if(name.charAt(name.indexOf(badWords[i])) == 0){
            if(name.charAt(name.indexOf(badWords[i]) + 1) == ' ' || name.charAt(name.indexOf(badWords[i]) + 1) == ',' || name.charAt(name.indexOf(badWords[i]) + 1) == '.'){
              $scope.comment += "\n I'm sorry, your name includes inappropriate language.";
              return;
            }
          }
          if(name.charAt(name.indexOf(badWords[i] - 1)) == " " && name.charAt(name.indexOf(badWords[i]) + badWords[i].length) == " "){
            $scope.comment += "\n I'm sorry, your name includes inappropriate language.";
            return;
          }
          if(name.charAt(name.indexOf(badWords[i] - 1)) == " " && name.indexOf(badWords[i]) + badWords[i].length == name.length){
            $scope.comment += "\n I'm sorry, your name includes inappropriate language.";
            return;
          }
        }
        if(comment.includes(badWords[i])){
          if(comment.charAt(comment.indexOf(badWords[i])) == 0){
            if(comment.charAt(comment.indexOf(badWords[i]) + 1) == ' ' || comment.charAt(comment.indexOf(badWords[i]) + 1) == ',' || comment.charAt(comment.indexOf(badWords[i]) + 1) == '.'){
              $scope.comment += "\n I'm sorry, your comment includes inappropriate language.";
              return;
            }
          }
          if(comment.charAt(comment.indexOf(badWords[i] - 1)) == " " && comment.charAt(comment.indexOf(badWords[i]) + badWords[i].length) == " "){
            $scope.comment += "\n I'm sorry, your comment includes inappropriate language.";
            return;
          }
          if(comment.charAt(comment.indexOf(badWords[i] - 1)) == " " && comment.indexOf(badWords[i]) + badWords[i].length == comment.length){
            $scope.comment += "\n I'm sorry, your comment includes inappropriate language.";
            return;
          }
        }
      }
      var ref = firebase.database().ref();
      var thisUrl = window.location.href;
      var idQ = thisUrl.indexOf('?');
      var idStartAt = idQ + 3;
      var idEndAt = thisUrl.indexOf('&');
      var fbID = thisUrl.substring(idEndAt + 3);
      console.log("fbID: " + fbID);
      var exhibitId = thisUrl.substring(idStartAt, idEndAt);
      console.log("exhibitId" + exhibitId);
      if(thisUrl.includes("#")){
        var idEndAt = thisUrl.indexOf("#");
        if(idEndAt > idStartAt){
          fbID = thisUrl.substring(idStartAt, idEndAt);
        }
      }

      console.log(fbID);
      if(comment){
        if(name === ''){
          name = "Anonymous";
        }
        publicRef.child(thisRoom).child(fbID).child('comments').push({

          name: $scope.name,
          comment: $scope.comment,
          time: time,
          flagged: 0
        },function(){
          console.log("pushed!");
          $scope.name = '';
          $scope.comment = '';
          //window.location.href = "mobileIndex.html?id="+fbID;
        });
        privateRef.child(thisRoom).child(fbID).child('comments').push({

          name: $scope.name,
          comment: $scope.comment,
          time: time,
          flagged: 0
        },function(){
          console.log("pushed!");
          $scope.name = '';
          $scope.comment = '';
          //window.location.href = "mobileIndex.html?id="+fbID;
        });
      }
    }


}]);
