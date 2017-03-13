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
    $(obj).siblings().find('audio').trigger('load');
    $(obj).siblings().find('audio').trigger('play');
    $('#footer-play').attr('src','../assets/pause.png');
    playHandlers.updateFooter(obj);
  },

  pauseSong: function(obj){
    var icon = $('<img src="../assets/play.png" />');
    $(obj).children().first().remove();
    $(obj).removeClass('playing');
    $(obj).append($(icon));
    $(obj).siblings().find('audio').trigger('pause');
    $('#footer-play').attr('src','../assets/play_with_circle.png');
  },

  updateFooter: function(obj){

    // update the artist info
    var songTitle = $(obj).siblings().find('h3').text();
    var artistName = $(obj).siblings().find('p').text();
    $('.footer .song-info h3').text(songTitle);
    $('.footer .song-info p').text(artistName);

  }

};