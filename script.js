"use strict";

$(document).ready(function() {
    musicPlayer.init();
});

let musicPlayer = {
    "init" : function init() {
    //Whenever a play button is clicked, get the respective audio for that play-button and call play() on it
    //Should we delegate so that we don't need to worry about toggling? Let's try
        $(".play-pause-button").on("click", ".play-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        $musicButton.addClass("pause-button").removeClass("play-button"); //Switch button types
        audioElement.play(); //Call play() on HTMLAudioElement (MediaElement)
        });
        
        
        $(".play-pause-button").on("click", ".pause-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        $musicButton.addClass("play-button").removeClass("pause-button"); //Switch button types
        audioElement.pause(); //Call pause() on HTMLAudioElement (MediaElement)
        });

    }
};