var sidebarOpen = false;
function openSideNav(){
  console.log("clicked");
  if(sidebarOpen){
    console.log('it is open!');
    closeNav();
    return;
  }
  document.getElementById("sidenav").style.width = "250px";
  sidebarOpen = true;
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
  sidebarOpen = false;
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

app.controller("mainController", ['$scope', function($scope){
  $scope.message = "SUP";
}]);

app.controller("mobileHome", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
  $scope.fbID = window.location.href.substring(window.location.href.indexOf("?") + 4);
  $scope.title = "HELLO!";
  $scope.logo = "../images/tritonLogo.png";
  var ref = firebase.database().ref();
  var exhibitRef = ref.child('exhibits');
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

}]);
