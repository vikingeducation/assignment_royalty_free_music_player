"use strict";
$( document ).ready(function() {


// -----------sandbox-------------------------------------------

  // document.getElementById('bg_audio').play();

  // $('#playButton').on('click', function(e){
  //   $('#bg_audio').trigger("play");
  // });

  // $('#pauseButton').on('click', function(e){
  //   $('#bg_audio').trigger("pause");
  // });


  // document.getElementById('bg_audio').addEventListener('ended', function(){
  //     $('#jschanger').css('border', '1px solid blue');
  // });

  // $('#bg_audio').on('ended', function(){
  //     $('#jqchanger').css('border', '1px solid red');
  // });

// ------------------------------------------------------

  // Play the song when the play button is clicked.
  $('.song-list ul').on('click', 'li', function(e){
    var $currentSong = $(this).find('.song-details audio');

    $currentSong.trigger('play');
    $(this).addClass('active')
           .removeClass('play')
           .addClass('pause');
    $(this).find('i').text('pause');

    // When the song is over, reset the styles back to the 'play' state
    $currentSong.on('ended', function(){
      $(this).closest('li')
             .removeClass('active')
             .removeClass('pause')
             .addClass('play');
      $(this).closest('li').find('i')
             .text('play_arrow');
    });
  });

  // Pause the song when the pause button is clicked
  $('.song-list ul').on('click', 'li.pause', function(e){
    var $currentSong = $(this).find('.song-details audio');

    $currentSong.trigger('pause');
    $(this).closest('li')
           .removeClass('active')
           .removeClass('pause')
           .addClass('play');
    $(this).closest('li').find('i')
           .text('play_arrow');
  });


});