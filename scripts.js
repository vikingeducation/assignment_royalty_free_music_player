"use strict";
$( document ).ready(function() {




  // Play the song when the play button is clicked.
  $('.song-list ul li').on('click', 'i.play', function(e){
    var $currentSong = $(this).parent().find('.song-details audio');

    $currentSong.trigger('play');
    $(this).parent().addClass('active');
    $(this).text('pause')
           .removeClass('play')
           .addClass('pause');


  });

  // Pause the song when the pause button is clicked
  $('.song-list ul li').on('click', 'i.pause', function(e){
    var $currentSong = $(this).parent().find('.song-details audio');

    $currentSong.trigger('pause');
    $(this).parent().removeClass('active');
    $(this).text('play_arrow')
           .removeClass('pause')
           .addClass('play');
  });


});