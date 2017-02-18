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
        /*
        $("audio").on("play", function (event) { //play event does not bubble
            //update main music-controls
            //change main music-controls to pause-button
            musicPlayer.changePlayToPause($(".music-controls .play-pause-button").children());
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.changePlayToPause($(event.currentTarget).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
            //Display track-title of .track-info in both respective track and music-controls .track-info
            //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
            musicPlayer.changeTrackArtist(event.currentTarget);
            musicPlayer.displayTrackTitle(event.currentTarget);
            //updating the main music-controls track-info display

        });

        //if body receives a "pause" event, then update track and main-controls accordingly
        $("audio").on("pause", function (event) {
            //update main music-controls
            //change main music-controls to play-button
            musicPlayer.changePauseToPlay($(".music-controls .play-pause-button").children());
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.changePauseToPlay($(event.currentTarget).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
            //Display "Music Paused" of .track-info in both respective track and music-controls .track-info
            //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
            musicPlayer.displayTrackPaused(event.currentTarget);
            //updating the main music-controls track-info display


        });
        */
        //Add listener and handler for previous button
        $(".previous-button").on("click", function previousButtonHandler(event) {
            //Look up current track
            if (musicPlayer.currentTrackNumber === 0) { //If at first track, go to last track in the audiosArray
                musicPlayer.updateCurrentTrackNumber(musicPlayer.audiosArray.length - 1);
            } else {
                musicPlayer.updateCurrentTrackNumber(musicPlayer.currentTrackNumber - 1); //Else set new current track number to currentTrack minus one
            }
            musicPlayer.updateCurrentTrack();
            musicPlayer.resetAllAudio(); //Reset all tracks
            //Change play-buttons of track and main-controls to pause buttons
            musicPlayer.changePlayToPause($(musicPlayer.currentTrack.audioElement).siblings(".music-buttons").children().children());
            musicPlayer.changePlayToPause($(".music-controls .play-pause-button").children());
            //Update main-controls displays to reflect new song
            musicPlayer.changeTrackArtist();
            musicPlayer.displayTrackTitle();
            musicPlayer.playCurrentTrack(); //Call play on the new currentTrack

        });
        
        $(".next-button").on("click", function nextButtonHandler(event) {
            //Look up current track
            if (musicPlayer.currentTrackNumber === musicPlayer.audiosArray.length - 1) { //If the last track, go to first track in the audiosArray
                musicPlayer.updateCurrentTrackNumber(0);
            } else {
                musicPlayer.updateCurrentTrackNumber(musicPlayer.currentTrackNumber + 1); //Else set new current track number to currentTrack plus one
            }
            musicPlayer.updateCurrentTrack();
            musicPlayer.resetAllAudio(); //Reset all tracks
            //Change play-buttons of track and main-controls to pause buttons
            musicPlayer.changePlayToPause($(musicPlayer.currentTrack.audioElement).siblings(".music-buttons").children().children());
            musicPlayer.changePlayToPause($(".music-controls .play-pause-button").children());
            //Update main-controls displays to reflect new song
            musicPlayer.changeTrackArtist();
            musicPlayer.displayTrackTitle();

            musicPlayer.playCurrentTrack(); //Call play on the new currentTrack
        });
        
        //Need to attach handlers to pause and play-buttons of .music-controls to pause and play music
        $(".music-controls .play-pause-button").on("click", ".play-button", function (event) {
            //update main music-controls
            //change main music-controls to pause-button
            musicPlayer.changePlayToPause(event.currentTarget);
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.changePlayToPause($(musicPlayer.currentTrack.audioElement).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
            //Display track-title of .track-info in both respective track and music-controls .track-info
            //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
            musicPlayer.displayTrackTitle();
            //updating the main music-controls track-info display

            musicPlayer.playCurrentTrack();
        });

        $(".music-controls .play-pause-button").on("click", ".pause-button", function (event) {
            //update main music-controls
            //change main music-controls to pause-button
            musicPlayer.changePauseToPlay(event.currentTarget);
            //also need to update tracks if event is emitted from main-controls
            musicPlayer.changePauseToPlay($(musicPlayer.currentTrack.audioElement).siblings(".music-buttons").children().children()); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
            //Display track-title of .track-info in both respective track and music-controls .track-info
            //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
            musicPlayer.displayTrackPaused();
            //updating the main music-controls track-info display
            musicPlayer.pauseCurrentTrack();

        });        
        //these handlers will be responsible for switching play/pause classes and adding new event handlers.
    //Whenever a play button is clicked, get the respective audio for that play-button and call play() on it
    //Should we delegate so that we don't need to worry about toggling? Let's try
        $(".track .play-pause-button").on("click", ".play-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        if (audioElement.currentTime === 0 ) {//Check to see if audioElement has started playing
            let p = new Promise(function (resolve, reject) { //if not, call load on all elements and start playing this audio element check if audio.currentTime is 0.
                musicPlayer.resetAllAudio(resolve); 
            //It seems that sometimes play will get called on the next track before the resetAllAudio function has completed resulting in a playing song displaying. Solution would be to return a promise and chain the rest of these function off of the promise.
            //Still doesn't work with promise, likely because I need to do Promise.all and have each forEach return a promise, this currently just runs forEach synchronously but the function called in the function to forEach are not completing on time, so each one of those would also need to be promise aware fulfill a promise would all in-turn fulfill the promise for new Plays
                
            });
            p.then(function onFulfilled(success) {
                musicPlayer.updateCurrentTrackNumber(musicPlayer.findTrackInAudiosArray(audioElement));
                musicPlayer.updateCurrentTrack();
                musicPlayer.changeTrackArtist();
                audioElement.play();
            }).catch(function onRejection(err) {
                console.error("Error message", err);
            });
        }
        else { // if so, call play() on this audio element to resume playing.
            audioElement.play();
        }
        //update main music-controls
        //change main music-controls to pause-button
        musicPlayer.changePlayToPause($(".music-controls .play-pause-button").children());
        //also need to update tracks if event is emitted from main-controls
        musicPlayer.changePlayToPause($musicButton); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
        //Display track-title of .track-info in both respective track and music-controls .track-info
        //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
        musicPlayer.displayTrackTitle();
        //updating the main music-controls track-info display
        });
        
        
        $(".track .play-pause-button").on("click", ".pause-button", function(event) {
        let $musicButton = $(event.currentTarget);
        let audioElement = $musicButton.parents(".music-buttons").siblings("audio").get(0); //get the music-buttons containers of the clicked button, find the audio element that's a sibling of that button, then get the DOMElement back.
        audioElement.pause(); //Call pause() on HTMLAudioElement (MediaElement)
        //update main music-controls
        //change main music-controls to play-button
        musicPlayer.changePauseToPlay($(".music-controls .play-pause-button").children());
        //also need to update tracks if event is emitted from main-controls
        musicPlayer.changePauseToPlay($musicButton); //is the audio that emitted the play. Meaning we can find the sibling for this and toggle
        //Display "Music Paused" of .track-info in both respective track and music-controls .track-info
        //event.currentTarget is the song that is playing, therefore we need to set it's respective track-info
        musicPlayer.displayTrackPaused();
        //updating the main music-controls track-info display

            
        });
        

    },
    "updateCurrentTrack" : function updateCurrentTrack() {
        musicPlayer.currentTrack = musicPlayer.audiosArray[musicPlayer.currentTrackNumber];
    },
    "updateCurrentTrackNumber" : function updateCurrentTrackNumber(newTrackNumber) {
        musicPlayer.currentTrackNumber = newTrackNumber;
    },
    "resetAllAudio" : function resetAllAudio(resolve) {
        //for each audio element, loop through and call load on it to reset it.
        let audioElements = Array.from(document.getElementsByTagName("audio")); //Convert/Insure HTMLCollection to Array
        audioElements.forEach(function (element, index, arr) {
            element.pause();
            element.currentTime = 0; //reset audio back to zero
            musicPlayer.displayTrackTitle(element); //Need to change all tracks back to track-title name to correct for pause event listener

        });
        musicPlayer.resetAllPauseButtons();
        resolve();
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
    "changePauseToPlay" : function changePauseToPlay(holderDiv) {
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
    "changePlayToPause" : function changePlayToPause(holderDiv) {
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
    "playCurrentTrack" : function playCurrentTrack() {
        musicPlayer.currentTrack.audioElement.play();
    },
    "pauseCurrentTrack" : function pauseCurrentTrack() {
        musicPlayer.currentTrack.audioElement.pause();
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
            let trackTitle = $audio.siblings(".track-info").children(".track-title").text();
            let trackArtist = $audio.siblings(".track-info").children(".track-artist").text();;
            let trackSource = $audio.children("source").attr("src"); //Doesn't work with multiple sources
            let trackInfo = {
                "trackTitle" : trackTitle,
                "trackArtist" : trackArtist,
                "trackSource" : trackSource,
                "audioElement" : element
            };
            return trackInfo;
        });
        return audioArray;
    },
    "updateTrackArray" : function updateTrackArray() {
        
    },
    "findTrackInAudiosArray" : function findTrackInAudiosArray(audioElement) {
        for (let i = 0; musicPlayer.audiosArray.length; i++){
            if (musicPlayer.audiosArray[i].audioElement === audioElement) {
                return i;
            }
        }
    },
    "displayTrackTitle" : function displayTrackTitle() {
            let trackTitle = musicPlayer.currentTrack.trackTitle
            $(musicPlayer.currentTrack.audioElement).siblings(".track-info").children(".track-title").text(trackTitle);
            //updating the main music-controls track-info display
            $(".music-controls .track-info > .track-title").text(trackTitle);
    },
    "displayTrackPaused" : function displayTrackPaused() {
            $(musicPlayer.currentTrack.audioElement).siblings(".track-info").children(".track-title").text("Music paused");
            //updating the main music-controls track-info display
            $(".music-controls .track-info > .track-title").text("Music paused");        
    },
    "changeTrackArtist" : function changeTrackArtist() {
            let trackArtist = musicPlayer.currentTrack.trackArtist;
            $(musicPlayer.currentTrack.audioElement).siblings(".track-info").children(".track-artist").text(trackArtist);
            $(".music-controls .track-info > .track-artist").text(trackArtist);

    }

};