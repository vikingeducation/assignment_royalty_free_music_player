"use strict";

$(document).ready(function() {
    musicPlayer.init();
});

let musicPlayer = {
    "init" : function init() {
        this.audiosArray = this.createTrackArray();
        this.currentTrackNumber = 0;
        this.currentTrack = this.audiosArray[0]; //CurrentTrack is an object that holds information about the track
        
        //Find the element holding the "main" audio player controls
        let musicControls = document.getElementsByClassName("music-controls"); //music-controls is the class given to the footer holding the "main" controls
        //Add event listeners to the body for play and pause so that controls from the tracks or the main music-controls will both be seen
        //Event listeners will update this element accordingly
        //if body receives a "play" event, then update track and main-controls accordingly
        $("audio").on("play", function (event) { //play event does not bubble
            //update main music-controls
            //change main music-controls to pause-button
            musicPlayer.togglePlayToPause($(".music-controls .play-pause-button").children());
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.togglePlayToPause($(event.currentTarget).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle

        });

        //if body receives a "pause" event, then update track and main-controls accordingly
        $("audio").on("pause", function (event) {
            //update main music-controls
            //change main music-controls to play-button
            musicPlayer.togglePlayToPause($(".music-controls .play-pause-button").children());
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.togglePlayToPause($(event.currentTarget).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle

        });
        //Add listener and handler for previous button
        $(".previous-button").on("click", function previousButtonHandler(event) {
            //Look up current track
            //If at first track, go to last track in the array
            //Else set new current track number to currentTrack minus one
            //Reload all tracks
            //Reset all buttons to play
            //Call play on the new currentTrack
        });
        
        $(".next-button").on("click", function nextButtonHandler(event) {
         //Add listener and handler for next button
        //Look up current track
        //If at first track, go to last track in the array
        //Else set new current track number to currentTrack minus one
        //Reload all tracks
        //Reset all buttons to play
        //Call play on the new currentTrack
        });
        
        //Need to attach handlers to pause and play-buttons of .music-controls to pause and play music
        $(".music-controls .play-pause-button").on("click", ".play-button", function () {
            //What to do if all music track are at 0? Need an array of track and one as "currentTrack"
            //For now, play will resume an audio track
            musicPlayer.currentTrack.audioElement.play();
            console.log("Main music-controls play-button clicked");
        });

        $(".music-controls .play-pause-button").on("click", ".pause-button", function () {
            musicPlayer.currentTrack.audioElement.pause();
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
            musicPlayer.updateCurrentTrackNumber(musicPlayer.findTrackInAudiosArray(audioElement));
            musicPlayer.updateCurrentTrack();
            audioElement.play();
        }
        else { // if so, call play() on this audio element to resume playing.
            audioElement.play();
        }
        });
        
        
        $(".track .play-pause-button").on("click", ".pause-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        audioElement.pause(); //Call pause() on HTMLAudioElement (MediaElement)
        });
        

    },
    "updateCurrentTrack" : function updateCurrentTrack() {
        musicPlayer.currentTrack = musicPlayer.audiosArray[musicPlayer.currentTrackNumber];
    },
    "updateCurrentTrackNumber" : function updateCurrentTrackNumber(newTrackNumber) {
        musicPlayer.currentTrackNumber = newTrackNumber;
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
    "togglePlayToPause" : function togglePlayToPause(holderDiv) {
        let $holderDiv = $(holderDiv);
        //if div class is play-button, add pause-button and remove play-button
        if ($holderDiv.hasClass("play-button")) {
            $holderDiv.addClass("pause-button").removeClass("play-button");
        }
        //if div class is pause-button, add play-button and remove pause-button
        else if ($holderDiv.hasClass("pause-button")) {
            $holderDiv.addClass("play-button").removeClass("pause-button");
        }
        else {
            console.error("div did not have either class. Error");
        }
    },
    "startAudio" : function startAudio(element) {
        element.play();
    },
    //Bottom player will update with global body listening for events from divclass="tracks"
    "createTrackArray" : function createTrackArray() {
        //return array of audio elements objects.
        //each object contains a reference to the audioElement, src, trackName, and trackArtist
        //with API, would likely be building this from data returned from call, then using this information to build the audio elements
        //Rework to get an array or collection of tracks from the API then for each one, constructing a new audio element and corresponding information
        let audioArray = $("audio").get();
        audioArray = audioArray.map(function (element, index, arr) {
            let $audio = $(element);
            let trackTitle = "";
            let trackArtist = "";
            let trackSource = "";
            let trackInfo = {
                "trackTitle" : trackTitle,
                "trackArtist" : trackArtist,
                "trackSource" : trackSource,
                "audioElement" : element
            };
        });
        return audioArray;
    },
    "updateTrackArray" : function updateTrackArray() {
        
    },
    "findTrackInAudiosArray" : function findTrackInAudiosArray(audioElement) {
        musicPlayer.audiosArray.forEach(function(element, index, arr) {
            if (element.audioElement === audioElement) {
                return index;
            }
        });
    }

};