
var config = {
  apiKey: "AIzaSyCVFksGcDoYDk23wAG58XdYdfyDL7urzUY",
  authDomain: "learnfirebase-43e98.firebaseapp.com",
  databaseURL: "https://learnfirebase-43e98.firebaseio.com",
  storageBucket: "learnfirebase-43e98.appspot.com",
};
firebase.initializeApp(config);
var url = "https://learnfirebase-43e98.firebaseio.com";
var firebaseRef = firebase.database();
var thisUrl = window.location.href;
console.log(thisUrl);
var keyStartAt = window.location.href.indexOf('?');
var idStartAt = keyStartAt + 4;
var fbID = thisUrl.substring(idStartAt);

var title, artist, summary, artistLastName, historyOfPainting, historyOfArtist, year, genre;
var symbols = [];
var videos = [];
var firstTimeLoad = false;
console.log(fbID);
//TO-DO SET EVENT TRIGGER TO ONCE SINCE IT IS STATIC UI
firebaseRef.ref('exhibits/' + fbID).on('value', function(snapshot) {
  var exhibitData = snapshot.val();
  console.log(exhibitData);
  setContent(exhibitData);
});
function setContent(data){
  title = data.title;
  artist = data.artist;
  year = data.year;
  genre = data.genre;
  media = data.media;
  exhibitImage = data.exhibitImage;
  summary = data.summary;
  artistLastName = data.artist.substring(data.artist.indexOf(' ') + 1);
  symbols = data.symbols.split(',');
  historyOfPainting = data.historyOfPainting;
  historyOfArtist = data.historyOfArtist;
  if(data.videos != null){
    console.log("THERE ARE VIDEOS!");
    videos = data.videos.split(',');
  }
  setHTMLContent();
}
function setHTMLContent(){
  document.getElementById("headBarTitle").textContent = '' + title + ' - ' + artistLastName;
  document.getElementById("title").textContent = "Title: " + title;
  document.getElementById("artist").textContent = "Artist: " + artist;
  document.getElementById("year").textContent = "Year: " + year;
  document.getElementById("genre").textContent = "Genre: " + genre;
  document.getElementById("media").textContent = "Media: " + media;
  document.getElementById("exhibitImage").setAttribute("src", exhibitImage);
  document.getElementById("summary").textContent = summary;
  var unorderedList = document.createElement("ul");
  var listInSymbols = document.getElementById("symbols").appendChild(unorderedList);
  for(var i = 0; i < symbols.length; i++){
    var listNode = document.createElement("li");
    var node = document.createTextNode('' + symbols[i]);
    listNode.appendChild(node);
    listInSymbols.appendChild(listNode);
  }
  document.getElementById("historyOfPaintingHead").textContent = "History of " + title;
  document.getElementById("historyOfPainting").textContent = historyOfPainting;
  document.getElementById("historyOfArtistHead").textContent = "History of " + artist;
  document.getElementById("historyOfArtist").textContent = historyOfArtist;
  console.log(videos);
  if(videos.length >= 1 && videos[0]!="" && firstTimeLoad === false){
    firstTimeLoad = true;
    for(var i = 0; i < videos.length; i++){
      var vidTitle = document.createElement("h2");
      var node = document.createTextNode("Video " + (i+1));
      vidTitle.appendChild(node);
      var iFrame = document.createElement("iframe");
      iFrame.setAttribute("class", "video");
      iFrame.setAttribute("src", videos[i]);
      iFrame.setAttribute("frameborder", "0");
      iFrame.setAttribute("allowfullscreen", true);
      var vidBox = document.getElementById("vidBox");
      vidBox.appendChild(vidTitle);
      vidBox.appendChild(iFrame);

    }
  }
}
function timeStamp(){
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

function postComment(){
  var name = document.getElementById("name").value,
  comment = document.getElementById("comment").value,
  time = timeStamp();
  var badWords = ["fuck", "shit", "cock", "dick", "pussy", "bitch", "ass", "<", ">"]; //excuse the language, gotta filter it out!
  for( var i = 0; i < badWords.length; i++){
    if(name.includes(badWords[i])){
      if(name.charAt(name.indexOf(badWords[i])) == 0){
        if(name.charAt(name.indexOf(badWords[i]) + 1) == ' ' || name.charAt(name.indexOf(badWords[i]) + 1) == ',' || name.charAt(name.indexOf(badWords[i]) + 1) == '.'){
          document.getElementById("comment").value += "\n I'm sorry, your name includes inappropriate language.";
          return;
        }
      }
      if(name.charAt(name.indexOf(badWords[i] - 1)) == " " && name.charAt(name.indexOf(badWords[i]) + badWords[i].length) == " "){
        document.getElementById("comment").value += "\n I'm sorry, your name includes inappropriate language.";
        return;
      }
      if(name.charAt(name.indexOf(badWords[i] - 1)) == " " && name.indexOf(badWords[i]) + badWords[i].length == name.length){
        document.getElementById("comment").value += "\n I'm sorry, your name includes inappropriate language.";
        return;
      }
    }
    if(comment.includes(badWords[i])){
      if(comment.charAt(comment.indexOf(badWords[i])) == 0){
        if(comment.charAt(comment.indexOf(badWords[i]) + 1) == ' ' || comment.charAt(comment.indexOf(badWords[i]) + 1) == ',' || comment.charAt(comment.indexOf(badWords[i]) + 1) == '.'){
          document.getElementById("comment").value += "\n I'm sorry, your comment includes inappropriate language.";
          return;
        }
      }
      if(comment.charAt(comment.indexOf(badWords[i] - 1)) == " " && comment.charAt(comment.indexOf(badWords[i]) + badWords[i].length) == " "){
        document.getElementById("comment").value += "\n I'm sorry, your comment includes inappropriate language.";
        return;
      }
      if(comment.charAt(comment.indexOf(badWords[i] - 1)) == " " && comment.indexOf(badWords[i]) + badWords[i].length == comment.length){
        document.getElementById("comment").value += "\n I'm sorry, your comment includes inappropriate language.";
        return;
      }
    }
  }

  if(name && comment){
    firebaseRef.ref('exhibits/' + fbID + '/comments').push({
      name: name,
      comment: comment,
      time: time
    });
  }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
}
var userComments = [];
firebaseRef.ref('exhibits/' + fbID + '/comments').on("child_added", function(snapshot){
  var comment = snapshot.val();
  addComment(comment.name, comment.comment, comment.time);
});
function UserComment(name, comment, timeStamp){
  this.name = name;
  this.comment = comment;
  this.timeStamp = timeStamp;
}
function addComment(name, comment, timeStamp){
  var userComment = new UserComment(name, comment, timeStamp);
  userComments.push(userComment);
  var comments = document.getElementById("comments");
  var num = '' + userComments.indexOf(userComment);
  if(userComments.indexOf(userComment) > 0){
    var numMinusOne = '' + userComments.indexOf(userComment);
  }
  comments.innerHTML.replace("<button id='shareBtn" + numMinusOne +"' class='shareBtns'>SHARE</button>", '');
  comments.innerHTML = "<hr><h4>" + name + " says:</h4> <p id='commentText'>" + comment +"<h3>" + timeStamp + "</h3>" +
  "<button id='shareBtn" + num + "' class='shareBtns'>Share on FB</button>" + comments.innerHTML;
  document.getElementById("shareBtn" + num).onclick = function(){
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: 'https://learnfirebase-43e98.firebaseapp.com/exhibit.html?id=' + fbID,
     quote: document.getElementById('commentText').textContent //'I just went to the Triton and saw Guernica, it was a fantastic painting!'
    }, function(response){});
  }
}
