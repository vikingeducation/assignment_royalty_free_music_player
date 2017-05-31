// List of available music
var musicList = [];

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
function listen(obj) {
  obj.addEventListener("click", function() {
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
        song = document.getElementById("song" + obj.id);
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
  songName.innerHTML = musicList[i].name;
  artistName.innerHTML = musicList[i].artist;

  var section = document.getElementById("main");
  section.append(songBox);
  songBox.append(songBoxControls);
  songBox.append(songBoxDetails);
  songBox.append(song);
  songBoxDetails.append(songName);
  songBoxDetails.append(artistName);
}

// add events to all buttons in main section
for( var i = 0; i < musicList.length; i++) {
  var btn = document.getElementById(i.toString());
  listen(btn);
}
