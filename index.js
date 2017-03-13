$(document).ready(function(){
  playHandlers.init();
});

var playHandlers = {
  init: function(){
    $('.play').click(playHandlers.handleClickPlay);
  },

  handleClickPlay: function(){
    if ($(this).hasClass('playing')) {
      playHandlers.pauseSong($(this));
    } else {
      playHandlers.pauseSong($('.playing'));
      playHandlers.playSong($(this));
    }
  },

  playSong: function(obj){
    var icon = $('<img src="../assets/pause.png" />');
    $(obj).children().first().remove();
    $(obj).addClass('playing');
    $(obj).append($(icon));

    $(obj).siblings().find('audio').trigger('play');
  },

  pauseSong: function(obj){
    var icon = $('<img src="../assets/play.png" />');
    $(obj).children().first().remove();
    $(obj).removeClass('playing');
    $(obj).append($(icon));

    $(obj).siblings().find('audio').trigger('pause');
  }

};