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
    var audio = $activeSong.children('audio').get(0);

    if($selectedSong.hasClass('fa-play')) {
      audio.play();
      $('.btn-pause').show();
      $('.btn-play').hide();
    }
    else if($selectedSong.hasClass('fa-pause')) {
      audio.pause();
      $('.btn-pause').hide();
      $('.btn-play').show();
    }
    musicPlayer.player.toggleSongButtonStyle(songId);

    var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $oldSong.removeClass('active');
    musicPlayer.player.activeSong = songId;
    $activeSong.addClass('active');
  },

  // plays the song previous to the active song
  playPrevSong: function(event) {
    if(musicPlayer.player.activeSong === 0) {
      return;
    }

    var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $oldSong.removeClass('active');
    // musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    musicPlayer.player.pauseSong();

    musicPlayer.player.activeSong = musicPlayer.player.activeSong - 1;
    var $prevSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $prevSong.addClass('active');
    // musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    musicPlayer.player.playSong();
  },

  // plays the song following the active song
  playNextSong: function (event) {
    if(musicPlayer.player.activeSong === musicPlayer.songs.length - 1) {
      return;
    }

    var $oldSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $oldSong.removeClass('active');
    // musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    musicPlayer.player.pauseSong();

    musicPlayer.player.activeSong = musicPlayer.player.activeSong + 1;
    var $nextSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    $nextSong.addClass('active');
    // musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    musicPlayer.player.playSong();
  },

  // pauses the active song
  pauseSong: function() {
    var $activeSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    var audio = $activeSong.children('audio').get(0);
    if(audio) {
      audio.pause();
      $('.btn-pause').hide();
      $('.btn-play').show();
      musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    }
  },

  // plays the active song
  playSong: function() {
    var $activeSong = $(".song[id='" + musicPlayer.player.activeSong + "'] ");
    var audio = $activeSong.children('audio').get(0);
    if(audio) {
      audio.play();
      $('.btn-pause').show();
      $('.btn-play').hide();
      musicPlayer.player.toggleSongButtonStyle(musicPlayer.player.activeSong);
    }
  },

  // toggles the song's button style (play to pause and vice versa)
  toggleSongButtonStyle: function(songId) {
    // select the song's <i> element
    var $selectedSong = $('#' + songId + ' i');

    // now toggle the button style (play to pause or pause to play)
    if($selectedSong.hasClass('fa-pause')) {
      $selectedSong.removeClass('fa-pause').addClass('fa-play');
    }
    else if($selectedSong.hasClass('fa-play')) {
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
