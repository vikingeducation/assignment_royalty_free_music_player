
/*
  cd Documents/Viking/JS/music_player

  cd Documents/Viking/JS/music_player/assets/styles

  sass --watch input.scss:style.css

  sass input.scss style.css

  TODO
  1. js button and text swapping
    a. look into functions for repeated actions and maybe global variables for
       repeated selections/other methods to reduce repetition

  2. find actual songs - https://freemusicarchive.org/

  3. update html to match songs

  4. js to actually play/stop songs
*/

/* song play button */
var songPlay = document.getElementsByClassName("song-play");
var counter = 0;

while (counter < 5) {
  songPlay[counter].addEventListener("click", function(action) {
    // reset previous song
    var hidden = document.getElementsByClassName("song-play hide")[0];
    var played = document.getElementsByClassName("song-stop playing")[0];

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
    document.getElementsByClassName("status-play")[0].classList.add("hide");
    document.getElementsByClassName("status-pause")[0].classList.add("playing");

    // status bar text change
    document.querySelectorAll("h4")[0].innerHTML = siblings[2].innerHTML;
    document.querySelectorAll("h5")[0].innerHTML = siblings[3].innerHTML;

    /*
      TODO
      actually play song
    */
  });
  counter++;
}
/* song play button */

/* status play button */
var statusPlay = document.getElementsByClassName("status-play")[0];

statusPlay.addEventListener("click", function() {
  // status bar button change
  statusPlay.classList.add("hide");
  document.getElementsByClassName("status-pause")[0].classList.add("playing");

  // find selected song
  var statusSong = document.querySelectorAll("h4")[0].innerHTML;
  var statusArtist = document.querySelectorAll("h5")[0].innerHTML;
  var songs = document.getElementsByClassName("song");
  var tracker = 0;

  while (tracker < 5) {
    if (
      songs[tracker].children[2].innerHTML == statusSong &&
      songs[tracker].children[3].innerHTML == statusArtist
    ) {
      var selectedSong = songs[tracker].children;
      break;
    }
    tracker++;
  }

  // song button change
  selectedSong[0].classList.add("hide");
  selectedSong[1].classList.add("playing");

  /*
    TODO
    actually play song
  */
});
/* status play button */

/* song stop button */
var songStop = document.getElementsByClassName("song-stop");
var ticker = 0;

while (ticker < 5) {
  songStop[ticker].addEventListener("click", function(clicky) {
    // song button change
    var origin = clicky.target;

    origin.classList.remove("playing");
    origin.parentNode.children[0].classList.remove("hide");

    // status bar button change
    statusPlay.classList.remove("hide");
    document.getElementsByClassName("status-pause")[0].classList.remove("playing");

    /*
      TODO
      actually stop song
    */
  });
  ticker++;
}
/* song stop button */

/* status pause button */
/* status pause button */

/* status previous button */
/* status previous button */

/* status next button */
/* status next button */








// spacing
