
$(document).ready(function(){

  $(".playing-status").click(clickPlayingStatus);
  $(".list-group-item").click(clickSong);
  $(".fa-step-forward").click(nextSong);
  $(".fa-step-backward").click(previousSong);


  // capture end of song playback and reset icons/play status
  audio.onended = function(){
    pauseSong();
  };

});

var clickPlayingStatus = function(event){
  if ($(".playing-status").hasClass("fa-play-circle")) {
    // if we are not playing, change to playing
    playSong();
  } else {
    // if we are playing, then put us into pause state
    pauseSong();
  }
}

// in spirit of DRY carve this out to a helper function
var playSong = function() {
  $(".playing-status").removeClass("fa-play-circle");
  $(".playing-status").addClass("fa-pause-circle-o");
  $(".active i").removeClass("fa-play");
  $(".active i").addClass("fa-pause");
  audio.play();

}

// in spirit of DRY carve this out to a helper function
var pauseSong = function() {
  $(".playing-status").addClass("fa-play-circle");
  $(".playing-status").removeClass("fa-pause-circle-o");
  $(".active i").removeClass("fa-pause");
  $(".active i").addClass("fa-play");
  audio.pause();
}

// user selects a different song in the list
var clickSong = function(event) {
    var $target = $(event.currentTarget);
    // if click song list, pause, then move on to reset everything
    if (!($target.hasClass("active"))) {
      //change song to the new target
      changeSong($target);

    } else {
      /* the user clicked the current active song in the list
         if paused, resume playing otherwise go ahead and pause
      */
      if (audio.paused) {playSong();}
        else {pauseSong();}
    }
}

// helper function - change song to the passed in target
var changeSong = function($target) {
  var pathToAssets = './assets/';

  pauseSong();
  // reset which list item is "active"
  $(".active").removeClass("active");
  $target.addClass("active");

  // extract the new title, artist and URL and set them in status bar
  var newTitle = $target.find('.title').text();
  var newArtist = $target.find('.artist').text();
  var newDataURL = $target.find('.title').attr("data-source");

  $(".playing-title").text(newTitle);
  $(".playing-artist").text(newArtist);
  audio.src = pathToAssets + newDataURL;

  // and start playing the new song
  playSong();
}

// move next
var nextSong = function() {
  var $target = $(".active").next();
  if ($target.length == 0) {
    $target = $(".list-group-item:first");
  }
  changeSong($target);
}

// move previous
var previousSong = function() {
  var $target = $(".active").prev();
  if ($target.length == 0) {
    $target = $(".list-group-item:last");
  }
  changeSong($target);
}
