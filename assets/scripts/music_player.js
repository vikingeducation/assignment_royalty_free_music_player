
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

var songPlay = document.getElementsByClassName("song-play");
var counter = 0;

while (songPlay.length > counter) {

  songPlay[counter].addEventListener("click", function(action) {
    var play = action.target;
    var stop = play.parentNode.children[1];

    play.classList.add("hide");
    stop.classList.add("playing");

    // status bar changes
  });

  counter++
}











// spacing
