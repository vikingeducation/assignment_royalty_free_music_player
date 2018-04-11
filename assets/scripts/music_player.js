
/*

cd Documents/Viking/JS/music_player

cd Documents/Viking/JS/music_player/assets/styles

sass --watch input.scss:style.css

sass input.scss style.css

TODO
1. js button and text swapping
  a. look into functions for repeated actions and maybe global variables for
     repeated selections

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

    if (hidden != undefined ) {
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
  counter++
}
/* song play button */

/* status play button */
  /*
    TODO
    1. status button change

    2. find song that matches text

    3. that songs button changes

    4. comment song playing for later
  */
var statusPlay = document.getElementsByClassName("status-play")[0];

statusPlay.addEventListener("click", function(action) {

// status bar button change
  statusPlay.classList.add("hide");
  document.getElementsByClassName("status-pause")[0].classList.add("playing");

// find selected song
  var statusSong = document.querySelectorAll("h4")[0].innerHTML;
  var statusArtist = document.querySelectorAll("h5")[0].innerHTML;

/*
  1. grab html collection of songs

  2. loop through said collection with an if statement that matches innerhtml
   contents, using .children and the fact that the h2 and h3 elements are
   consitently located

  3. save correct song to a variable to later change its button and play the
  song
*/

  // songPlay



});
/* status play button */








// spacing
