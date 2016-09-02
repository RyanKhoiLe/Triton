$(document).on("pagecreate", "#exhibit", function(){
  $(".regular").slick({
    dots: true,
    infinite: true,
  });
});

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

  app.controller("slideInfo", ["$scope" ,"$firebaseArray", function($scope, $firebaseArray){
    var ref = firebase.database().ref();
    ref.child("exhibits").child("-KQgNAb_IcFTjJV6YpL6").once('value').then(function(snapshot){
      var exhibitData = snapshot.val();
      var fieldArray = Object.keys(exhibitData);

      console.log(fieldArray);
      fieldArray.forEach(function(key){
        console.log(key);
        if(exhibitData[key] !== ''){
          $scope[key] = exhibitData[key];
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
      $scope.$apply();

    });
  }]);
})();
