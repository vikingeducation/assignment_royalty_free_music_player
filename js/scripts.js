$(document).ready(function() {
  "use strict";

    var $songContainers = $(".song-container");
    var $allSongs = $("audio");
    var $currentSong = $allSongs.eq(0);
    var $lastSong = $allSongs.eq(4);

    var $lastPlayButton;
    var $lastPauseButton;

    var progressBar = $(".progress-bar-striped");
    var currentSongTime;
    var duration;
    var currentTimeRatio;
    var firstRun = true;

    $songContainers.click(function(event) {
      var $target = $(this);
      var $playButton = $target.children(".glyphicon-play");
      var $pauseButton = $target.children(".glyphicon-pause");

      $currentSong = $target.children("audio");

      //If that song is currently playing
      if ($playButton.is(":hidden")) {
        console.log("Pause");
        $playButton.show();
        $pauseButton.hide();

        pauseSong($currentSong[0]);
      }
      //Else if that song is not playing
      else {
        console.log("Play");
        $playButton.hide();
        $pauseButton.show();

        pauseLastSong();
        playSong($currentSong[0]);
      }
    });

    // Footer controls
    var $backBtn = $(".glyphicon-step-backward");
    var $footerPlay = $("footer .glyphicon-play");
    var $footerPause = $("footer .glyphicon-pause");
    var $forwardBtn = $(".glyphicon-step-forward");

    var stepForward = function () {
      pauseSong();
      resetTrack();
      resetProgress();

      if ($allSongs.index($currentSong) <= ($allSongs.length - 2)) {
        $currentSong = $allSongs.eq($allSongs.index($currentSong) + 1);
        playSong();
      }
    };

    var stepBack = function () {
      pauseSong();
      resetProgress();

      if ($currentSong[0].currentTime < 5) {

        if ($allSongs.index($currentSong) <= 0) {
          resetTrack();
          playSong();
        }
        else {
          $currentSong = $allSongs.eq($allSongs.index($currentSong) - 1);
          playSong();
        }
      }
      else {
        resetTrack();
        playSong();
      }
    };

    var playSong = function() {
      $footerPlay.hide();
      $footerPause.show();
      $currentSong.siblings(".glyphicon-pause").show();
      $currentSong.siblings(".glyphicon-play").hide();

      $currentSong[0].play();
      $currentSong.addClass("playing");
      $(progressBar).addClass("active");
      updateProgress();
    };

    var pauseSong = function(song) {
      $footerPlay.show();
      $footerPause.hide();

      $currentSong.siblings(".glyphicon-play").show();
      $currentSong.siblings(".glyphicon-pause").hide();
      $currentSong[0].pause();
      $currentSong.removeClass("playing");
      $(progressBar).removeClass("active");
    };

    var updateInfo = function () {

    };
    
    var pauseLastSong = function() {
      var $songToPause = $allSongs.filter(".playing");


      if ($songToPause.length > 0) {
          $songToPause[0].pause();
          $songToPause[0].currentTime = 0;
          $songToPause.removeClass("playing");
          $songToPause.siblings(".glyphicon-pause").hide();
          $songToPause.siblings(".glyphicon-play").show();
      }
    };

    $backBtn.click(function(event) {
      stepBack();
    });

    $forwardBtn.click(function(event) {
      stepForward();
    });

    $footerPlay.click(function(event) {
      playSong();
    });

    $footerPause.click(function(event) {
      pauseSong();
    });

    var resetTrack = function() {
      $currentSong[0].currentTime = 0;
    };

    $allSongs.on("ended", function(){
      stepForward();
    });

//progress bar
    var resetProgress = function () {
      progressBar.css("width", 0);
    };

    var updateProgress = function () {
      console.log("checking");
      setInterval(function() {
        if (isPlaying()) {
          console.log("Updating");
          currentSongTime = $currentSong.get(0).currentTime;
          duration = $currentSong.get(0).duration;
          currentTimeRatio = ((currentSongTime / duration) * 100) + "%";
          progressBar.css("width", currentTimeRatio);
      }
    }, 250);

    var isPlaying = function() {
      if (!$currentSong.get(0).paused && !$currentSong.get(0).ended && $currentSong.get(0).currentTime > 0) {
        return true;
      }

      return false;
    };
};

  });
