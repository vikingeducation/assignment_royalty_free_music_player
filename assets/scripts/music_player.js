
/*
  cd Documents/Viking/JS/music_player

  TODO
  1. need to handle resetting a song if you play another song while the
  previous song was paused (maybe through looping through all songs to find
  the one with current time not equal to 0)

  2. final review
    a. song reset (from song play)
    b. remove html about audio compatability
    c. reset function seems like a waste
    d. review variables to see if any can be eliminated
*/

var statusBar = document.getElementsByClassName("status")[0].children,
  statusPlay = statusBar[1],
  statusPause = statusBar[2],
  statusSong = statusBar[4],
  statusArtist = statusBar[5],
  songs = document.getElementsByClassName("song"),
  songPlay = document.getElementsByClassName("song-play"),
  songPause = document.getElementsByClassName("song-pause"),
  audios = document.querySelectorAll("audio");

function pauser(song) {
  song[4].pause();
  song[0].classList.remove("hide");
  song[1].classList.remove("playing");
  statusPlay.classList.remove("hide");
  statusPause.classList.remove("playing");
}

function reset(song) {
  song[4].currentTime = 0;
}

function starter(song) {
  song[4].play();
  song[0].classList.add("hide");
  song[1].classList.add("playing");
  statusPlay.classList.add("hide");
  statusPause.classList.add("playing");
  statusSong.innerHTML = song[2].innerHTML;
  statusArtist.innerHTML = song[3].innerHTML;
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
}

function next(current) {
  pauser(current.children);
  reset(current.children);

  if (current.getAttribute("num") == 5) {
    var numeral = 1;
  } else {
    var numeral = parseFloat(current.getAttribute("num")) + 1;
  }

  var music = lookup(numeral);

  starter(music);
}

// song play button
for (var counter = 0; counter < 5; counter++) {
  songPlay[counter].addEventListener("click", function(action) {
    var source = action.target.parentNode.children,
      hidden = document.getElementsByClassName("song-play hide")[0],
      played = document.getElementsByClassName("song-pause playing")[0];

    if (hidden != undefined && played != undefined) {
      hidden.classList.remove("hide");
      played.classList.remove("playing");
      hidden.parentNode.children[4].pause();
      reset(hidden.parentNode.children);
    }

    starter(source);
  });
}
// song play button

// status play button
statusPlay.addEventListener("click", function() {
  var theSong = seek().children;

  starter(theSong);
});
// status play button

// song pause button
for (var limit = 0; limit < 5; limit++) {
  songPause[limit].addEventListener("click", function(root) {
    var origin = root.target.parentNode.children;

    pauser(origin);
  });
}
// song pause button

// status pause button
statusPause.addEventListener("click", function() {
  var songResult = seek().children;

  pauser(songResult);
});
// status pause button

// status previous button
statusBar[0].addEventListener("click", function() {
  var subjectSong = seek();

  pauser(subjectSong.children);
  reset(subjectSong.children);

  if (subjectSong.getAttribute("num") == 1) {
    var symbol = 5;
  } else {
    var symbol = subjectSong.getAttribute("num") - 1;
  }

  var track = lookup(symbol);

  starter(track);
});
// status previous button

// status after button
statusBar[3].addEventListener("click", function() {
  var pickedSong = seek();

  next(pickedSong);
});
// status after button

// song finish handler


for (var tick = 0; tick < 5; tick++) {
  audios[tick].addEventListener("ended", function(ended) {
    var last = ended.target.parentNode;

    next(last);
  });
}
// song finish handler
