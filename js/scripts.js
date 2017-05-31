// List of songs
var musicList = [];
// song objects
var a = {
  src: "assets/music/a.mp3",
  name: "Gathering Stasis",
  artist: "Blue Dot Sessions"
};
var b = {
  src: "assets/music/b.mp3",
  name: "Night Owl",
  artist: "Broke For Free"
};
var c = {
  src: "assets/music/c.mp3",
  name: "A Gentleman",
  artist: "Podington Bear"
};
var d = {
  src: "assets/music/d.mp3",
  name: "Arise",
  artist: "Podington Bear"
};
musicList.push(a)
musicList.push(b)
musicList.push(c)
musicList.push(d)
/*  plays song dependent on which object was passed
    by adding a click listener to the object
    this waits for the object to be clicked and plays a
    song dependent on the objects id */
var currentSong;
function listen(obj) {
  obj.addEventListener("click", function() {
    // set song and make it the current playing song
    song = document.getElementById("song" + obj.id);
    currentSong = musicList[obj.id];
    update();
    // get a list of elements that holds songs and song controls
    var songBoxes = obj.parentNode.parentNode.children;
    for ( var i = 0; i < songBoxes.length; i++) {
      // pause all songs that were not clicked
      if (songBoxes[i].firstChild != obj) {
        songBoxes[i]
          .firstChild
          .setAttribute("class", "song-box-controls stop");
        document.getElementById("song" + songBoxes[i].firstChild.id).pause();
      }
      /*  check if song that was clicked is playing or paused
          and toggle it between play/pause */
      else {
        if ( song.paused ) {
          obj.setAttribute("class", "song-box-controls play");
          song.play();
        }
        else {
          obj.setAttribute("class", "song-box-controls stop");
          song.pause();
        }
      }
    }
  });
}
// increase the progress bar when song is playing
function timeProgress(obj) {
  obj.addEventListener("timeupdate", function() {
    progress = document.getElementById("p" + obj
    .previousSibling
    .previousSibling
    .id);
    progress.setAttribute("max", obj.duration);
    progress.setAttribute("value", obj.currentTime);
  });
}
/*  create elements to display song information
    this includes a button that will be used to
    play and pause the song, it will also hold the
    song name and artist */
for( var i = 0; i < musicList.length; i++) {
  var song = document.createElement("audio");
  song.setAttribute("src", musicList[i].src);
  song.id = "song" + i.toString();
  var songBox = document.createElement("div");
  songBox.setAttribute("class", "song-box");
  var songBoxControls = document.createElement("div");
  songBoxControls.setAttribute("class", "song-box-controls stop");
  songBoxControls.id = i.toString();
  var songBoxDetails = document.createElement("div");
  songBoxDetails.setAttribute("class", "song-box-details");
  var songName = document.createElement("h3");
  var artistName = document.createElement("h5");
  var progress = document.createElement("progress");
  songName.innerHTML = musicList[i].name;
  artistName.innerHTML = musicList[i].artist;
  progress.id = "p" + i.toString();
  progress.setAttribute("value", 0);
  progress.setAttribute("max", musicList[i].src.duration);
  // add event listener to the song
  timeProgress(song);
  var section = document.getElementById("main");
  section.append(songBox);
  songBox.append(songBoxControls);
  songBox.append(songBoxDetails);
  songBox.append(song);
  songBoxDetails.append(songName);
  songBoxDetails.append(artistName);
  songBoxDetails.append(progress);
}

var footer = document.getElementById("footer");
var controlsBack = document.createElement("div");
var controlsPlay = document.createElement("div");
var controlsForward = document.createElement("div");
var songDetails = document.createElement("div");
var songName = document.createElement("h2");
var artist = document.createElement("h4");

controlsBack.setAttribute("class", "controls-back");
controlsPlay.setAttribute("class", "controls-play");
controlsForward.setAttribute("class", "controls-forward");
songDetails.setAttribute("class", "song-details");
footer.append(controlsBack);
footer.append(controlsPlay);
footer.append(controlsForward);
footer.append(songDetails);
songDetails.append(songName);
songDetails.append(artist);

function update() {
  songName.innerHTML = currentSong.name;
  artist.innerHTML = currentSong.artist;
}

// add events to all buttons in main section
for( var i = 0; i < musicList.length; i++) {
  var btn = document.getElementById(i.toString());
  listen(btn);
}
