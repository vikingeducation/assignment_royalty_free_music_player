// If undefined assign new obj to MP
var  MP = MP || {};

'use strict'

// Keeps track of current song
// song holds the idx of current song in MP.songs
// we toggle 'playing' to true or false 
MP.currentState = {
  song: 0,
  playing: false
};

MP.player = {

  pause( song ) {
    // Find audio element for current song
    const audio = MP.view.getAudio( song );

    // Pause audio
    audio.pause();
    audio.currentTime = 0;

    // Update state
    MP.currentState.playing = false;
    // Update icon
    MP.view.changeToPlay( song );
  },

  play( song ) {
    // Find audio elemnt for current song
    const audio = MP.view.getAudio( song ),
          newID = MP.view.getID( song );

    // Play song
    audio.play();

    // Update current state
    MP.currentState.song = newID;
    MP.currentState.playing = true;

    // Update icon
    MP.view.changeToPause( song );
  },

  changeSong( song ) {
    // Store previous song
    const prevSong = MP.view.getCurrentSong();

    // Pause previous song
    MP.player.pause( prevSong ); 

    // Play new song
    MP.player.play( song );

    // Update display
    MP.view.updateBtn();
  },

  playPrev() {
    // Get ID of previous song
    let prevID = MP.currentState.song - 1;

    // If at first song, wrap to end
    if( prevID < 0 ) {
     prevID = MP.songs.length - 1; 
    }

    // Get audio element of previous song
    const prevSong = MP.view.getSongFromID( prevID ); 

    MP.player.changeSong( prevSong );
    MP.view.updateCurrent();
  },

  playNext() {
    // Get ID of next song
    // If at end of list, wrap to beginning
    const nextID = ( MP.currentState.song + 1 ) % MP.songs.length,
    // Get next song
          nextSong = MP.view.getSongFromID( nextID );

    MP.player.changeSong( nextSong );
    MP.view.updateCurrent();
  },
 
  togglePlay( e ) {
    // e.currentTarget is the li containing
    // the icon that was clicked
    let song = e.target,
        songID = MP.view.getID( song );

    // -1 is the data-idx of the play/pause button
    // in the footer controls
    // we need to get the current song if it was pressed
    if( songID === -1 ) {
      // Get the current song
      song = MP.view.getCurrentSong();
      songID = MP.view.getID( song );
    }

    // Call the right method
    if ( songID !== MP.currentState.song ) {
      MP.player.changeSong( song );
    } else if ( MP.currentState.playing ) {
      MP.player.pause( song );
    } else {
      MP.player.play( song );
    }

    // Update footer controls icon
    MP.view.updateBtn();
    MP.view.updateCurrent();

  },

  init() {
    // Handlers to pass to view obj
    const listeners = {
      togglePlay: MP.player.togglePlay,
      playNext: MP.player.playNext,
      playPrev: MP.player.playPrev
    };

    // Initialize view obj
    MP.view.init( listeners );
  }
};

// Check if the DOMContentLoaded has already been completed
// Initialize music player if/when ready
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  MP.player.init();
} else {
  document.addEventListener('DOMContentLoaded', MP.player.init );
}
