var app = angular.module("database", ["firebase", "ngRoute"]);

app.config(function($routeProvider){
  $routeProvider

    .when('/', {
      templateUrl: "dbhome.html",
      controller: "mainController"
    })
    .when('/editexhibit',{
      templateUrl: "editexhibitMobile.html",
      controller: "editExhibit"
    })
    .when('/commentmoderator',{
      templateUrl: "commentExplorer.html",
      controller: "commentExplorer"
    });

    var config = {
      apiKey: "AIzaSyCH2GOoz3WtmgKC8gs9-P0eHk02-sX9vS0",
      authDomain: "lunaspheretriton.firebaseapp.com",
      databaseURL: "https://lunaspheretriton.firebaseio.com",
      storageBucket: "lunaspheretriton.appspot.com",
    };
    firebase.initializeApp(config);
});
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
  //$scope.useThisId = fbID;
  //console.log($scope.useThisId);
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
app.controller("editExhibit", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
  $scope.exhibitSelect = "";
  $scope.numberOfSlides = 3;
  $scope.slideIds = [];
  $scope.slideValues = [];
  $scope.year = "";
  $scope.artist = "";
  $scope.videos = "";
  $scope.title = "";
  $scope.media = "";
  $scope.genre = "";
  $scope.exhibitCode = "";
  $scope.exhibitAudio = "";
  $scope.exhibitImage = "";
  $scope.inputtedExhibit = "";
  $scope.timeStamp = "";
  for(var i = 0; i < 10; i++){
    $scope.slideIds.push(false);
    $scope.slideValues.push("");
  }
  for(var i = 0; i < $scope.numberOfSlides; i++){
    $scope.slideIds[i] = true;
  }
  var ref = firebase.database().ref();
  var thisUrl = window.location.href;
  //window.location.href = thisUrl;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 4;
  var fbID = thisUrl.substring(idStartAt);
  if(thisUrl.includes("#")){
    var idEndAt = thisUrl.indexOf("#");
    fbID = thisUrl.substring(idStartAt, idEndAt);
  }
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
            document.getElementById("exhibitImagePreview").setAttribute("src", test);
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
  $scope.updatePage = function(){
    console.log("update called");
    firebase.database().ref('exhibits/' + fbID).update({
        title: $scope.title,
        artist: $scope.artist,
        year: $scope.year,
        genre: $scope.genre,
        media: $scope.media,
        //exhibitImage: $scope.exhibitImage,
        videos: $scope.videos,
        timeStamp: getTimeStamp(),
        exhibitAudio: $scope.exhibitAudio,
        exhibitCode: $scope.exhibitCode
    });
    document.getElementById("exhibitPreview").setAttribute("src", "index.html#/exhibit?id=" + fbID + "#edit");
  }
  // window.onscroll = function(){
  //   //console.log('scrollTop: ' + document.body.scrollTop);
  //   if(document.body.scrollTop > 290 && document.body.scrollTop < 3260){
  //     var showExhibit = document.getElementById("showExhibit");
  //     var jumpToBar = document.getElementById("jumpTo");
  //     jumpToBar.style.position = 'fixed';
  //     jumpToBar.style.top = '0px';
  //     style = showExhibit.style;
  //     style.position = 'fixed';
  //     style.marginLeft = '53%';
  //     style.top = '15px';
  //     style.marginTop = '0px';
  //   }
  //   if(document.body.scrollTop <= 290){
  //     var showExhibit = document.getElementById("showExhibit");
  //     style = showExhibit.style;
  //     style.position = 'static';
  //     style.marginLeft = '5%';
  //     var jumpToBar = document.getElementById("jumpTo");
  //     jumpToBar.style.position = 'static';
  //     jumpToBar.style.top = '0px';
  //   }
  //   if(document.body.scrollTop >= 3260){
  //     var showExhibit = document.getElementById("showExhibit");
  //     style = showExhibit.style;
  //     style.position = 'static';
  //     style.marginLeft = '5%';
  //     style.marginTop = '2900px';
  //   }
  // }


}]);