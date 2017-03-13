var musicPlayer = {
  isPaused : true,
  maxSongs : 6,
  currSong : 0,

  init: function() {

    $('#btn-play').on('click', function(e) {
      musicPlayer.playSong(musicPlayer.currSong);
    });
    $('.btn-play').on('click', function(e) {
      musicPlayer.playSong($('.btn-play').index(this));
    });
    $('#btn-back').on('click', function(e) {
      var index = 0;
      if(musicPlayer.currSong <= 0) {
        index = musicPlayer.maxSongs - 1;
      }
      else {
        index = musicPlayer.currSong - 1;
      }
      musicPlayer.playSong(index);
    });
    $('#btn-next').on('click', function(e) {
      var index = 0;
      if(musicPlayer.currSong >= musicPlayer.maxSongs - 1) {
        index = 0;
      }
      else {
        index = musicPlayer.currSong + 1;
      }
      musicPlayer.playSong(index);
    });
  },

  playSong: function(songIndex) {

    var $itemSong = $('.item-song').eq(songIndex);
    var songFile = $itemSong.find('audio')[0];
    var songTitle = $itemSong.find('.song-title').text();
    var songArtist = $itemSong.find('.song-artist').text();
    $('#player-controls').find('.current-song-title').text(songTitle);
    $('#player-controls').find('.current-song-artist').text(songArtist)

    if(musicPlayer.isPaused) {
      if(musicPlayer.currSong !== songIndex) {
        musicPlayer.currSong = songIndex;
        $('audio').each(function(){
          this.pause();
          this.currentTime = 0;
        });
      }
      $('#btn-play').children(".fa-play-circle-o")
        .removeClass("fa-play-circle-o")
        .addClass("fa-pause-circle-o");

      $('.fa-play').eq(songIndex).removeClass('fa-play').addClass('fa-pause');

      songFile.play();
      musicPlayer.isPaused = false;
    }
    else {
      if(musicPlayer.currSong !== songIndex) {
        musicPlayer.currSong = songIndex;
        $('audio').each(function(){
          this.pause();
          this.currentTime = 0;
        });
        $('.fa-pause').removeClass('fa-pause').addClass('fa-play');
        $('.fa-play').eq(songIndex).removeClass('fa-play').addClass('fa-pause');
        songFile.play();
      }
      else {
        $('#btn-play').children(".fa-pause-circle-o")
          .removeClass("fa-pause-circle-o")
          .addClass("fa-play-circle-o");

        $('.fa-pause').removeClass('fa-pause').addClass('fa-play');
        songFile.pause();
        musicPlayer.isPaused = true;
      }
    }
  },
}

$(document).ready(function() {
  musicPlayer.init();

});
