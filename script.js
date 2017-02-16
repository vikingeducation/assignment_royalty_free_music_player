"use strict";

$(document).ready(function() {
    musicPlayer.init();
    //Whenever a play button is clicked, get the respective audio for that play-button and call play() on it
    //Should we delegate so that we don't need to worry about toggling? Let's try
    $(".play-button").on("click", function(event) {
        let audioElement = $(event.currentTarget).parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        audioElement.play(); //Call play() on HTMLAudioElement (MediaElement)
        
    });
});

let musicPlayer = {
    "init" : function init() {
        
    }
};