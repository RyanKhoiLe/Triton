var sidebarOpen = false;
var keypadOpen = false;
var commentOpen = false;
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
function newPage(){
  closeNav();
  closeSlick();
  $(document).ready(function(){

    var thisColor;
    if(window.location.href.includes("cowell")){
      thisColor = "rgba(255,201,14,0.8)";
    }
    else if(window.location.href.includes("warburton")){
      thisColor = "rgba(250,23,62,0.8)";
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
      templateUrl: "panorama.html",
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
    });

  var config = {
    apiKey: "AIzaSyCH2GOoz3WtmgKC8gs9-P0eHk02-sX9vS0",
    authDomain: "lunaspheretriton.firebaseapp.com",
    databaseURL: "https://lunaspheretriton.firebaseio.com",
    storageBucket: "lunaspheretriton.appspot.com",
  };
  firebase.initializeApp(config);
});
app.filter('reverse', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    };
  });
app.controller("mainController", ['$scope', function($scope){
  $scope.message = "SUP";
  $scope.navbarColor = "blue";//"rgba(250,23,62,0.8)";
  setTimeout(function(){
    $(document).ready(function(){
      $("body").css("overflow", "hidden");
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

  setTimeout(function(){
    $(document).ready(function(){
      console.log("jquery running");
      var thisColor;
      if(window.location.href.includes("cowell")){
        thisColor = "rgba(255,201,14,0.8)";
      }
      else if(window.location.href.includes("warburton")){
        thisColor = "rgba(250,23,62,0.8)";
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
  }, 0);

  $scope.fbID = window.location.href.substring(window.location.href.indexOf("?") + 4);
  $scope.title = "HELLO!";
  $scope.logo = "../images/tritonLogo.png";
  $scope.exhibitCode = "";
  $scope.exhibitKeys = [];
  var thisRoom, thisColor, navbarColor, slide1Color, slide2Color, slide3Color, slide4Color;

  if(window.location.href.includes("cowell")){
    thisRoom = "cowell";
    thisColor = "rgba(253, 185, 39,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
    slide1Color = "rgba(247, 198, 91, 1)";
    slide2Color = "rgba(247, 221, 165, 1)";
    slide3Color = "rgba(255, 231, 181,1)";
    slide4Color = "rgba(242, 224, 186, 1)";
  }
  else if(window.location.href.includes("warburton")){
    thisRoom = "warburton";
    thisColor = "rgba(250,23,62,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
  }
  else if(window.location.href.includes("sculpture")){
    thisRoom = "sculpture";
    thisColor = "rgba(34,177,76,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
  }
  else if(window.location.href.includes("rotunda")){
    thisRoom = "rotunda";
    thisColor = "rgba(180,234,245,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
  }
  else if(window.location.href.includes("permanent")){
    thisRoom = "permanent";
    thisColor = "rgba(0,162,232,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
  }
  else{
    thisRoom = "";
    thisColor = "rgba(250,23,62,0.8)";
    navbarColor = thisColor;
  }
  document.getElementById("navBar").style.backgroundColor = navbarColor;

  console.log("thisColor: " + thisColor);
  $scope.thisColor = thisColor;
  $scope.navbarColor = navbarColor;
  // var coloredObjects = document.getElementsByClassName("colored");
  // console.log(coloredObjects);
  // for(var i = 0; i < coloredObjects.length; i++){
  //   coloredObjects[i].style.backgroundColor = thisColor;
  // }


  $scope.room = thisRoom;
  console.log("room: "+ $scope.room);

  $scope.goToExhibit = function(){
    console.log("typed in a number");
    $scope.exhibitKeys.forEach(function(Object){
      console.log(Object);
      console.log(Object.thisCode);
      if($scope.exhibitCode == Object.thisCode){
        $location.path("/exhibit").search('id', Object.thisId);
        console.log($location.path);
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
      console.log(thisId, thisCode);
      $scope.exhibitKeys.push({thisId, thisCode});
      //$scope.exhibitKeys.push({exhibit.exhibitCode, exhibit.$id});
      if(exhibit.exhibitImage){
        console.log(exhibit);
        var imgPath = exhibit.exhibitImage;
        console.log(imgPath);
        var storage = firebase.storage();
        var storageRef = storage.ref();

        storageRef.child(imgPath).getDownloadURL().then(function(url){
          var test = url;
          exhibit.exhibitImage = test;
          document.getElementById(exhibit.title).setAttribute('src', test);
          console.log(exhibit.exhibitImage);
          console.log(ExhibitList);
        }).catch(function(error){

        });

      }
    });
    $scope.imagesUpdated = true;
    console.log($scope.exhibitKeys);
  });

  console.log($scope.ExhibitList);
}]);

app.controller("slideInfo", ["$scope" ,"$firebaseArray", function($scope, $firebaseArray){
  console.log("slideInfo");
  setTimeout(function(){
    $(document).ready(function(){
      console.log("Slick loading");
      $(".regular").slick({
        dots: true,
        infinite: true,
        focusOnSelect: false,
      });
      
    });
  }, 0);
  if(window.location.href.includes("cowell")){
    thisRoom = "cowell";
    thisColor = "rgba(253, 185, 39,0.8)";
    navbarColor = "rgba(255, 248, 213, 0.9)";
    slide1Color = "rgba(247, 198, 91, 1)";
    slide2Color = "rgba(247, 221, 165, 1)";
    slide3Color = "rgba(255, 231, 181,1)";
    slide4Color = "rgba(242, 224, 186, 1)";
  }
  document.getElementById("slide1").style.backgroundColor = slide1Color;
  document.getElementById("slide2").style.backgroundColor = slide2Color;
  document.getElementById("slide3").style.backgroundColor = slide3Color;
  document.getElementById("slide4").style.backgroundColor = slide4Color;
  //document.getElementById("slide2").height = "500px";//document.getElementById("slider").clientHeight;
  document.body.style.backgroundColor = thisColor;
  var ref = firebase.database().ref();
  var thisUrl = window.location.href;
  //window.location.href = thisUrl;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 4;
  var idEndAt = thisUrl.indexOf('&');
  var fbID = thisUrl.substring(idEndAt + 4);
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
  firebase.database().ref().child("exhibits").child("cowell").child(fbID).once('value').then(function(snapshot){
    var exhibitData = snapshot.val();
    var fieldArray = Object.keys(exhibitData);

    console.log(fieldArray);
    fieldArray.forEach(function(key){
      console.log(key);
      if(exhibitData[key] !== ''){
        $scope[key] = exhibitData[key];
        if(key === 'slides'){
          console.log($scope.slides);
          for(var i = 0; i < $scope.slides.length; i++){
            if($scope.slides[i] === ""){
              $scope.slides.splice(i, 1);
              i--;
            }
          }
        }
        console.log($scope[key]);
        // if(key==='symbols'){
        //   $scope.symbols = exhibitData.symbols.split(';');
        // }
        if(key==='exhibitImage'){
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var spaceRefAudio = storageRef.child(exhibitData[key]);
          storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
            var test = url;
            $scope.exhibitImage = test;
            document.getElementById("image1").setAttribute("src", test);
            console.log($scope.exhibitImage);
          }).catch(function(error){
          });
        }
      }
    });
    var commentRef = firebase.database().ref().child("exhibits").child("exhibitId").child(fbID).child("comments");
    $scope.comments = $firebaseArray(commentRef);
    console.log($scope.title);
    //console.log(exhibitData);
    console.log(exhibitData);

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
      var idStartAt = idQ + 4;
      var fbID = thisUrl.substring(idStartAt);
      if(thisUrl.includes("#")){
        var idEndAt = thisUrl.indexOf("#");
        if(idEndAt > idStartAt){
          fbID = thisUrl.substring(idStartAt, idEndAt);
        }

      }
      console.log(fbID);
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
      var idStartAt = idQ + 4;
      //var idEnd = //thisUrl.indexOf("#");
        var fbID = thisUrl.substring(idStartAt);
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

        firebase.database().ref('exhibits/' + exhibitId + '/' + fbID + '/comments').push({

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
