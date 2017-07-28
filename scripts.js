"use strict";
$( document ).ready(function() {


// -----------sandbox-------------------------------------------


// ------------------------------------------------------


// Set up songs data
var songs = [
{ id: 1,
  title: "Water",
  artist: "SoudBible",
  mp3File: "water.mp3",
  oggFile: "water.ogg"
},
{ id: 2,
  title: "Robot Blip",
  artist: "SoudBible",
  mp3File: "robot_blip.mp3",
  oggFile: "robot_blip.ogg"
},
{ id: 3,
  title: "Chime",
  artist: "YogaAlbum",
  mp3File: "chime.mp3",
  oggFile: "chime.ogg"
},
{ id: 4,
  title: "Springish",
  artist: "Gillicuddy",
  mp3File: "Gillicuddy_-_05_-_Springish.mp3",
  oggFile: "Gillicuddy_-_05_-_Springish.ogg"
},
{ id: 5,
  title: "Estampe Galactus Barbere Epaul Giraffe Ennui",
  artist: "Monplaisir Cie",
  mp3File: "Monplaisir__Cie_-_37_-_Monplaisir_-_Estampe_Galactus_Barbere_Epaul_Giraffe_Ennui.mp.mp3",
  oggFile: "Monplaisir__Cie_-_37_-_Monplaisir_-_Estampe_Galactus_Barbere_Epaul_Giraffe_Ennui.mp.ogg"
},
{ id: 6,
  title: "Amsterdam",
  artist: "Lasers",
  mp3File: "LASERS_-_01_-_Amsterdam.mp3",
  oggFile: "LASERS_-_01_-_Amsterdam.ogg"
}];




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


     // Pause the song when the pause button is clicked
    $playerButtons.on('click', 'i', function(e){ //THIS IS NOT BINDING RIGHT
      console.log('player pause icon');
      // var $currentSong = $(this).find('.song-details audio');

      // $currentSong.trigger('pause');
      // $(this).closest('li')
      //        .removeClass('active');
      // $(this).closest('li').find('i')
      //        .text('play_arrow');
    });


  });


});




