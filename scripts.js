$(document).ready(function() {

  var audio;

  $(".glyphicon-pause").hide();

  function initAudio(element) {
    var $song = element.attr("song");
    var $songTitle = element.attr("title");
    var $songArtist = element.attr("artist");

    audio = new Audio("media/"+$song);

    $("#current-song").text($songTitle);
    $("#current-artist").text($songArtist);

    $(".playlist-songs").removeClass("active-song");
    element.addClass("active-song");
  };

  function play() {
    audio.play();
    var $songPlay = $(".playlist-songs.active-song").find(".song-play")
    var $songPause = $(".playlist-songs.active-song").find(".song-pause")
    $songPlay.hide();
    $songPause.show();
    $("#control-play").hide();
    $("#control-pause").show();
  };

  function pause() {
    audio.pause();
    var $songPlay = $(".playlist-songs.active-song").find(".song-play")
    var $songPause = $(".playlist-songs.active-song").find(".song-pause")
    $songPlay.show();
    $songPause.hide();
    $(".glyphicon-pause").hide();
    $(".glyphicon-play").show();
    $("#control-play").show();
  };

  function next() {
    audio.pause();

    var $songPlay = $(".playlist-songs.active-song").find(".song-play")
    var $songPause = $(".playlist-songs.active-song").find(".song-pause")
    $songPlay.show();
    $songPause.hide();

    var $nextTrack = $(".active-song").next();
    if ($nextTrack.length === 0) {
      $nextTrack = $(".playlist-songs").first();
    }
    initAudio($nextTrack);
    $(".glyphicon-pause").hide();
    $(".glyphicon-play").show();
    $("#control-play").show();
    $("#control-pause").hide();
    play();
  };

  function prev() {
    audio.pause();

    var $songPlay = $(".playlist-songs.active-song").find(".song-play")
    var $songPause = $(".playlist-songs.active-song").find(".song-pause")
    $songPlay.show();
    $songPause.hide();

    var $prevTrack = $(".active-song").prev();
    if ($prevTrack.length === 0) {
      $prevTrack = $(".playlist-songs").last();
    }
    initAudio($prevTrack);
    $(".glyphicon-pause").hide();
    $(".glyphicon-play").show();
    $("#control-play").show();
    $("#control-pause").hide();
    play();
  };

  initAudio($(".playlist-songs.active-song"))

  $(".playlist-songs").click(function(){
    if ($(this).hasClass("active-song")) {
      if (!audio.pause) {
        pause();
      } else {
        play();
      }
    } else {
      pause();
      initAudio($(this));
      play();
    }
  });

  $(".glyphicon-play").click(function() {
    play();
  })

  $(".glyphicon-pause").click(function() {
    pause();
  })

  $("#control-play").click(function() {
    play();
  })

  $("#control-pause").click(function() {
    pause();
  })

  $("#control-previous").click(function() {
    prev();
  })

  $("#control-next").click(function() {
    next();
  })

});
