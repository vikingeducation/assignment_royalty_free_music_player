
/*

cd Documents/Viking/JS/music_player

cd Documents/Viking/JS/music_player/assets/styles

sass --watch input.scss:style.css

sass input.scss style.css

TODO

1. js button and text swapping

2. find actual songs - https://freemusicarchive.org/

3. update html to match songs

4. js to actually play/stop songs

*/

// song play button click event
var songPlay = document.getElementsByClassName("song-play");
var counter = 0;

while (songPlay.length > counter) {

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
// song play button click event










// spacing
