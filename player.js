'use strict';

let musicPlayer = {
  init: function() {
    // listeners
    $('.play-button').on('click', musicPlayer.clickPlay);
    $('.pause-button').on('click', musicPlayer.clickPause);
    $('.next-button').on('click', musicPlayer.clickNext);
    $('.prev-button').on('click', musicPlayer.clickPrev);
    $('audio').on('ended', musicPlayer.clickNext);

    // initialize player
    musicPlayer.buildPlayer();
  },

  status: {
    playing: false,
    currentSong: null,
  },

  buildPlayer: function() {
    // backwards compatibility
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    // 
    let audioCtx = new AudioContext();

    // build and connect audio sources to the AudioContext
    $('audio').each(function(index, song) {
      let source = audioCtx.createMediaElementSource(song);
      source.connect(audioCtx.destination);
    });

    // grab the playback container for easy toggling
    musicPlayer.status.playBack = $('.playback-container');
  },

  toggleButtons: function() {
    let $song = $(musicPlayer.status.currentSong);

    // make sure we are playing something
    if ($song.length) {

      $song
        .closest('.song')
        .toggleClass('playing');
      
      musicPlayer.status.playBack.toggleClass('playing');
    }

  },

  setPaused: function() {
      // display the current song as paused
      $(musicPlayer.status.currentSong)
        .parent()
        .addClass('paused');
  },

  clearPaused: function() {
    // remove all paws
    $('.song').removeClass('paused')
  },

  ensureSong: function() {

    if (!musicPlayer.status.currentSong) {
      // we're stopped, grabbing the first song
      musicPlayer.status.currentSong = $('audio')[0];
    }

  },

  displayInfo: function(artist, title) {

    // update the currently playing display
    let $target = musicPlayer.status.playBack.children('.playback-info');
    $target.children('.artist').text(artist);
    $target.children('.title').text(title);
  },

  playCurrentSong: function() {

    // play!
    musicPlayer.status.currentSong.play();
    musicPlayer.status.playing = true;

    // toggle play/pause buttons
    musicPlayer.toggleButtons();
    // clear paused states
    musicPlayer.clearPaused();

    // update display
    let $info = $(musicPlayer.status.currentSong).siblings('.info');
    let artist = $info.children('.artist').text();
    let title = $info.children('.title').text();

    musicPlayer.displayInfo(artist, title);

  },

  clickPlay: function(event) {
    // make sure we've got a song to play
    musicPlayer.ensureSong();

    if (musicPlayer.status.playing){

      // we're already playing, pause first
      musicPlayer.clickPause();

    }

    let $target = $(event.target);
    
    if ( !( // negating, if true main play button was pressed
      $target
        .parent()
        .hasClass('playback-buttons')
    )){

      // song play button was pressed, change current song
      let $songContainer = $target.closest('.song');
      musicPlayer.status.currentSong = $songContainer.children('audio')[0]

    } 

    musicPlayer.playCurrentSong();

  },

  clickPause: function(event) {
    // make sure we're playing something
    if (musicPlayer.status.playing) {

      // pause the song
      musicPlayer.status.currentSong.pause();
      musicPlayer.status.playing = false;

      // toggle the play/pause buttons
      musicPlayer.toggleButtons();

      // show the song as paused
      musicPlayer.setPaused();
    }
  },

  clickNext: function(event) {

    if (musicPlayer.status.playing) {

      // pause current song
      musicPlayer.clickPause();

    }

    // clear all paws
    musicPlayer.clearPaused();

    if (musicPlayer.status.currentSong) {
      // if we're in the playlist

      // reset current song time
      musicPlayer.status.currentSong.currentTime = 0;

      // get the next song to play
      let $parent = $(musicPlayer.status.currentSong).closest('.song');
      let $nextParent = $parent.next();

      if ($nextParent.length) {

        // there is another song in the playlist
        musicPlayer.status.currentSong = $nextParent.children('audio')[0];
        musicPlayer.playCurrentSong();

      } else {

        // playlist over
        musicPlayer.status.currentSong = null;
        musicPlayer.displayInfo('', '');
      }


    } else {

      // not playing, start from the top of the playlist
      musicPlayer.ensureSong();
      musicPlayer.playCurrentSong();
    }

  },

  clickPrev: function(event) {
    console.log(event.target)
  },
}

$(
  function() {
    musicPlayer.init();
  }
)
