var player = {

  playing: false,

  init: function() {

    // $currTrack is a $('li') containing currently playing audio
    var $currTrack = $( $("#playlist li")[0] );

    $("#playlist").click( function(event) {
      if (player.playing) {
        // Pause track if it's already playing
        if (audio($currTrack) === audio($(event.target))) {
          player.pause($currTrack);
        } else {
          // If new track, stop current track and play new
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

    $("#main-button").click( function() {
      if (player.playing) {
        player.pause($currTrack);
      } else {
        player.play($currTrack);
      };
      player.updateMainButton(player.playing);
    });

    $("#next-button").click( function() {
      player.stop($currTrack);
      var nextTrack = player.nextTrack($currTrack);
      $currTrack = nextTrack;
      player.play($currTrack);
    });

    $("#prev-button").click( function() {
      player.stop($currTrack);
      var prevTrack = player.prevTrack($currTrack);
      $currTrack = prevTrack;
      player.play($currTrack);
    });

    $("audio").on("ended", function() {
      $currTrack = player.nextTrack($currTrack);
      player.play($currTrack);
    });

    var audio = function(obj) {
      return obj.children("audio")[0];
    };
  },

  updateMainButton: function(playing) {
    if (playing) {
      $("#main-button").removeClass("icon-play")
                       .addClass("icon-pause");
    } else {
      $("#main-button").removeClass("icon-pause")
                       .addClass("icon-play");
    };
  },

  play: function($currTrack) {
    player.playing = true;
    if ($(".playing").length > 0) $(".playing").removeClass();
    $currTrack.addClass("playing");
    var bkgText = $currTrack.text();
    $("#currently-playing").text(`${bkgText} ${bkgText}`);
    $currTrack.children("audio")[0].play();
  },

  pause: function($currTrack) {
    player.playing = false;
    $currTrack.children("audio")[0].pause();
  },

  stop: function($currTrack) {
    player.playing = false;
    var audio = $currTrack.children("audio")[0];
    audio.pause();
    audio.currentTime = 0;
  },

  nextTrack: function($currTrack) {
    if ($currTrack.next().length > 0) {
      return $currTrack.next();
    } else {
      return $("#playlist li").first();
    };
  },

  prevTrack: function($currTrack) {
    if ($currTrack.prev().length > 0) {
      return $currTrack.prev();
    } else {
      return $("#playlist li").last();
    };
  }
};

$(document).ready( function() {
  player.init();
  $("#currently-playing").css("font-size", $(window).height() / 1.6);
});
