/*jshint esversion: 6 */

$(document).ready(function() {
  //create array of song files
  let $songs = $('.songInfo').find('audio');
  let arrSongs = $songs.get();

  //create array of play buttons
  let $play = $('.songs').find('i');
  let arrPlay = $play.get();

  //keep track of current song
  var currentSong = 0;

  //show current song information in footer
  function updateFooter(current) {
    let band = $(arrSongs[current])
      .siblings('.song1')
      .text();
    let song = $(arrSongs[current])
      .siblings('.song2')
      .text();
    $('.bottom1').text(band);
    $('.bottom2').text(song);
  }

  //toggle play/pause button next to song
  function togglePlayTop(current) {
    $(arrPlay[current])
      .toggleClass('fa-play')
      .toggleClass('fa-pause');
  }

  //toggle play/pause button in footer
  function togglePlayBottom() {
    $('#playPause')
      .toggleClass('fa-pause-circle-o')
      .toggleClass('fa-play-circle-o');
  }

  //pause (previous) song after forward/back buttons are clicked
  function pauseSong() {
    arrSongs[currentSong].pause();
    $(arrPlay[currentSong])
      .removeClass('fa-pause')
      .addClass('fa-play');
  }

  //play next song after forward/back buttons are clicked
  function playNextSong() {
    arrSongs[currentSong].play();
    updateFooter(currentSong);
    $('#playPause')
      .removeClass('fa-play-circle-o')
      .addClass('fa-pause-circle-o');
    $(arrPlay[currentSong])
      .removeClass('fa-play')
      .addClass('fa-pause');
  }


let handlers = {

  //click event for play/pause button next to song
  clickSong: function() {
    $(arrPlay).click(function(e) {
      for (let i = 0; i < arrPlay.length; i++) {
        if (e.target == arrPlay[i]) {
          currentSong = i;

          //on click of play button, play song & update footer
          if ($(arrPlay[i]).hasClass('fa-play')) {
            arrSongs[i].play();
            togglePlayTop(i);
            togglePlayBottom(i);
            updateFooter(i);

            return currentSong;

            //on click of pause button, pause song
          } else {
            arrSongs[i].pause();
            togglePlayTop(i);
            togglePlayBottom();
            return;
          }
        }
      }
    });
  },

  //click event for play/pause button on footer
  clickPlayFooter: function() {
    $('#playPause').on('click', function() {
      if ($('#playPause').hasClass('fa-play-circle-o')) {
        arrSongs[currentSong].play();
        togglePlayTop(currentSong);
        togglePlayBottom();
      } else {
        arrSongs[currentSong].pause();
        togglePlayTop(currentSong);
        togglePlayBottom();
      }
    });
  },

  //click event for forward/back buttons
  clickForwardBack: function() {
    $('.fa-step-backward').on('click', function() {
      pauseSong();
      if (currentSong == 0) {
        currentSong = arrSongs.length - 1;
      } else {
        currentSong--;
      }
      playNextSong();
      return currentSong;
    });

    $('.fa-step-forward').on('click', function() {
      pauseSong();
      if (currentSong == arrSongs.length - 1) {
        currentSong = 0;
      } else {
        currentSong++;
      }
      playNextSong();
      return currentSong;
    });
  }

};


  handlers.clickSong();
  handlers.clickPlayFooter();
  handlers.clickForwardBack();
});
