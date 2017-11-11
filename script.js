"use strict";

//with credit to https://www.script-tutorials.com/html5-audio-player-with-playlist/

$(document).ready((function () {
    let song = document.getElementById('audio_player');

$('.play').click(function (e) {
    e.preventDefault();
    song.play();
    $('.play').addClass('.pause')
    $('.play').replaceWith("<i class="fa fa-pause-circle" aria-hidden="true"></i>");
}

$('.pause').click(function (e) {
    e.preventDefault();
    song.pause();
    $('.play').addClass('.pause')
    $('.pause').replaceWith("<i class="fa fa-play-circle" aria-hidden="true"></i>");
});
    
}))

