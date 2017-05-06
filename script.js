var clickHandlers = {
  init: function() {
    $(".song").on("click", function() {
      clickHandlers.toggleAudio($(this).children().filter("audio")[0]);
      clickHandlers.updateCurrentlyPlayingSong()
    })
  },

  toggleAudio: function(audio) {
    audio.play();
  },

  updateCurrentlyPlayingSong: function() {
    
  }
}

$(document).ready(function() {
  clickHandlers.init();
});
