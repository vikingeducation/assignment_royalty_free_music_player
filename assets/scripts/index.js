'use strict'
const AUDIOPLAYER = {

  tracks: document
    .getElementsByTagName('ul')
    [0],

  currentTitle: document.getElementById('music-player-current-title'),

  currentArtist: document.getElementById('music-player-current-artist'),

  previousBtn: document.getElementById('previous-btn'),

  toggleBtn: document.getElementById('toggle-btn'),

  nextBtn: document.getElementById('next-btn'),

  findCurrent() {
    // Get titles 
    const titles = AUDIOPLAYER.tracks.querySelectorAll('.title');  

    let track = null;

    // Iterate through titles
    titles.forEach( title => {
      // If title matches currently playing title
      if( title.innerText === AUDIOPLAYER.currentTitle.innerText ) {
        // Store containing li
        track = title
          .closest('li');
      }
    });

    return track;
  },

  pauseCurrent(){
    // Get Current
    const current = AUDIOPLAYER.findCurrent();

    // Get audio element
    const audio = current.querySelectorAll('audio')[0];
    audio.pause();
    // Reset audio
    audio.currentTime = 0;

    // Toggle status
    AUDIOPLAYER.toggleStatus(current, 'playing');

  },

  toggleTrack( e, li ) {
    let track = null;

    // e is null if called by toggle btn handler
    if( e === null ){
      // Track is provided li
      track = li;
    } else {
      // Track is clicked li
      track = e.target;
    }

    // Retarget if event target is span
    if(track.nodeName === 'SPAN' ){
      track = track.closest('li');
    }

    // Get status
    const status  = track.getAttribute('data-status');

    // Get audio element
    const audio  = track
      .getElementsByTagName('audio')
      [0];

    if (status === 'playing'){
      audio.pause();
      AUDIOPLAYER.toggleStatus( track, status);
    } else {
      AUDIOPLAYER.pauseCurrent();
      audio.play();
      AUDIOPLAYER.toggleStatus( track, status);

      // Update currently playing
      const title = track
        .getElementsByClassName('title')
        [0]
        .innerText;

      const artist = track
        .getElementsByClassName('artist')
        [0]
        .innerText;

      AUDIOPLAYER.updateCurrent( title, artist );
    }

  },
  
  updateCurrent( title, artist ) {
    AUDIOPLAYER
      .currentTitle
      .innerText = title;

    AUDIOPLAYER
      .currentArtist
      .innerText = artist;
  },

  toggleStatus(target, status ){
    if( status === 'paused') {

      target.setAttribute('data-status', 'playing');

      // Update track icons
      target
        .classList
        .replace('mdi-play', 'mdi-pause');

      // Update toggle btn
      AUDIOPLAYER
        .toggleBtn
        .classList
        .replace('mdi-play-circle-outline','mdi-pause-circle-outline');

    } else {

      target.setAttribute('data-status', 'paused');

      // Update track icons
      target
        .classList
        .replace('mdi-pause', 'mdi-play');

      // Update toggle btn
      AUDIOPLAYER
        .toggleBtn
        .classList
        .replace('mdi-pause-circle-outline','mdi-play-circle-outline');
    }

  },

  toggleHandler( ) {
    // Get current track
    const current = AUDIOPLAYER.findCurrent();

    // Toggle track
    AUDIOPLAYER.toggleTrack( null, current );

  },

  playPrevious( e ) {
    // Get current track
    const current = AUDIOPLAYER.findCurrent();

    // Get previous track
    let previous = current.previousElementSibling;

    // If at first track, wrap to last
    if( previous === null ) {
      previous = AUDIOPLAYER.tracks.lastElementChild;
    }
    // Pause current track
    AUDIOPLAYER.pauseCurrent();

    // Play next track
    previous
      .querySelectorAll('audio')
      [0]
      .play();

    // Update status
    AUDIOPLAYER.toggleStatus(previous, 'paused');
    
    // Update currently playing
    const title = previous
      .getElementsByClassName('title')
      [0]
      .innerText;

    const artist = previous
      .getElementsByClassName('artist')
      [0]
      .innerText;
 
    AUDIOPLAYER.updateCurrent( title, artist );
  },

  playNext( e ) {
    // Get current track
    const current = AUDIOPLAYER.findCurrent();

    // Get next track
    let next = current.nextElementSibling;

    // If at last track, wrap to first
    if( next === null ) {
      next = AUDIOPLAYER.tracks.firstElementChild;
    }

    // Pause current track
    AUDIOPLAYER.pauseCurrent();

    // Play next track
    next
      .querySelectorAll('audio')
      [0]
      .play();

    // Update status
    AUDIOPLAYER.toggleStatus(next, 'paused');
    
    // Update currently playing
    const title = next
      .getElementsByClassName('title')
      [0]
      .innerText;

    const artist = next
      .getElementsByClassName('artist')
      [0]
      .innerText;
 
    AUDIOPLAYER.updateCurrent( title, artist );

  },

  // Register event listeners
  init() {
    AUDIOPLAYER.tracks.addEventListener( 'click', AUDIOPLAYER.toggleTrack );
    AUDIOPLAYER.toggleBtn.addEventListener( 'click', AUDIOPLAYER.toggleHandler );
    AUDIOPLAYER.nextBtn.addEventListener( 'click', AUDIOPLAYER.playNext );
    AUDIOPLAYER.previousBtn.addEventListener( 'click', AUDIOPLAYER.playPrevious );
  }

}

// Check if DOM is loaded
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  // initialize
  AUDIOPLAYER.init();
} else {
  document.addEventListener('DOMContentLoaded', AUDIOPLAYER.init());
}
