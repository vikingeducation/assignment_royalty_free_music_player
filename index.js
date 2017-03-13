$(document).ready(function(){
  playHandlers.init();
});

var playHandlers = {
  init: function(){

    $('.play').click(playHandlers.handleClickPlay);

  },

  handleClickPlay: function(){
    var play = $('<img src="../assets/play.png" />');
    var pause = $('<img src="../assets/pause.png" />');
    var currentlyPlaying = $('.playing');
    $(this).children().first().remove();

    if ($(this).hasClass('playing')) {
      $(this).removeClass('playing');
      $(this).append($(play));

    } else {
      $(currentlyPlaying).removeClass('playing');
      $(currentlyPlaying).children().first().remove();
      $(currentlyPlaying).append($(play));

      $(this).addClass('playing');
      $(this).append($(pause));
    }


  }

};