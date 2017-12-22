'use strict';

// If undefined assign new obj to MP
let MP = MP || {};

MP.view = {

  createSong( song, idx ) {
    let li = document.createElement('li')
              .classList
              .add('mdi mdi-play mdi-36px');
    
    let div = document.createElement('div')
               .classList
               .add('music-player-track');
    

  },

  addSongs(){
    // Get playlist element
    let playlist = document.getElementById('music-player-list'); 
    // Iterate through songs array
    MP.songs.forEach( song => {

      // Create song element
      let songElement = MP.view.createSong( song, idx );

      // Append to playlist element
      playlist.appendChild( songElement );

    });

  },
  
  init( listeners ) {
    MP.view.addSongs();

    MP.view.addListeners();

    MP.view.updateCurrent();
  }

};
