$(document).ready(function() {
  "use strict";

    var $songContainers = $(".song-container");
    var $allSongs = $("audio");
    var currentSong = $allSongs[0];
    var currentSongIndex = 0;
    var isPlaying = false;

    var progressBar = $(".progress-bar-striped");
    var currentSongTime;
    var duration;
    var currentTimeRatio;

    $songContainers.click(function(event) {
      var $target = $(this);
      var $playButton = $target.children(".glyphicon-play");
      var $pauseButton = $target.children(".glyphicon-pause");
      var song = $target.children("audio")[0];

      //if the clicked div is currently playing (so play button is hidden)
      if ($playButton.hasClass("inactive")) {
        //Hide the pause button, show the play button (song isn't playing)
        $playButton.removeClass("inactive");
        $pauseButton.addClass("inactive");

        $allSongs.each(function( index, element ) {
          this.pause();
        });
      }
      //if the clicked div is not currently playing (so pause button is hidden)
      else {
        //find any currently playing songs (their play button will be hidden)
        $(".glyphicon-pause").addClass("inactive");
        $(".glyphicon-play").removeClass("inactive");

        $playButton.addClass("inactive");
        $pauseButton.removeClass("inactive");

        $allSongs.each(function( index, element ) {
          this.pause();
          isPlaying = false;
        });

        song.play();
        isPlaying = true;
      }
    });

    // Footer controls
    var $backBtn = $(".glyphicon-step-backward");
    var $footerPlay = $("footer .glyphicon-play");
    var $footerPause = $("footer .glyphicon-pause");
    var $forwardBtn = $(".glyphicon-step-forward");

    var stepForward = function () {
      $allSongs[currentSongIndex].pause();
      resetTrack();
      resetProgress();

      currentSongIndex++;
      if (currentSongIndex >= $allSongs.length) {
        currentSongIndex = 0;
      }

      if (isPlaying) {
        $allSongs[currentSongIndex].play();
      }
    };

    var stepBack = function () {
      $allSongs[currentSongIndex].pause();
      resetProgress();

      if ($allSongs[currentSongIndex].currentTime < 5) {
        currentSongIndex--;

        if (currentSongIndex < 0) {
          currentSongIndex = $allSongs.length - 1;
        }

        if (isPlaying) {
          $allSongs[currentSongIndex].play();
        }
      }
      else {
        resetTrack();
        $allSongs[currentSongIndex].play();
      }
    };

    var play = function() {
      $footerPlay.addClass("inactive");
      $footerPause.removeClass("inactive");
      $allSongs[currentSongIndex].play();
      isPlaying = true;
      updateProgress();
      $(progressBar).addClass("active");
    };

    var pause = function() {
      $footerPlay.removeClass("inactive");
      $footerPause.addClass("inactive");
      $allSongs[currentSongIndex].pause();
      isPlaying = false;

      $(progressBar).removeClass("active");
    };

    $backBtn.click(function(event) {
      stepBack();
      // $allSongs[currentSongIndex].pause();
      // resetProgress();
      //
      // if ($allSongs[currentSongIndex].currentTime < 5) {
      //   currentSongIndex--;
      //
      //   if (currentSongIndex < 0) {
      //     currentSongIndex = $allSongs.length - 1;
      //   }
      //
      //   if (isPlaying) {
      //     $allSongs[currentSongIndex].play();
      //   }
      // }
      // else {
      //   resetTrack();
      //   $allSongs[currentSongIndex].play();
      // }
    });

    $forwardBtn.click(function(event) {
      stepForward();
      // $allSongs[currentSongIndex].pause();
      // resetTrack();
      // resetProgress();
      //
      // currentSongIndex++;
      // if (currentSongIndex >= $allSongs.length) {
      //   currentSongIndex = 0;
      // }
      //
      // if (isPlaying) {
      //   $allSongs[currentSongIndex].play();
      // }

    });

    $footerPlay.click(function(event) {
      play();
      // $footerPlay.addClass("inactive");
      // $footerPause.removeClass("inactive");
      // $allSongs[currentSongIndex].play();
      // isPlaying = true;
      // updateProgress();
      // $(progressBar).addClass("active");
      //Make matching song's play icon visible, pause icon invisible
    });

    $footerPause.click(function(event) {
      pause();
      // $footerPlay.removeClass("inactive");
      // $footerPause.addClass("inactive");
      // $allSongs[currentSongIndex].pause();
      // isPlaying = false;
      //
      // $(progressBar).removeClass("active");
      //Make matching song's play icon visible, pause icon invisible
    });

    var resetTrack = function() {
      $allSongs[currentSongIndex].currentTime = 0;
    };

    $allSongs.on("ended", function(){
      stepForward();
    });

//progress bar


    var resetProgress = function () {
      progressBar.css("width", 0);
    };

    var updateProgress = function () {
      setInterval(function() {
        if (isPlaying) {
          currentSongTime = $allSongs[currentSongIndex].currentTime;
          duration = $allSongs[currentSongIndex].duration;
          currentTimeRatio = ((currentSongTime / duration) * 100) + "%";
          progressBar.css("width", currentTimeRatio);
      }
    }, 250);
};
  });
