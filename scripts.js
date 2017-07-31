"use strict";
$( document ).ready(function() {


// -----------sandbox-------------------------------------------


// ------------------------------------------------------


  // Set up songs data
  var songs = [
  { id: 10,
    title: "Water",
    artist: "SoundBible",
    mp3File: "water.mp3",
    oggFile: "water.ogg"
  },
  { id: 20,
    title: "Robot Blip",
    artist: "SoundBible",
    mp3File: "robot_blip.mp3",
    oggFile: "robot_blip.ogg"
  },
  { id: 30,
    title: "Chime",
    artist: "YogaAlbum",
    mp3File: "chime.mp3",
    oggFile: "chime.ogg"
  },
  { id: 40,
    title: "Springish",
    artist: "Gillicuddy",
    mp3File: "Gillicuddy_-_05_-_Springish.mp3",
    oggFile: "Gillicuddy_-_05_-_Springish.ogg"
  },
  { id: 50,
    title: "Estampe Galactus Barbere Epaul Giraffe Ennui",
    artist: "Monplaisir Cie",
    mp3File: "Monplaisir__Cie_-_37_-_Monplaisir_-_Estampe_Galactus_Barbere_Epaul_Giraffe_Ennui.mp3",
    oggFile: "Monplaisir__Cie_-_37_-_Monplaisir_-_Estampe_Galactus_Barbere_Epaul_Giraffe_Ennui.ogg"
  },
  { id: 60,
    title: "Amsterdam",
    artist: "Lasers",
    mp3File: "LASERS_-_01_-_Amsterdam.mp3",
    oggFile: "LASERS_-_01_-_Amsterdam.ogg"
  }];

  // Set up Player class
  function Player(songs) {

    this.initialize = function(songs) {
      var songSet = {};
      songs.forEach(function(song){
        songSet[song.id] = song;
      });
      this.songs = songSet;
    };
    this.currentSong = {};
    this.setCurrentSong = function(id) {
      this.currentSong = this.songs[id];
      //this.renderSong ?
      return true;
    };
    this.initialize(songs);
  }//close Player

  var player = new Player(songs);


  // Build out HTML elements for songs
  var renderSong = function(song) {
    var $songTitle = $('<p></p>')
              .addClass('title')
              .text(song.title);

    var $songArtist = $('<p></p>')
              .addClass('artist')
              .text(song.artist);

    var $songMp3 = $('<source></source>')
              .attr('src', 'music/' + song.mp3File)
              .attr('type', 'audio/mpeg');

    var $songOgg = $('<source></source>')
              .attr('src', 'music/' + song.oggFile)
              .attr('type', 'audio/ogg');

    var $songAudioSection = $('<audio></audio>')
              .attr('id', song.id)
              .attr('preload','none')
              .text('Your browser does not support HTML5 audio.')
              .prepend($songOgg)
              .prepend($songMp3);

    var $songDetails = $('<div></div>')
              .addClass('song-details')
              .append($songTitle)
              .append($songArtist)
              .append($songAudioSection);

    var $songLi = $('<li></li>')
              .append('<i class="material-icons">play_arrow</i>')
              .append($songDetails);

    $('.song-list ul').append($songLi);
  };//close renderSong


  // Load all songs into the song-list
  songs.forEach(function(song){
    renderSong(song);
  });

  // Load the first song into the player
  var songToPlayer = function(song){
    var $playerSongDetails = $('section.player .song-details')
    $playerSongDetails.find('.title').text(song.title);
    $playerSongDetails.find('.artist').text(song.artist);
    $playerSongDetails.find('input').attr('type', 'hidden').text(song.id);
    player.setCurrentSong(song['id']);
  };
  songToPlayer(songs[0]);


  // Play the song when the li is clicked.
  var resetSongStyles = function(song){
    song.closest('li')
           .removeClass('active');
    song.closest('li').find('i')
           .text('play_arrow');
  };

  $('.song-list ul').on('click', 'li', function(e){
    var $clickedSong = $(this).find('.song-details audio');
    player.setCurrentSong($clickedSong.get(0).id);

    // First, pause any other songs that may be currently playing
    $.each($('audio'), function(index, element) {
      $(element).trigger('pause');
      resetSongStyles($(element));
    });

    // Then play the clicked song
    $clickedSong.trigger('play');
    $(this).addClass('active');
    $(this).find('i').text('pause');

    // When the song is over, reset the styles back to the 'play' state
    $clickedSong.on('ended', function(){
      resetSongStyles($(this));
    });
  });

  // Pause the song when an active li is clicked
  $('.song-list ul').on('click', 'li.active', function(e){
    var $clickedSong = $(this).find('.song-details audio');

    $clickedSong.trigger('pause');
    resetSongStyles($(this));
  });

  // Put the clicked song details in the player on the bottom
  $('.container').on('click', '.song-list ul li.active', function(e){
    console.log('clicked a song thats not playing');

    var $currentSong = player.currentSong;
    songToPlayer($currentSong);


    // Change the player play button to a pause button
    var $playerButtons = $(this).closest('.container').find('section.player .buttons');
    $playerButtons.find('#play-button')
                         .attr('id', 'pause-button')
                         .text('pause_circle_outline');


    // Pause the song when the player pause button is clicked
    $playerButtons.on('click', 'i#pause-button', function(e){
      console.log('clicked player pause button');

      $('audio#'+$currentSong.id).trigger('pause');
      resetSongStyles($('audio#'+$currentSong.id));

      $(this).attr('id', 'play-button')
             .text('play_circle_outline');
    });

    // Unpause the song when the player play button is clicked
    $playerButtons.on('click', 'i#play-button', function(e){
      console.log('clicked player play button');

      $('audio#'+$currentSong.id).trigger('play')
                                .closest('li')
                                .addClass('active')
                                .find('i')
                                .text('pause');

      $(this).attr('id', 'pause-button')
             .text('pause_circle_outline');

    });

  });


});




