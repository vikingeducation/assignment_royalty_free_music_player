
/*
  cd Documents/Viking/JS/music_player

  cd Documents/Viking/JS/music_player/assets/styles

  sass --watch input.scss:style.css

  sass input.scss style.css

  TODO
  1. js button and text swapping
    a. look into functions for repeated actions and global variables for
       repeated selections/other methods to reduce repetition

  2. find actual songs - https://freemusicarchive.org/

  3. update html to match songs

  4. js to actually play/pause songs
*/

/* global variables */
var songs = document.getElementsByClassName("song");
var songPlay = document.getElementsByClassName("song-play");
var songPause = document.getElementsByClassName("song-pause");
var statusPlay = document.getElementsByClassName("status-play")[0];
var statusPause = document.getElementsByClassName("status-pause")[0];
var statusSong = document.querySelectorAll("h4")[0];
var statusArtist = document.querySelectorAll("h5")[0];
/* global variables */

/* song play button */
var counter = 0;
while (counter < 5) {
  songPlay[counter].addEventListener("click", function(action) {
    // reset previous song
    var hidden = document.getElementsByClassName("song-play hide")[0];
    var played = document.getElementsByClassName("song-pause playing")[0];

    if (hidden != undefined) {
      hidden.classList.remove("hide");
    }

    if (played != undefined) {
      played.classList.remove("playing");
    }

    // song button change
    var source = action.target;
    var siblings = source.parentNode.children;

    source.classList.add("hide");
    siblings[1].classList.add("playing");

    // status bar button change
    statusPlay.classList.add("hide");
    statusPause.classList.add("playing");

    // status bar text change
    statusSong.innerHTML = siblings[2].innerHTML;
    statusArtist.innerHTML = siblings[3].innerHTML;

    /*
      TODO
      actually play song
    */
  });
  counter++;
}
/* song play button */

/* status play button */


statusPlay.addEventListener("click", function() {
  // status bar button change
  statusPlay.classList.add("hide");
  statusPause.classList.add("playing");

  // find selected song
  var chosenSong = statusSong.innerHTML;
  var chosenArtist = statusArtist.innerHTML;

  var step = 0;
  while (step < 5) {
    if (
      songs[step].children[2].innerHTML == chosenSong &&
      songs[step].children[3].innerHTML == chosenArtist
    ) {
      var theSong = songs[step].children;
      break;
    }
    step++;
  }

  // song button change
  theSong[0].classList.add("hide");
  theSong[1].classList.add("playing");

  /*
    TODO
    actually play song
  */
});
/* status play button */

/* song pause button */


var limit = 0;
while (limit < 5) {
  songPause[limit].addEventListener("click", function(clicky) {
    // song button change
    var origin = clicky.target;

    origin.classList.remove("playing");
    origin.parentNode.children[0].classList.remove("hide");

    // status bar button change
    statusPlay.classList.remove("hide");
    statusPause.classList.remove("playing");

    /*
      TODO
      actually pause song
    */
  });
  limit++;
}
/* song pause button */

/* status pause button */
statusPause.addEventListener("click", function() {
  // status bar button change
  statusPause.classList.remove("playing");
  statusPlay.classList.remove("hide");

  // find selected song
  var currentSong = statusSong.innerHTML;
  var currentArtist = statusArtist.innerHTML;

  var count = 0;
  while (count < 5) {
    if (
      songs[count].children[2].innerHTML == currentSong &&
      songs[count].children[3].innerHTML == currentArtist
    ) {
      var songResult = songs[count].children;
      break;
    }
    count++;
  }

  // song button change
  songResult[0].classList.remove("hide");
  songResult[1].classList.remove("playing");

  /*
    TODO
    actually pause song
  */
});
/* status pause button */

/* status previous button */
document.getElementsByClassName("previous-button")[0].addEventListener("click", function() {
  // find selected song
  var selectedSong = statusSong.innerHTML;
  var selectedArtist = statusArtist.innerHTML;

  var tick = 0;
  while (tick < 5) {
    if (
      songs[tick].children[2].innerHTML == selectedSong &&
      songs[tick].children[3].innerHTML == selectedArtist
    ) {
      var subjectSong = songs[tick];
      break;
    }
    tick++;
  }

  // song button change
  subjectSong.children[0].classList.remove("hide");
  subjectSong.children[1].classList.remove("playing");

  /*
    TODO
    actually stop song
  */

  // determine previous song
  if (subjectSong.getAttribute("num") == 1) {
    var listing = 5;
  } else {
    var listing = subjectSong.getAttribute("num") - 1;
  }

  var sequence = 0;
  while (sequence < 5) {
    if (songs[sequence].getAttribute("num") == listing) {
      var track = songs[sequence].children;
      break;
    }
    sequence++;
  }

  // status bar text change
  statusSong.innerHTML = track[2].innerHTML;
  statusArtist.innerHTML = track[3].innerHTML;

  // status bar button change
  statusPlay.classList.add("hide");
  statusPause.classList.add("playing");

  // song button change
  track[0].classList.add("hide");
  track[1].classList.add("playing");

  /*
    TODO
    actually play song
  */
});
/* status previous button */

/* status next button */
document.getElementsByClassName("after-button")[0].addEventListener("click", function() {
  // find selected song
  var targetSong = statusSong.innerHTML;
  var targetArtist = statusArtist.innerHTML;

  var pace = 0;
  while (pace < 5) {
    if (
      songs[pace].children[2].innerHTML == targetSong &&
      songs[pace].children[3].innerHTML == targetArtist
    ) {
      var pickedSong = songs[pace];
      break;
    }
    pace++;
  }

  // song button change
  pickedSong.children[0].classList.remove("hide");
  pickedSong.children[1].classList.remove("playing");

  /*
    TODO
    actually stop song
  */

  // determine previous song
  if (pickedSong.getAttribute("num") == 5) {
    var numeral = 1;
  } else {
    var numeral = parseFloat(pickedSong.getAttribute("num")) + 1;
  }

  var timer = 0;
  while (timer < 5) {
    if (songs[timer].getAttribute("num") == numeral) {
      var music = songs[timer].children;
      break;
    }
    timer++;
  }

  // status bar text change
  statusSong.innerHTML = music[2].innerHTML;
  statusArtist.innerHTML = music[3].innerHTML;

  // status bar button change
  statusPlay.classList.add("hide");
  statusPause.classList.add("playing");

  // song button change
  music[0].classList.add("hide");
  music[1].classList.add("playing");

  /*
    TODO
    actually play song
  */
});
/* status next button */








// spacing
