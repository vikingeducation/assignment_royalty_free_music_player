// If undefined assign new obj to MP
var  MP = MP || {};

'use strict'

MP.view = {

  createSong( song, idx ) {
    // Create song li element
    const li = document.createElement('li');
        li.setAttribute('data-idx', idx);
        li.className = 'mdi mdi-play mdi-36px';
    
    // Create div 
    const div = document.createElement('div');
        div.classList.add('music-player-track');

    // Create title <p>
    const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = song.title;

    // Create artist <p>
    const artist = document.createElement('span');
        artist.classList.add('artist')
        artist.textContent = song.artist;

    // Create audio element
    const audio = document.createElement('audio');

    // Create source element
    const source = document.createElement('source');
        source.setAttribute('src', song.url)
        source.setAttribute('type', 'audio/mpeg');

    audio.appendChild( source );
    div.appendChild( title );
    div.appendChild( artist );
    div.appendChild( audio );
    li.appendChild( div );

    return li;

  },

  addSongs(){
    // Get playlist element
    const playlist = document.getElementById('music-player-list'); 
    // Iterate through songs array
    MP.songs.forEach( (song, idx) => {

      // Create song element
      let songElement = MP.view.createSong( song, idx );

      // Append to playlist element
      playlist.appendChild( songElement );

    });

  },

  addListeners(listeners) {
    // Get elements to register listeners on
    const playlist = document.getElementById('music-player-list'),
          prevBtn = document.getElementById('previous-btn'),
          toggleBtn = document.getElementById('toggle-btn'),
          nextBtn = document.getElementById('next-btn');

    // Register appropriate handlers for each
    playlist.addEventListener( 'click', listeners.togglePlay );
    prevBtn.addEventListener( 'click', listeners.playPrev );
    toggleBtn.addEventListener( 'click', listeners.togglePlay );
    nextBtn.addEventListener( 'click', listeners.playNext );
  },

  changeToPause( song ) {
    song.classList.replace('mdi-play', 'mdi-pause');
  },

  changeToPlay( song ) {
    song.classList.replace('mdi-pause', 'mdi-play');
  },

  getAudio( song ) {
    // Return audio element in song li
    return song.querySelectorAll('audio')[0];
  },

  getCurrentSong() {
    // Get ID of current song
    const ID = MP.currentState.song;

    // Return song li element
    return MP.view.getSongFromID( ID );
  },

  // Returns data-idx attr of the clicked song
  getID( song ) {
    // + is to convert string to number
    return +song.getAttribute( 'data-idx' );
  },

  getSongFromID( ID ) {
    // return the li song element that matches our id
    return document.querySelectorAll(`[data-idx="${ID}"]`)[0];
  },

  updateBtn() {
    // Get footer btn
    const btn = document.getElementById( 'toggle-btn' );

    if( MP.currentState.playing ) {
      btn.classList.replace( 'mdi-play-circle-outline',
                             'mdi-pause-circle-outline' );  
    } else {
      btn.classList.replace( 'mdi-pause-circle-outline',
                             'mdi-play-circle-outline' );
    }
  },

  updateCurrent() {
    // Get info of current song
    const current = MP.songs[MP.currentState.song];

    // Update current title
    document.getElementById('music-player-current-title').innerText 
      = current.title;
    // Update current artist
    document.getElementById('music-player-current-artist').innerText 
      = current.artist;
  },
  
  init( listeners ) {
    MP.view.addSongs();

    MP.view.addListeners( listeners );

    MP.view.updateCurrent();
  }

};
