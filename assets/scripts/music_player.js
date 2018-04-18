
/*
  cd Documents/Viking/JS/music_player

  cd Documents/Viking/JS/music_player/assets/styles

  sass --watch input.scss:style.css

  sass input.scss style.css

  TODO
  1. find actual songs - https://freemusicarchive.org/

  2. update html to match songs

  3. js to actually play/pause songs
  https://www.w3schools.com/tags/tag_audio.asp
  https://www.w3schools.com/jsref/met_audio_play.asp
*/

var statusBar = document.getElementsByClassName("status")[0].children,
    statusPlay = statusBar[1],
    statusPause = statusBar[2],
    statusSong = statusBar[4],
    statusArtist = statusBar[5],
    songs = document.getElementsByClassName("song"),
    songPlay = document.getElementsByClassName("song-play"),
    songPause = document.getElementsByClassName("song-pause");

function stop(play, pause) {
  play.classList.remove("hide");
  pause.classList.remove("playing");
}

function start(play, pause) {
  play.classList.add("hide");
  pause.classList.add("playing");
}

function songChange(songData) {
  statusSong.innerHTML = songData[2].innerHTML;
  statusArtist.innerHTML = songData[3].innerHTML;
}

function seek() {
  var currentSong = statusSong.innerHTML,
      currentArtist = statusArtist.innerHTML;

  for (var piece in songs) {
    if (
      songs[piece].children[2].innerHTML == currentSong &&
      songs[piece].children[3].innerHTML == currentArtist
    ) {
      var songMatch = songs[piece];
      break;
    }
  }
  return songMatch;
}

function lookup(listing) {
  for (var sequence = 0; sequence < 5; sequence++) {
    if (songs[sequence].getAttribute("num") == listing) {
      var beat = songs[sequence].children;
      break;
    }
  }
  return beat;
};

// song play button
for (var counter = 0; counter < 5; counter++) {
  songPlay[counter].addEventListener("click", function(action) {
    var source = action.target.parentNode.children,
        hidden = document.getElementsByClassName("song-play hide")[0],
        played = document.getElementsByClassName("song-pause playing")[0];

    if (hidden != undefined && played != undefined) {
      stop(hidden, played);
    }

    start(source[0], source[1]);
    start(statusPlay, statusPause);
    songChange(source);

    /*
      TODO
      actually play song
    */
  });
}
// song play button

// status play button
statusPlay.addEventListener("click", function() {
  var theSong = seek().children;

  start(statusPlay, statusPause);
  start(theSong[0], theSong[1]);

  /*
    TODO
    actually play song
  */
});
// status play button

// song pause button
for (var limit = 0; limit < 5; limit++) {
  songPause[limit].addEventListener("click", function(root) {
    var origin = root.target.parentNode.children;

    stop(origin[0], origin[1]);
    stop(statusPlay, statusPause);

    /*
      TODO
      actually pause song
    */
  });
}
// song pause button

// status pause button
statusPause.addEventListener("click", function() {
  var songResult = seek().children;

  stop(statusPlay, statusPause);
  stop(songResult[0], songResult[1]);

  /*
    TODO
    actually pause song
  */
});
// status pause button

// status previous button
statusBar[0].addEventListener("click", function() {
  var subjectSong = seek();

  stop(subjectSong.children[0], subjectSong.children[1]);

  /*
    TODO
    actually stop song
  */

  if (subjectSong.getAttribute("num") == 1) {
    var symbol = 5;
  } else {
    var symbol = subjectSong.getAttribute("num") - 1;
  }

  var track = lookup(symbol);

  start(statusPlay, statusPause);
  start(track[0], track[1]);
  songChange(track);

  /*
    TODO
    actually play song
  */
});
// status previous button

// status after button
statusBar[3].addEventListener("click", function() {
  var pickedSong = seek();

  stop(pickedSong.children[0], pickedSong.children[1]);

  /*
    TODO
    actually stop song
  */

  if (pickedSong.getAttribute("num") == 5) {
    var numeral = 1;
  } else {
    var numeral = parseFloat(pickedSong.getAttribute("num")) + 1;
  }

  var music = lookup(numeral);

  start(statusPlay, statusPause);
  start(music[0], music[1]);
  songChange(music);

  /*
    TODO
    actually play song
  */
});
// status after button








// spacing
