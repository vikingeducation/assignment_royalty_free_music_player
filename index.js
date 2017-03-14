$(document).ready(function(){
  pageSetup.init();
  playHandlers.init();
});

var pageSetup = {
  init: function(){
    var firstSong = $('.song-row').first().find('h3').text();
    var firstArtist = $('.song-row').first().find('p').text();
    $('.footer .song-info h3').text(firstSong);
    $('.footer .song-info p').text(firstArtist);
  },
  playIcon: function(){
    return ('<img src="../assets/play.png" />')
  },
  pauseIcon: function(){
    return ('<img src="../assets/pause.png" />')
  }
};

var playHandlers = {
  init: function(){
    $('.play').click(playHandlers.handleClickPlay);
    $('#footer-previous').click(playHandlers.handleFooterPrevious);
    $('#footer-play').click(playHandlers.handleFooterPlay);
    $('#footer-next').click(playHandlers.handleFooterNext);
  },

  currentSong: function(){
    return $('.footer .song-info h3').text();
  },

  currentSongObj: function(){
    return (
      songCollection
        .list()
        [playHandlers.currentSong()]
    )
  },

  handleClickPlay: function(){
    if ($(this).hasClass('playing')) {
      playHandlers.pauseSong($(this));
    } else {
      playHandlers.pauseSong($('.playing'));
      playHandlers.playSong($(this));
    }
  },

  handleFooterPrevious: function(){
    $(playHandlers.currentSongObj())
      .prev()
      .children()
      .first()
      .trigger('click');
  },

  handleFooterPlay: function(){
    $(playHandlers.currentSongObj())
      .children()
      .first()
      .trigger('click');
  },
  handleFooterNext: function(){
    $(playHandlers.currentSongObj())
      .next()
      .children()
      .first()
      .trigger('click');
  },

  playSong: function(obj){
    $(obj).children().first().remove();
    $(obj).append(
      $(pageSetup.pauseIcon())
    );
    $(obj).addClass('playing');
    $(obj).siblings().find('audio').trigger('load');
    $(obj).siblings().find('audio').trigger('play');
    $('#footer-play').attr('src','../assets/pause.png');
    playHandlers.updateFooter(obj);
  },

  pauseSong: function(obj){
    var icon = $(pageSetup.playIcon());
    $(obj).children().first().remove();
    $(obj).removeClass('playing');
    $(obj).append($(icon));
    $(obj).siblings().find('audio').trigger('pause');
    $('#footer-play').attr('src','../assets/play_with_circle.png');
  },

  updateFooter: function(obj){
    // update the artist info in footer
    var songTitle = $(obj).siblings().find('h3').text();
    var artistName = $(obj).siblings().find('p').text();
    $('.footer .song-info h3').text(songTitle);
    $('.footer .song-info p').text(artistName);

  }

};

var songCollection = {
  list: function(){
    var songList = {}
    for( var i=0; i< $('.song-row').length; i++){
      var songName = $($('.song-row')[i]).find('h3').text();
      var element = $($('.song-row')[i])
      songList[songName] = element;
    }
    return songList;
  }
};
