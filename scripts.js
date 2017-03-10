$(document).ready(function() {
  player.toggleAudio();
  player.mainControls();
});

var player = {
  "toggleAudio": function() {
    $(".track-toggle").on("click", function() {
      var audio = $(this).prev('audio');
      if ($(this).hasClass("now-playing")) {
        audio.play();
        $(this).addClass("now-playing")
          .removeClass("fa-play")
          .addClass("fa-pause");
        var currentMetadata = $(this).parent().next().clone();
        $("footer > div.track-metadata").replaceWith(currentMetadata);
      }
      else {
        audio.pause();
        $(this).addClass("now-playing")
          .removeClass("fa-play")
          .addClass("fa-pause");
      }
    });
  },

  "mainControls": function() {
    $("#main-toggle").on("click", function() {
      var audio = $(".now-playing").next('audio');
      if ($(this).hasClass("fa-play")) {
        audio.play();
        $(this).addClass("fa-pause").removeClass("fa-play");
        $(".now-playing").addClass("fa-pause").removeClass("fa-play");
      } else {
        audio.pause();
        $(this).addClass("fa-play").removeClass("fa-pause");
        $(".now-playing").addClass("fa-play").removeClass("fa-pause");
      }
    });
  }
};
