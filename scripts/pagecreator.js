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

app.controller("createNewPage", [$scope]){
  $scope.firebase = firebase.database();
  $scope.title = title;
  $scope.artist = artist;
  $scope.year = year;
  $scope.genre;
}
