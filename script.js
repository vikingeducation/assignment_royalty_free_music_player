"use strict";

$(document).ready(function() {
    musicPlayer.init();
});

let musicPlayer = {
    "init" : function init() {
        let audiosArray = this.createTrackArray();
        let currentTrack = audiosArray[0];
        //Find the element holding the "main" audio player controls
        let musicControls = document.getElementsByClassName("music-controls"); //music-controls is the class given to the footer holding the "main" controls
        //Add event listeners to the body for play and pause so that controls from the tracks or the main music-controls will both be seen
        //Event listeners will update this element accordingly
        //if body receives a "play" event, then update track and main-controls accordingly
        $("audio").on("play", function (event) { //play event does not bubble
            //update main music-controls
            //change main music-controls to pause-button
            $(".music-controls .play-pause-button").children().removeClass("play-button").addClass("pause-button");
        });
        //if body receives a "pause" event, then update track and main-controls accordingly
        $("audio").on("pause", function (event) {
            //update main music-controls
            //change main music-controls to play-button
            $(".music-controls .play-pause-button").children().removeClass("pause-button").addClass("play-button");

        });
        //Need to attach handlers to pause and play-buttons of .music-controls to pause and play music
        $(".music-controls .play-pause-button").on("click", ".play-button", function () {
            //What to do if all music track are at 0? Need an array of track and one as "currentTrack"
            //For now, play will resume an audio track
            currentTrack.play();
            console.log("Main music-controls play-button clicked");
        });

        $(".music-controls .play-pause-button").on("click", ".pause-button", function () {
            currentTrack.pause();
            console.log("Main music-controls pause-button clicked");

        });        
        //these handlers will be responsible for switching play/pause classes and adding new event handlers.
    //Whenever a play button is clicked, get the respective audio for that play-button and call play() on it
    //Should we delegate so that we don't need to worry about toggling? Let's try
        $(".track .play-pause-button").on("click", ".play-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        if (audioElement.currentTime === 0 ) {//Check to see if audioElement has started playing
            musicPlayer.resetAllAudio(); //if not, call load on all elements and start playing this audio element check if audio.currentTime is 0.
            musicPlayer.resetAllPauseButtons();
            audioElement.play();
        }
        else { // if so, call play() on this audio element to resume playing.
            audioElement.play();
        }
        //Just change all pause buttons to play buttons
        $musicButton.addClass("pause-button").removeClass("play-button"); //Switch button types
        });
        
        
        $(".track .play-pause-button").on("click", ".pause-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        audioElement.pause(); //Call pause() on HTMLAudioElement (MediaElement)
        $musicButton.addClass("play-button").removeClass("pause-button"); //Switch button types
        });
        
        function updateCurrentTrack(newTrack) {
            currentTrack = newTrack;

        }

    },
    "resetAllAudio" : function resetAllAudio() {
        //for each audio element, loop through and call load on it to reset it.
        let audioElements = Array.from(document.getElementsByTagName("audio")); //Convert/Insure HTMLCollection to Array
        audioElements.forEach(function (element, index, arr) {
            element.load(); //reset audio back to zero
        });
    },
    "resetAllPauseButtons" : function resetAllPauseButtons() {  //If any audio has a pause-button, change it back to play-button
        $(".pause-button").addClass("play-button").removeClass("pause-button");
    },
    "startAudio" : function startAudio(element) {
        element.play();
    },
    //Bottom player will update with global body listening for events from divclass="tracks"
    "createTrackArray" : function createTrackArray() {
        //return array of audio elements.
        return $("audio").get();
    },
    "updateTrackArray" : function updateTrackArray() {
        
    }

};