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
  if(sidebarOpen){
    console.log('it is open!');
    closeNav();
    return;
  }
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("sidebarButton").style.color = "white";
  sidebarOpen = true;
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("sidebarButton").style.color = "black";
  sidebarOpen = false;
}
function newPage(){
  closeNav();
  closeSlick();
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
      templateUrl: "home.html",
      controller: "mobileHome"
    })
    .when('/exhibit', {
      templateUrl: "exhibit.html",
      controller: "slideInfo"
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
    return function(items) {
      return items.slice().reverse();
    };
  });
app.controller("mainController", ['$scope', function($scope){
  $scope.message = "SUP";
}]);

app.controller("mobileHome", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
  $scope.fbID = window.location.href.substring(window.location.href.indexOf("?") + 4);
  $scope.title = "HELLO!";
  $scope.logo = "../images/tritonLogo.png";
  $scope.exhibitCode = "";
  $scope.exhibitKeys = [];
  $scope.goToExhibit = function(){
    console.log("typed in a number");
    $scope.exhibitKeys.forEach(function(Object){
      console.log(Object);
      console.log(Object.thisCode);
      if($scope.exhibitCode == Object.thisCode){
        window.location.href += "exhibit?id=" + Object.thisId;
        closeKeypad();
      }
    });
  }

  var ref = firebase.database().ref();
  var exhibitRef = ref.child('exhibits');
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
  setTimeout(function(){
    $(document).ready(function(){
      console.log("Slick loading");
      $(".regular").slick({
        dots: true,
        infinite: true,
        focusOnSelect: false
      });
    });
  }, 0);
  var ref = firebase.database().ref();
  var thisUrl = window.location.href;
  //window.location.href = thisUrl;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 4;
  var fbID = thisUrl.substring(idStartAt);
  console.log(fbID);
  ref.child("exhibits").child(fbID).once('value').then(function(snapshot){
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
    var commentRef = firebase.database().ref().child("exhibits").child(fbID).child("comments");
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
      console.log(fbID);
      if(comment){
        if(name === ''){
          name = "Anonymous";
        }

        firebase.database().ref('exhibits/' + fbID + '/comments').push({

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
