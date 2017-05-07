var clickHandlers = {

  init: function() {
    this.$audioCollection = $("main").find("audio")

    $(".song").on("click", function() {
      clickHandlers.toggleAudio($(this));
      clickHandlers.updateFooterSong($(this));
    });

    $("#player-play-btn").on("click", function() {
      var $currentTrack = $(clickHandlers.getCurrentlyPlayingTrack());
      clickHandlers.toggleAudio($currentTrack.parent());
    });

    $("#player-prev-btn").on("click", function() {
      var $currentSongDiv = $(clickHandlers.getCurrentlyPlayingTrack()).parent();
      clickHandlers.playPreviousSong($currentSongDiv);
    });

    $("#player-next-btn").on("click", function() {
      var $currentSongDiv = $(clickHandlers.getCurrentlyPlayingTrack()).parent();
      clickHandlers.playNextSong($currentSongDiv);
    });

    clickHandlers.initializeFooter();
  },

  toggleAudio: function($songDiv) {
    var audio = $songDiv.find("audio")[0];
    if (clickHandlers.songIsActive($songDiv)) {
      if (audio.paused) {
        audio.play();
        clickHandlers.changePlayBtnToPauseBtn($songDiv);
      } else {
        audio.pause();
        clickHandlers.changePauseBtnToPlayBtn($songDiv);
      }
    }
    else
    {
      clickHandlers.resetActiveSong();
      audio.play();
      clickHandlers.changePlayBtnToPauseBtn($songDiv);
    }
  },

  songIsActive: function($songDiv) {
    var currentSong = clickHandlers.getCurrentlyPlayingTrack();
    var clickedSong = $songDiv.find("audio")[0];
    if (currentSong === clickedSong) {
      return true;
    } else {return false}
  },

  resetActiveSong() {
    var audio = clickHandlers.getCurrentlyPlayingTrack();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      clickHandlers.changePauseBtnToPlayBtn($(audio).parent());
    }
  },

  getCurrentlyPlayingTrack: function() {
    var currentTrack;
    this.$audioCollection.each(function(index, element) {
      if (element.currentTime > 0) {
        currentTrack = element;
        return false;
      }
    });
    return currentTrack;
  },

  initializeFooter: function() {
    var $firstSongDiv = $(".song").first();
    clickHandlers.updateFooterSong($firstSongDiv);
    $firstSongDiv.find("audio")[0].currentTime = 0.01;
  },

  updateFooterSong: function($songDiv) {
    var songTitle = $songDiv.find(".song-title").text();
    var songArtist = $songDiv.find(".song-artist").text();
    $("footer .song-title").text(songTitle);
    $("footer .song-artist").text(songArtist);
  },

  playNextSong: function($songDiv) {
    if (!($songDiv.is($(".song").last()))) {
      clickHandlers.toggleAudio($songDiv.next());
      clickHandlers.updateFooterSong($songDiv.next());
    }
    else {
      clickHandlers.toggleAudio($(".song").first());
      clickHandlers.updateFooterSong($(".song").first());
    }
  },

  playPreviousSong: function($songDiv) {
    if (!($songDiv.is($(".song").first()))) {
      clickHandlers.toggleAudio($songDiv.prev());
      clickHandlers.updateFooterSong($songDiv.prev());
    }
    else {
      clickHandlers.toggleAudio($(".song").last());
      clickHandlers.updateFooterSong($(".song").last());
    }
  },

  changePlayBtnToPauseBtn: function($songDiv) {
    $("#player-play-btn").attr('src', clickHandlers.pauseBtnURL);
    $songDiv.find(".play-btn").attr('src', clickHandlers.pauseBtnURL);
  },

  changePauseBtnToPlayBtn: function($songDiv) {
    $("#player-play-btn").attr('src', clickHandlers.playBtnURL);
    $songDiv.find(".play-btn").attr('src',clickHandlers.playBtnURL);
  },

  pauseBtnURL: "images/glyphicons-175-pause.png",
  playBtnURL: "images/glyphicons-174-play.png",
  $audioCollection: $("main").find("audio")
}

$(document).ready(function() {
  clickHandlers.init();
});
