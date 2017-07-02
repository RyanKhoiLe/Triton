$(document).on("pagecreate", "#home", function(){

  (function(){
    var app = angular.module("mobileIndex", ["ngRoute", "firebase"]);

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
    }]);
  })();

});
