$(document).on("pagecreate", function(){

  (function(){
    var app = angular.module("mobileIndex", ["firebase", "ngRoute"]); //

    app.config(function($routeProvider){ //
      // $urlRouterProvider.otherwise('html/mobileHome.html');
      // $stateProvider
      //   .state('home', {
      //     url: '/',
      //     templateUrl: 'mobileHomeAngular.html',
      //     controller: 'mobileHome'
      //   })
      //   .state('exhibit', {
      //     url: 'html/mobileIndexAngular.html?id',
      //     templateUrl: 'mobileIndexAngular.html',
      //     controller: function($scope, $stateParams){
      //       $scope.id = $stateParams.id;
      //     }
      //   });
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

    app.controller("mobileHome", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
      $scope.fbID = window.location.href.substring(window.location.href.indexOf("?") + 4);
      $scope.title = "HELLO!";
      $scope.logo = "../images/tritonLogo.png";
      // function makeExhibit(title, artist, id){
      //   this.title = title;
      //   this.artist = artist;
      //   this.id = id;
      // }
      var ref = firebase.database().ref();
      var exhibitRef = ref.child('exhibits');
      // $scope.exhibitList = [];
      // firebase.database().ref('exhibits/').on("child_added", function(snapshot){
      //   var fbID = snapshot.val();
      //   exhibitImage = fbID.exhibitImage;
      //   title = fbID.title;
      //   artist = fbID.artist;
      //   uniqueId = snapshot.key;
      //   exhibitCode = fbID.exhibitCode;
      //   var exhibit = new makeExhibit(title, artist, uniqueId);
      //   $scope.exhibitList.push(exhibit);
      //   console.log("firebase is going...");
      //   console.log($scope.exhibitList);
      // });
      // console.log($scope.exhibitList);
      // console.log($scope.exhibitList[2]);
      $scope.ExhibitList = $firebaseArray(exhibitRef);
      $scope.imagesUpdated = false;
      $scope.ExhibitList.$loaded().then(function(){
        angular.forEach($scope.ExhibitList, function(exhibit){
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
      });

      console.log($scope.ExhibitList);
      //$scope.$apply();
    }]);

    app.controller("slideInfo", ["$scope" ,"$firebaseArray", function($scope, $firebaseArray){
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
        // var slider = document.getElementById("slider");
        // //slider.setAttribute("class", "regular slider");
        // for(var i = 0; i < $scope.slides.length; i++){
        //   var slide = document.createElement("div");
        //   slide.setAttribute("class", "slide");
        //
        //   var title = document.createElement("h1");
        //   title.innerHTML = $scope.title;
        //   var content = document.createElement("h3");
        //   content.innerHTML = $scope.slides[i];
        //   slide.appendChild(title);
        //   slide.appendChild(content);
        //   slider.appendChild(slide);
        // }
        // var details = document.createElement("div");
        // details.setAttribute("class", "slide");
        // var detailTitle = document.createElement("h1");
        // detailTitle.innerHTML = $scope.title + ": Details";
        // var detailContent = document.createElement("p");
        // detailContent.innerHTML = " <b> Title: </b>"+ $scope.title+" <br> <b> Artist: </b>"+$scope.artist+" <br>"
        // details.appendChild(detailTitle);
        // details.appendChild(detailContent);
        // slider.appendChild(details);
        // //document.getElementById("angularContainer").appendChild(slider);

        $scope.$apply();
      });

    }]);

    app.controller("commentPost", ["$scope","$firebaseArray", function($scope,$firebaseArray){
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
        var idEnd = thisUrl.indexOf("#");
        var fbID = thisUrl.substring(idStartAt, idEnd);
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
            $scope.name = '';
            $scope.comment = '';
            window.location.href = "mobileIndex.html?id="+fbID;
          });
        }


      }
    }]);
  })();

  $(".regular").slick({
    dots: true,
    infinite: true,
    focusOnSelect: false
  });

});
