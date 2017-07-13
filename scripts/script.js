$(document).ready(function() {
  // starts our app
  musicPlayer.player.init();
});

var musicPlayer = musicPlayer || {};

musicPlayer.player = {
  activeSong : 0,

  init: function() {
    musicPlayer.player.populatePlayer();

    $('.song').click(musicPlayer.player.toggleActionOnSong);
    $('.btn-backward').click(musicPlayer.player.playPrevSong);
    $('.btn-play').click(musicPlayer.player.playSong);
    $('.btn-forward').click(musicPlayer.player.playNextSong);
    $('.btn-pause').click(musicPlayer.player.pauseSong);
  },

  // toggles the action (pause, play) on the song
  toggleActionOnSong: function(event) {
    // toggle the button style
    var $activeSong = $(event.currentTarget);
    var songId = $activeSong.attr('id');
    var $selectedSong = $('#' + songId + ' i');

    if(songId !== musicPlayer.player.activeSong) {
      // pause active song
      var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
      $oldSong.removeClass('active');
      musicPlayer.player.pauseSong();
    }

    musicPlayer.player.activeSong = songId;
    var audio = musicPlayer.player.getAudioForActiveSong();

    if($selectedSong.hasClass('fa-play')) {
      audio.play();
      $('.btn-pause').show();
      $('.btn-play').hide();
      musicPlayer.player.updateSongButtonStyle(songId, musicPlayer.player.buttonStyleEnum.pause);
    }
    else if($selectedSong.hasClass('fa-pause')) {
      audio.pause();
      $('.btn-pause').hide();
      $('.btn-play').show();
      musicPlayer.player.updateSongButtonStyle(songId, musicPlayer.player.buttonStyleEnum.play);
    }

    $activeSong.addClass('active');
    musicPlayer.player.updateSongStatusBar();
  },

  // plays the song previous to the active song
  playPrevSong: function() {
    if(musicPlayer.player.activeSong === 0) {
      return;
    }

    var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $oldSong.removeClass('active');
    musicPlayer.player.pauseSong();

    // todo: how to ensure activeSong is an integer?
    musicPlayer.player.activeSong--;
    var $prevSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $prevSong.addClass('active');
    musicPlayer.player.playSong();

    musicPlayer.player.updateSongStatusBar();
  },

  // plays the song following the active song
  playNextSong: function () {
    if(musicPlayer.player.activeSong === musicPlayer.songs.length - 1) {
      return;
    }

    var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $oldSong.removeClass('active');
    musicPlayer.player.pauseSong();

    // todo: how to ensure activeSong is an integer?
    musicPlayer.player.activeSong++;
    var $nextSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $nextSong.addClass('active');
    musicPlayer.player.playSong();

    musicPlayer.player.updateSongStatusBar();
  },

  getAudioForActiveSong: function() {
    var $activeSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    var audio = $activeSong.children('audio').get(0);

    return audio;
  },

  // pauses the active song
  pauseSong: function() {
    var audio = musicPlayer.player.getAudioForActiveSong();
    if(audio) {
      audio.pause();
      $('.btn-pause').hide();
      $('.btn-play').show();
      musicPlayer.player.updateSongButtonStyle(musicPlayer.player.activeSong, musicPlayer.player.buttonStyleEnum.play);
    }
  },

  // plays the active song
  playSong: function() {
    var audio = musicPlayer.player.getAudioForActiveSong();
    if(audio) {
      audio.play();
      $('.btn-pause').show();
      $('.btn-play').hide();
      musicPlayer.player.updateSongButtonStyle(musicPlayer.player.activeSong, musicPlayer.player.buttonStyleEnum.pause);
    }
  },

  buttonStyleEnum: {
    play: 1,
    pause: 2
  },

  updateSongStatusBar: function() {
    var $songActive = $('#song-active');
    var $artistActive = $('#artist-active');

    if(musicPlayer.player.activeSong >= 0 && musicPlayer.player.activeSong < musicPlayer.songs.length) {
      $songActive.text(musicPlayer.songs[musicPlayer.player.activeSong].name);
      $artistActive.text(musicPlayer.songs[musicPlayer.player.activeSong].artist);
    }
  },

  // updates the song's button style (play to pause and vice versa)
  updateSongButtonStyle: function(songId, buttonStyle) {
    // select the song's <i> element
    var $selectedSong = $('#' + songId + ' i');

    // now toggle the button style (play to pause or pause to play)
    if(buttonStyle === this.buttonStyleEnum.play && $selectedSong.hasClass('fa-pause')) {
      $selectedSong.removeClass('fa-pause').addClass('fa-play');
    }
    else if(buttonStyle === this.buttonStyleEnum.pause && $selectedSong.hasClass('fa-play')) {
      $selectedSong.removeClass('fa-play').addClass('fa-pause');
    }
  },

  populatePlayer: function() {
    var $playList = $('#play-list');
    var $songActive = $('#song-active');
    var $artistActive = $('#artist-active');

    $playList.empty();
    $songActive.empty();
    $artistActive.empty();

    for(var i=0; i <= musicPlayer.songs.length-1; i++) {
      var $songDiv = $('<div>')
        .addClass('song').attr('id', i);
      var $btnAction = $('<i>')
        .addClass('fa fa-play btn-play-small');
      var $songNameDiv = $('<div>')
        .addClass('song-name')
        .html(musicPlayer.songs[i].name);
      var $songArtistDiv = $('<div>')
        .addClass('song-artist')
        .html(musicPlayer.songs[i].artist);
      var $songInfoSpan = $('<span>')
        .addClass('song-info');
      var $songAudioSource = $('<source>')
        .attr('src', musicPlayer.songs[i].url)
        .attr('type', 'audio/mp3');
      var $songAudio = $('<audio>')
        .attr('loop', true)
        .html($songAudioSource);

      $songInfoSpan
        .html($songNameDiv)
        .append($songArtistDiv);
      $songDiv
        .html($btnAction)
        .append($songInfoSpan)
        .append($songAudio);

      // on first load, the first song should be active
      if(i === 0) {
        $songDiv.addClass('active');
      }

      $playList
        .append($songDiv);
    }

    $songActive.text(musicPlayer.songs[0].name);
    $artistActive.text(musicPlayer.songs[0].artist);

    $('.btn-pause').hide();
  }

};
