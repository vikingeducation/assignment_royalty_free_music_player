var player = {

  playing: false,
  tracks: $("audio"),

  init: function() {

    var $currTrack;

    $("#playlist").click( function(event) {
      if (player.playing) {
        if (audio($currTrack) === audio($(event.target))) {
          player.pause($currTrack);
        } else {
          player.stop($currTrack);
          $currTrack = $(event.target);
          player.play($currTrack);
        };
      } else {
        $currTrack = $(event.target);
        player.play($currTrack);
      };
      player.updateMainButton(player.playing);
    });

    $(".main-button").click( function() {
      if ($(this).hasClass("icon-pause")) {
        player.pause($currTrack);
      } else {
        player.play($currTrack);
      };
      player.updateMainButton(player.playing);
    });

    var audio = function(obj) {
      return obj.children("audio")[0];
    }
  },

  updateMainButton: function(playing) {
    if (playing) {
      $(".main-button").removeClass("icon-play")
                       .addClass("icon-pause");
    } else {
      $(".main-button").removeClass("icon-pause")
                       .addClass("icon-play");
    };
  },

  play: function(currTrack) {
    player.playing = true;
    if ($(".playing").length > 0) $(".playing").removeClass();
    currTrack.addClass("playing");
    currTrack.children("audio")[0].play();
  },

  pause: function(currTrack) {
    player.playing = false;
    currTrack.children("audio")[0].pause();
  },

  stop: function(currTrack) {
    player.playing = false;
    var track = currTrack.children("audio")[0];
    track.pause();
    track.currentTime = 0;
  }
};

$(document).ready( function() {
  player.init();
});
