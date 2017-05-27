$(document).ready(function() {
  'use strict';
  const $songContainers = $('.song-container');
  var $allSongs = $('audio');
  var $currentSong = $allSongs.eq(0);
  var $lastSong = $allSongs.eq(4);

  var $lastPlayButton;
  var $lastPauseButton;

  var progressBar = $('.progress-bar');
  var currentSongTime;
  var duration;
  var currentTimeRatio;
  var firstRun = true;

  $songContainers.click(function(event) {
    var $target = $(this);
    var $playButton = $target.children('.glyphicon-play');
    var $pauseButton = $target.children('.glyphicon-pause');

    if ($currentSong[0] !== $target.children('audio')[0]) {
      resetTrack();
    }
    $currentSong = $target.children('audio');

    if ($currentSong.hasClass('playing')) {
      $playButton.show();
      $pauseButton.hide();

      pauseSong($currentSong[0]);
    } else {
      $playButton.hide();
      $pauseButton.show();

      pauseLastSong();
      playSong($currentSong[0]);
    }
  });

  //////////////////////////////////////
  // Player functions
  //////////////////////////////////////

  var stepForward = function() {
    pauseSong();
    resetTrack();
    resetProgress();

    if ($allSongs.index($currentSong) <= $allSongs.length - 2) {
      $currentSong = $allSongs.eq($allSongs.index($currentSong) + 1);
      playSong();
    }
  };

  var stepBack = function() {
    pauseSong();
    resetProgress();

    if ($currentSong[0].currentTime < 5) {
      if ($allSongs.index($currentSong) <= 0) {
        resetTrack();
        playSong();
      } else {
        $currentSong = $allSongs.eq($allSongs.index($currentSong) - 1);
        playSong();
      }
    } else {
      resetTrack();
      playSong();
    }
  };

  var playSong = function() {
    $footerPlay.hide();
    $footerPause.show();
    $currentSong.siblings('.glyphicon-pause').show();
    $currentSong.siblings('.glyphicon-play').hide();

    $currentSong[0].play();
    $currentSong.addClass('playing');
    updateInfo();
    updateProgress();
  };

  var pauseSong = function(song) {
    $footerPlay.show();
    $footerPause.hide();

    $currentSong.siblings('.glyphicon-play').show();
    $currentSong.siblings('.glyphicon-pause').hide();
    $currentSong[0].pause();
    $currentSong.removeClass('playing');
  };

  var updateInfo = function() {
    var $songTitle = $currentSong.siblings('.song-info').children('.title');
    var $songArtist = $currentSong.siblings('.song-info').children('.artist');
    var $playerTitle = $('.player-title');
    var $playerArtist = $('.player-artist');

    $playerTitle.html($songTitle.html());
    $playerArtist.html($songArtist.html());
  };

  var pauseLastSong = function() {
    var $songToPause = $allSongs.filter('.playing');

    if ($songToPause.length > 0) {
      $songToPause[0].pause();
      $songToPause[0].currentTime = 0;
      $songToPause.removeClass('playing');
      $songToPause.siblings('.glyphicon-pause').hide();
      $songToPause.siblings('.glyphicon-play').show();
    }
  };

  //////////////////////////////////////
  // Footer Controls
  //////////////////////////////////////

  var $backBtn = $('.glyphicon-step-backward');
  var $footerPlay = $('footer .glyphicon-play');
  var $footerPause = $('footer .glyphicon-pause');
  var $forwardBtn = $('.glyphicon-step-forward');

  //////////////////////////////////////
  // Footer controls events
  //////////////////////////////////////

  $backBtn.click(function(event) {
    progressBar.addClass('notransition');
    stepBack();
  });

  $forwardBtn.click(function(event) {
    progressBar.addClass('notransition');
    stepForward();
  });

  $footerPlay.click(function(event) {
    playSong();
  });

  $footerPause.click(function(event) {
    pauseSong();
  });

  var resetTrack = function() {
    progressBar.addClass('notransition');
    $currentSong[0].currentTime = 0;
  };

  $allSongs.on('ended', function() {
    progressBar.addClass('notransition');
    stepForward();
  });

  //////////////////////////////////////
  // Progress Bar
  //////////////////////////////////////

  var resetProgress = function() {
    progressBar.css('width', '0%');
  };

  var updateProgress = function() {
    setInterval(function() {
      if (isPlaying()) {
        currentSongTime = $currentSong.get(0).currentTime;
        duration = $currentSong.get(0).duration;
        currentTimeRatio = currentSongTime / duration * 100 + '%';
        progressBar.css('width', currentTimeRatio);
      }
    }, 100);

    var isPlaying = function() {
      if (
        !$currentSong.get(0).paused &&
        !$currentSong.get(0).ended &&
        $currentSong.get(0).currentTime > 0
      ) {
        return true;
      }

      return false;
    };
  };
});
