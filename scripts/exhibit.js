var config = {
  apiKey: "AIzaSyCH2GOoz3WtmgKC8gs9-P0eHk02-sX9vS0",
  authDomain: "lunaspheretriton.firebaseapp.com",
  databaseURL: "https://lunaspheretriton.firebaseio.com",
  storageBucket: "lunaspheretriton.appspot.com",
};
firebase.initializeApp(config);

var url = "https://lunaspheretriton.firebaseio.com";
var firebaseRef = firebase.database();
var thisUrl = window.location.href;
//console.log(thisUrl);
var keyStartAt = window.location.href.indexOf('?');
var idStartAt = keyStartAt + 4;
var fbID = thisUrl.substring(idStartAt);
var fbIDFinal;
var editMode = false;
if(fbID.includes('#')){
if(fbID.includes('edit')){
  editMode = true;
  console.log(editMode);
}
//console.log('there is a label or something in the html parameter');
fbIDFinal = fbID.substring(0, fbID.indexOf('#'));
fbID = fbID.substring(0, fbID.indexOf('#'));
//console.log(fbID);
}
else{
fbIDFinal = fbID;
}

var title, exhibitAudio, artist, summary, artistLastName, historyOfPainting, historyOfArtist, year, genre, exhibitImage;
var symbols = [];
var videos = [];
var firstTimeLoad = false;
var addedOneView = false;
var views;
var postedComment = false;
//console.log(fbID);
//TO-DO SET EVENT TRIGGER TO ONCE SINCE IT IS STATIC UI
firebaseRef.ref('exhibits/' + fbIDFinal).once('value').then(function(snapshot) {
var exhibitData = snapshot.val();
//console.log(exhibitData);
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
symbols = data.symbols.split(';');
historyOfPainting = data.historyOfPainting;
historyOfArtist = data.historyOfArtist;
views = data.views;
console.log(views);
if(data.videos != null){
  //console.log("THERE ARE VIDEOS!");
  videos = data.videos.split(';');
}
exhibitAudio = data.exhibitAudio;
console.log(exhibitAudio);
setHTMLContent();
}
function setHTMLContent(){
document.title = title;
document.getElementById("headBarTitle").textContent = '' + title + ' - ' + artistLastName;
document.getElementById("title").textContent = "Title: " + title;
document.getElementById("artist").textContent = "Artist: " + artist;
if(year != ''){
  document.getElementById("year").style.display = 'block';
  document.getElementById("year").textContent = "Year: " + year;
}
if(genre != ''){
  document.getElementById("genre").style.display = 'block';
  document.getElementById("genre").textContent = "Genre: " + genre;
}
if(media != ''){
  document.getElementById("media").style.display = 'block';
  document.getElementById("media").textContent = "Media: " + media;
}

//document.getElementById("exhibitImage").setAttribute("src", exhibitImage);
  var storage = firebase.storage();
  var storageRef = storage.ref();

  if(exhibitAudio != ''){
    document.getElementById('exhibitAudio').style.display = 'block';
    document.getElementById('exhibitAudio').style.float = 'none';
      var spaceRefAudio = storageRef.child(exhibitAudio);
      console.log(exhibitAudio);
      storageRef.child(exhibitAudio).getDownloadURL().then(function(url){
        var test = url;
        //console.log(test);
        document.getElementById("exhibitAudio").src = test;
      }).catch(function(error){

      });
  }

  if(exhibitImage != ''){
    document.getElementById("lineUnderImage").style.display = 'block';
    var spaceRef = storageRef.child(exhibitImage);
    storageRef.child(exhibitImage).getDownloadURL().then(function(url){
      var test = url;
      document.getElementById("exhibitImage").src = test;
      document.getElementById("exhibitImage").style.display = 'inline';
    }).catch(function(error){

    });
  }

document.getElementById("summary").textContent = summary;
if(firstTimeLoad === false){
  if(addedOneView == false){
    addOneView();
    addedOneView = true;
  }
  if(symbols != ''){
    document.getElementById("lineUnderSymbols").style.display = 'block';
    document.getElementById("symbolsTitle").style.display = 'block';
    document.getElementById("symbols").style.display = 'block';
    var unorderedList = document.createElement("ul");
    var listInSymbols = document.getElementById("symbols").appendChild(unorderedList);
    for(var i = 0; i < symbols.length; i++){
      var listNode = document.createElement("li");
      var node = document.createTextNode('' + symbols[i]);
      listNode.appendChild(node);
      listInSymbols.appendChild(listNode);
    }
  }

  if(videos.length >= 1 && videos[0]!=""){
    document.getElementById("lineUnderVideos").style.display = 'block';
    document.getElementById('vidBox').style.display = 'block';
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
  firstTimeLoad = true;
}
if(historyOfPainting != ''){
  document.getElementById("lineUnderHistoryOfPainting").style.display = 'block';
  document.getElementById("historyOfPaintingHead").style.display = "block";
  document.getElementById("historyOfPainting").style.display = "block";
  document.getElementById("historyOfPaintingHead").textContent = "History of " + title;
  document.getElementById("historyOfPainting").textContent = historyOfPainting;
}
if(historyOfArtist != ''){
  document.getElementById("lineUnderHistoryOfArtist").style.display = 'block';
  document.getElementById("historyOfArtistHead").style.display = "block";
  document.getElementById("historyOfArtist").style.display = "block";
  document.getElementById("historyOfArtistHead").textContent = "History of " + artist;
  document.getElementById("historyOfArtist").textContent = historyOfArtist;
}

//console.log(videos);

}
function addOneView(){
console.log(window.location.href);
if(!editMode){
  views++;
  console.log(views);
  firebaseRef.ref('exhibits/' + fbID).update({views: '' + views});
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
postedComment = true;
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

if(comment){
  if(name === ''){
    name = "Anonymous";
  }
  firebaseRef.ref('exhibits/' + fbID + '/comments').push({
    name: name,
    comment: comment,
    time: time,
    flagged: 0
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
//TODO add if posteComment = true
comments.innerHTML.replace("<button id='shareBtn" + numMinusOne +"' class='shareBtns'>SHARE</button>", '');
comments.innerHTML = "<hr><h4>" + name + " says:</h4> <p id='commentText'>" + comment +"<h3>" + timeStamp + "</h3>" +
"<button id='shareBtn" + num + "' class='shareBtns'>Share on FB</button>" + comments.innerHTML;
document.getElementById("shareBtn" + num).onclick = function(){
  FB.ui({
    method: 'share',
    mobile_iframe: true,
    href: 'https://lunaspheretriton.firebaseapp.com/exhibit.html?id=' + fbID,
   quote: '' + name + ' just went to the Triton and saw ' + title + ' by ' + artist + ' and said, "' + document.getElementById('commentText').textContent + '"' //'I just went to the Triton and saw Guernica, it was a fantastic painting!'
  }, function(response){});
}
}

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=626508604175695";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
