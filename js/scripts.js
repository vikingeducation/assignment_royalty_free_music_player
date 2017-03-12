$(document).ready(function() {
  "use strict";

    var $songContainers = $(".song-container");
    var $allSongs = $("audio");

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
        });
        
        song.play();

      }

    });
  });
