"use strict";
$( document ).ready(function() {


// -----------sandbox-------------------------------------------



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
  $('.container').on('click', '.song-list ul li.active', function(e){
    console.log('clicked a song thats not playing');

    var $currentSongDetails = $(this).find('.song-details');
    var $currentTitle = $currentSongDetails.find('.title').text();
    var $currentArtist = $currentSongDetails.find('.artist').text();
    var $currentSong = $currentSongDetails.find('audio');

    var $playerSongDetails = $('section.player .song-details')
    $playerSongDetails.find('.title').text($currentTitle);
    $playerSongDetails.find('.artist').text($currentArtist);


    // Change the Player play button to a pause button
    var $playerButtons = $(this).closest('.container').find('section.player .buttons');
    $playerButtons.find('#play-button')
                         .attr('id', '#pause-button')
                         .text('pause_circle_outline');
  });


});




