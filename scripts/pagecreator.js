(function(){
  var app = angular.module("pcApp", ["firebase"]);
  app.config(function(){
    var config = {
      apiKey: "AIzaSyCH2GOoz3WtmgKC8gs9-P0eHk02-sX9vS0",
      authDomain: "lunaspheretriton.firebaseapp.com",
      databaseURL: "https://lunaspheretriton.firebaseio.com",
      storageBucket: "lunaspheretriton.appspot.com",
    };
    firebase.initializeApp(config);
  });

  app.controller("createNewPage", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
    $scope.numberOfSlides = 3;
    $scope.oneImage = true;
    $scope.exhibitSelect = "";
    $scope.details = true;
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
    $scope.showModal = false;
    $scope.inputtedExhibit = "";
    $scope.allExhibits = $firebaseArray(firebase.database().ref('exhibits'));
    console.log($scope.allExhibits);

    for(var i = 0; i < 10; i++){
      $scope.slideIds.push(false);
      $scope.slideValues.push("");
    }
    for(var i = 0; i < $scope.numberOfSlides; i++){
      $scope.slideIds[i] = true;
    }
    console.log($scope.slideIds);
      // document.getElementById("numberOfSlides").onchange = function(){
      //   console.log($scope.numberOfSlides);
      //   //TODO make slides using ng-repeat
      //   for(var i = 0; i <$scope.slideIds.length; i++){
      //     $scope.slideIds[i] = false;
      //   }
      //   for(var i = 0; i < $scope.numberOfSlides; i++){
      //     $scope.slideIds[i] = true;
      //   }
      //   $scope.$apply();
      // };
      // document.getElementById("oneImage").onchange = function(evt){
      //   console.log($scope.oneImage);
      // }
      $scope.checkExhibit = function(){
        console.log($scope.exhibitSelect);
        //console.log(document.getElementById("exhibitSelected").textContent);
        if($scope.exhibitSelect == "New"){
          console.log("NEW IS SELECTED");
          $scope.inputExhibit = true;
        }
        else{
          $scope.inputExhibit = false;
        }
        //$scope.$apply();
      }
      $scope.createNewPage = function(){
        // evt.preventDefault();
        console.log("Exhibit:" + $scope.exhibitSelect);
        console.log("This database is managed by Khoi Le, 2016");
        var title = $scope.title,
        artist = $scope.artist,
        year = $scope.year,
        genre = $scope.genre,
        media = $scope.media,
        exhibitImage = document.getElementById("exhibitImage").value,
        videos = $scope.videos,
        timeStamp = getTimeStamp(),
        exhibitAudio = document.getElementById("exhibitAudio").value,
        exhibitCode = $scope.exhibitCode,
        exhibit = $scope.exhibitSelect,
        slides = [];

        if($scope.inputExhibit === true){
          exhibit = document.getElementById("inputtedExhibit").value;
        }
        for(var i = 0; i < 10; i++){
          if($scope.slideIds[i]){
            console.log("pushing to slides");
              slides = $scope.slideValues;
          }
          else{
            break;
          }
        }
        console.log(slides);
        if(title && exhibitCode && slides){
          firebase.database().ref("allExhibits/").push({
            exhibit: exhibit
          });
          var key = firebase.database().ref('exhibits/').child(exhibit).push({
            title: title,
            artist: artist,
            year: year,
            genre: genre,
            media: media,
            exhibitImage: exhibitImage,
            videos: videos,
            timeStamp: timeStamp,
            views: 0,
            exhibitCode: exhibitCode,
            slides: slides,
            exhibit: exhibit,
            exhibitAudio: exhibitAudio
          }, function(){
            console.log("successfully written to khoi le's firebase");
            $scope.showModal = true;
            $scope.$apply();
          }).key;
        }
        else{
          alert('Lunasphere wants to push your best content. Please enter a title, artist, and information for the first slide');
        }
      }
      $scope.makeAnother = function (){
        window.location.href = 'pagecreatorMobile.html';
      }
      $scope.sendToExhibit = function (){
        window.location.href = 'exhibit.html?id=' + fbID;
      }
      $scope.editExhibit = function (){
        window.location.href = 'editexhibit.html?id=' + fbID;
      }
      $scope.goToExplorer = function (){
        window.location.href = 'databaseExplorer.html';
      }
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
  }]);
})();
