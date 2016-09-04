$(document).on("pagecreate", function(){

  (function(){
    var app = angular.module("mobileIndex", ["firebase"]);

    app.config(function(){
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
      console.log($scope.ExhibitList);
    }]);

    app.controller("slideInfo", ["$scope" ,"$firebaseArray", function($scope, $firebaseArray){
      var ref = firebase.database().ref();
      var thisUrl = window.location.href;
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
            // if(key==='exhibitImage'){
            //   var storage = firebase.storage();
            //   var storageRef = storage.ref();
            //   var spaceRefAudio = storageRef.child(exhibitData[key]);
            //   storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
            //     var test = url;
            //     $scope.exhibitImage = test;
            //     console.log($scope.exhibitImage);
            //   }).catch(function(error){
            //   });
            // }
          }
        });

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
  })();

  $(".regular").slick({
    dots: true,
    infinite: true,
    focusOnSelect: false
  });

});
