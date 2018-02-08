function setExhibitBox(){
  document.getElementById("exhibitSelect").value = document.getElementById("exhibitDropdown").value;
}
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
    .when('/editShowTitles',{
      templateUrl: "editShowTitles.html",
      controller: "editShowTitles"
    })
    .when('/commentmoderator',{
      templateUrl: "commentExplorer.html",
      controller: "commentExplorer"
    });

    var config = {
      apiKey: CONFIG.FB_KEY,
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
  var idStartAt = idQ + 3;
  var idAnd = thisUrl.indexOf('&');
  var fbIDStart = idAnd + 3;
  var thisRoom = thisUrl.substring(idStartAt, idAnd);
  var fbID = thisUrl.substring(idAnd);
  //$scope.useThisId = fbID;
  //console.log($scope.useThisId);
  console.log(fbID);
  privateRef.child(thisRoom).child(fbID).once('value').then(function(snapshot){
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
    var commentRef = publicRef.child(thisRoom).child(fbID).child("comments");
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
      var idStartAt = idQ + 3;
      var idAnd = thisUrl.indexOf('&');
      var fbIDStart = idAnd + 3;
      var thisRoom = thisUrl.substring(idStartAt, idAnd);
      var fbID = thisUrl.substring(idAnd);
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
      var idStartAt = idQ + 3;
      var idAnd = thisUrl.indexOf('&');
      var fbIDStart = idAnd + 3;
      var thisRoom = thisUrl.substring(idStartAt, idAnd);
      var fbID = thisUrl.substring(fbIDStart);
      console.log(fbID);
      if(comment){
        if(name === ''){
          name = "Anonymous";
        }

        firebase.database().ref("private").child(thisRoom + '/' + fbID + '/comments').push({

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
        firebase.database().ref("public").child(thisRoom + '/' + fbID + '/comments').push({

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
  setTimeout(function(){
    $(document).ready(function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        } else {
          //return;
          console.log("NO ONE SIGNED IN");
          window.open("databaseLogin.html", "_self");
        }
      });
      var thisUrl = window.location.href;
      //window.location.href = thisUrl;
      var idQ = thisUrl.indexOf('?');
      var idStartAt = idQ + 3;
      var idAnd = thisUrl.indexOf('&');
      var fbIDStart = idAnd + 3;
      var thisRoom = thisUrl.substring(idStartAt, idAnd);
      $("#exhibitDropdown").val(thisRoom);
    });
  }, 0);
  $scope.setExhibitBox = function() {
    alert($scope.exhibit);
  };
  $scope.exhibit = "";
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
  $scope.imagePreviewLink = "";
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
  var publicRef = ref.child("public");
  var privateRef = ref.child("private");
  var thisUrl = window.location.href;
  //window.location.href = thisUrl;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 3;
  var idAnd = thisUrl.indexOf('&');
  var fbIDStart = idAnd + 3;
  var thisRoom = thisUrl.substring(idStartAt, idAnd);
  //console.log(thisRoom);
  var fbID = thisUrl.substring(fbIDStart);
  if(thisUrl.includes("#")){
    var idEndAt = thisUrl.indexOf("#");
    fbID = thisUrl.substring(idStartAt, idEndAt);
  }
  // PULL FROM PRIVATE
  privateRef.child(thisRoom).child(fbID).on('value', function(snapshot){
    console.log();
    var exhibitData = snapshot.val();
    var fieldArray = Object.keys(exhibitData);

    fieldArray.forEach(function(key){
      if(exhibitData[key] !== ''){
        $scope[key] = exhibitData[key];
        if(key === 'slides'){
          for(var i = 0; i < $scope.slides.length; i++){
            if($scope.slides[i] === ""){
              $scope.slides.splice(i, 1);
              i--;
            }
          }
        }
        if(key==="exhibit"){
          // get drop down, set value based on exhibit name
          // $scope.exhibit
          document.getElementById("exhibitDropdown").value = $scope.exhibit;
        }

        if(key==='exhibitImage'){
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var spaceRefAudio = storageRef.child(exhibitData[key]);
          storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
            var test = url;
            $scope.imagePreviewLink = test;
            document.getElementById("exhibitImagePreview").setAttribute("src", test);
          }).catch(function(error){
          });
        }
        if(key==='exhibitAudio'){
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var spaceRefAudio = storageRef.child(exhibitData[key]);
          storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
            var test = url;
            $scope.exhibitAudio = test;
            document.getElementById("exhibitAudioPreview").setAttribute("src", test);
          }).catch(function(error){
          });
        }
      }
    });

    // PUSH COMMENTS TO BOTH
    var commentRef = privateRef.child(thisRoom).child(fbID).child("comments");
    $scope.comments = $firebaseArray(commentRef);
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

  /* Function updatePage happens when user hits save
   * button. It pulls all values from the form using
   * Angular scope, then pushes to either the privateRef tree
   * or the publicRef tree on the Firebase. */
  $scope.updateChangePage = function(tree){
    var ref = firebase.database().ref();
    var publicRef = ref.child("public");
    var privateRef = ref.child("private");
    var refToPush = null;
    if(tree == "private"){
      refToPush = privateRef;
    }
    if(tree == "public"){
      refToPush = publicRef;
    }
    var thisUrl = window.location.href;
    var idQ = thisUrl.indexOf('?');
    var idStartAt = idQ + 3;
    var idAnd = thisUrl.indexOf('&');
    var fbIDStart = idAnd + 3;
    var thisRoom = thisUrl.substring(idStartAt, idAnd);
    var fbID = thisUrl.substring(fbIDStart);
    console.log("update called");
    var exhibitName = document.getElementById("exhibitDropdown").value;
    $scope.exhibit = exhibitName;
    var exhibitImageValue = document.getElementById("exhibitImage").value;
    var exhibitAudioValue = document.getElementById("exhibitAudio").value;
    var switchedExhibits = false;
    if(thisRoom != exhibitName){ // Changed rooms
      switchedExhibits = true;
      // TODO: Switch to pushTonew()
      privateRef.child(thisRoom).child(fbID).remove().then(function() {
        console.log("Remove succeeded.");
        exhibitName;
        console.log("Switched exhibit to: " + exhibitName);
        var newExhibit = privateRef.child(exhibitName).push({
            title: $scope.title,
            artist: $scope.artist,
            year: $scope.year,
            genre: $scope.genre,
            media: $scope.media,
            exhibitImage: exhibitImageValue,
            videos: $scope.videos,
            timeStamp: getTimeStamp(),
            exhibitAudio: exhibitAudioValue,
            exhibitCode: $scope.exhibitCode,
            slides: $scope.slides,
            exhibit: $scope.exhibit,
            views: $scope.views

        }).key;

        //alert("Successfully switched exhibit to: " + thisRoom);
        //window.location.href = thisUrl.substring(0, idStartAt) + thisRoom + "&1=" + newExhibit;
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
      publicRef.child(thisRoom).child(fbID).remove().then(function() {
        console.log("Remove succeeded.");
        console.log("Switched exhibit to: " + exhibitName);
        var newExhibit = publicRef.child(exhibitName).push({
            title: $scope.title,
            artist: $scope.artist,
            year: $scope.year,
            genre: $scope.genre,
            media: $scope.media,
            exhibitImage: exhibitImageValue,
            videos: $scope.videos,
            timeStamp: getTimeStamp(),
            exhibitAudio: exhibitAudioValue,
            exhibitCode: $scope.exhibitCode,
            slides: $scope.slides,
            exhibit: $scope.exhibit,
            views: $scope.views

        }).key;

        alert("Successfully switched exhibit to: " + thisRoom);

      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });

    }

      if(refToPush == firebase.database().ref().child("public")){
        firebase.database().ref().child("private").child(thisRoom).child(fbID).update({
            title: $scope.title,
            artist: $scope.artist,
            year: $scope.year,
            genre: $scope.genre,
            media: $scope.media,
            exhibitImage: exhibitImageValue,
            videos: $scope.videos,
            timeStamp: getTimeStamp(),
            exhibitAudio: exhibitAudioValue,
            exhibitCode: $scope.exhibitCode,
            slides: $scope.slides,
            exhibit: $scope.exhibit,
            views: $scope.views

        });
      }
      refToPush.child(thisRoom).child(fbID).update({
          title: $scope.title,
          artist: $scope.artist,
          year: $scope.year,
          genre: $scope.genre,
          media: $scope.media,
          exhibitImage: exhibitImageValue,
          videos: $scope.videos,
          timeStamp: getTimeStamp(),
          exhibitAudio: exhibitAudioValue,
          exhibitCode: $scope.exhibitCode,
          slides: $scope.slides,
          exhibit: $scope.exhibit,
          views: $scope.views

      });
      alert("Successfully updated.");
      if(switchedExhibits){
        window.location.href = thisUrl.substring(0, idStartAt) + thisRoom + "&1=" + newExhibit;
      }

  }
}]);



app.controller("editShowTitles", ["$scope", "$firebaseArray", function($scope, $firebaseArray){

  $scope.cowellshowtitle = "";
  $scope.warburtonshowtitle = "";
  $scope.permanentshowtitle = "";
  $scope.sculptureshowtitle = "";
  $scope.rotundashowtitle = "";
  $scope.jbhouseshowtitle = "";
  $scope.editShowTitlesPrivate = function () {
    firebase.database().ref("private/cowell/").update({
      ShowTitle: $scope.cowellshowtitle
    });
    firebase.database().ref("private/warburton/").update({
      ShowTitle: $scope.warburtonshowtitle
    });
    firebase.database().ref("private/permanent/").update({
      ShowTitle: $scope.permanentshowtitle
    });
    firebase.database().ref("private/rotunda/").update({
      ShowTitle: $scope.rotundashowtitle
    });
    firebase.database().ref("private/jbhouse/").update({
      ShowTitle: $scope.jbhouseshowtitle
    });
    firebase.database().ref("private/sculpture/").update({
      ShowTitle: $scope.sculptureshowtitle
    });
  }
  $scope.editShowTitlesPublic = function () {
    $scope.editShowTitlesPrivate();
    firebase.database().ref("public/cowell/").update({
      ShowTitle: $scope.cowellshowtitle
    });
    firebase.database().ref("public/warburton/").update({
      ShowTitle: $scope.warburtonshowtitle
    });
    firebase.database().ref("public/permanent/").update({
      ShowTitle: $scope.permanentshowtitle
    });
    firebase.database().ref("public/rotunda/").update({
      ShowTitle: $scope.rotundashowtitle
    });
    firebase.database().ref("public/jbhouse/").update({
      ShowTitle: $scope.jbhouseshowtitle
    });
    firebase.database().ref("public/sculpture/").update({
      ShowTitle: $scope.sculptureshowtitle
    });
  }

  var ref = firebase.database().ref();
  var thisUrl = window.location.href;
  //window.location.href = thisUrl;
  var idQ = thisUrl.indexOf('?');
  var idStartAt = idQ + 3;
  var idAnd = thisUrl.indexOf('&');
  var fbIDStart = idAnd + 3;
  var thisRoom = thisUrl.substring(idStartAt, idAnd);
  //console.log(thisRoom);
  var fbID = thisUrl.substring(fbIDStart);
  if(thisUrl.includes("#")){
    var idEndAt = thisUrl.indexOf("#");
    fbID = thisUrl.substring(idStartAt, idEndAt);
  }

  firebase.database().ref("private/cowell/").once("value").then(function(snapshot) {
    $scope.cowellshowtitle = snapshot.val().ShowTitle;
    console.log($scope.cowellshowtitle);
    $scope.$apply();
  });

  firebase.database().ref("private/warburton/").once("value").then(function(snapshot) {
    $scope.warburtonshowtitle = snapshot.val().ShowTitle;
    $scope.$apply();

  });

  firebase.database().ref("private/permanent/").once("value").then(function(snapshot) {
    $scope.permanentshowtitle = snapshot.val().ShowTitle;
    $scope.$apply();

  });

  firebase.database().ref("private/sculpture/").once("value").then(function(snapshot) {
    $scope.sculptureshowtitle = snapshot.val().ShowTitle;
    $scope.$apply();

  });

  firebase.database().ref("private/rotunda/").once("value").then(function(snapshot) {
    $scope.rotundashowtitle = snapshot.val().ShowTitle;
    $scope.$apply();

  });

  firebase.database().ref("private/jbhouse/").once("value").then(function(snapshot) {
    $scope.jbhouseshowtitle = snapshot.val().ShowTitle;
    $scope.$apply();

  });

}]);
