//TODO CONVERT TO angular
(function(){
  var app = angular.module("exhibit", ["firebase"]);
  app.config(function(){
    var config = {
      apiKey: CONFIG.FB_KEY,
      authDomain: "lunaspheretriton.firebaseapp.com",
      databaseURL: "https://lunaspheretriton.firebaseio.com",
      storageBucket: "lunaspheretriton.appspot.com",
    };
    firebase.initializeApp(config);
  })

  app.controller("loadPage",["$scope", "$firebaseArray", function($scope, $firebaseArray){
    var ref = firebase.database().ref();
    $scope.title = 'awesome';
    ref.child("exhibits").child("-KPnYv3Y2XVqX7FoIj7v").once('value').then(function(snapshot) {
      var exhibitData = snapshot.val();
      var fieldArray = Object.keys(exhibitData);

      console.log(fieldArray);
      fieldArray.forEach(function(key){
        console.log(key);
        if(exhibitData[key] !== ''){
          $scope[key] = exhibitData[key];
          console.log($scope[key]);
          if(key==='symbols'){
            $scope.symbols = exhibitData.symbols.split(';');
          }
          if(key==='exhibitImage'){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var spaceRefAudio = storageRef.child(exhibitData[key]);
            storageRef.child(exhibitData[key]).getDownloadURL().then(function(url){
              var test = url;
              $scope.exhibitImage = test;
              console.log($scope.exhibitImage);
            }).catch(function(error){
            });
          }
        }
      });

      console.log($scope.title);
      //console.log(exhibitData);
      console.log(exhibitData);
      $scope.$apply();
    });
    var comments = ref.child("exhibits").child("-KPnYv3Y2XVqX7FoIj7v").child("comments");
    $scope.comments = $firebaseArray(comments);
    console.log($scope.comments);
  }]);
})();
