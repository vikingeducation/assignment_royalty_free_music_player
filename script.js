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
        if (audioElement.currentTime === 0 ) {//Check to see if audioElement has started playing
            audioElement.play();// if so, call play() on this audio element to resume playing
        }
        else { //if not, call load on all elements and start playing this audio element check if audio.currentTime is 0
            this.resetAllAudio();
            audioElement.play();
        }
        $musicButton.addClass("pause-button").removeClass("play-button"); //Switch button types
        });
        
        
        $(".play-pause-button").on("click", ".pause-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        audioElement.pause(); //Call pause() on HTMLAudioElement (MediaElement)
        $musicButton.addClass("play-button").removeClass("pause-button"); //Switch button types
        });

    },
    "resetAllAudio" : function resetAllAudio() {
        //for each audio element, loop through and call load on it to reset it.
        let audioElements = document.getElementsByTagName("audio");
        audioElements.forEach(function (element, index, arr) {
            element.load();
        });
    },
    "startAudio" : function startAudio(element) {
        element.play();
    }
    //Bottom player will update with global body listening for events from divclass="tracks"
};