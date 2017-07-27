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
    $(this).addClass('active');
    $(this).find('i').text('pause');

    // When the song is over, reset the styles back to the 'play' state
    $currentSong.on('ended', function(){
      $(this).closest('li')
             .removeClass('active');
      $(this).closest('li').find('i')
             .text('play_arrow');
    });
  });

  // Pause the song when the pause button is clicked
  $('.song-list ul').on('click', 'li.active', function(e){
    var $currentSong = $(this).find('.song-details audio');

    $currentSong.trigger('pause');
    $(this).closest('li')
           .removeClass('active');
    $(this).closest('li').find('i')
           .text('play_arrow');
  });

  // Put the current song details in the player on the bottom
  $('.song-list ul').on('click', 'li:not(.active)', function(e){
    var $currentSongDetails = $(this).find('.song-details');
    var $currentTitle = $currentSongDetails.find('.title').text();
    var $currentArtist = $currentSongDetails.find('.artist').text();
    var $currentSong = $currentSongDetails.find('audio');

    var $playerSongDetails = $('section.player .song-details')
    $playerSongDetails.find('.title').text($currentTitle);
    $playerSongDetails.find('.artist').text($currentArtist);

  });


});




