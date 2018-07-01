// do this when you have multiple files!
var RFMP = RFMP || {};

RFMP.songs = [
    {
      title: "Requiem for a Fish",
      artist: "The Freak Fandango Orchestra",
      url: "music/The_Freak_Fandango_Orchestra_-_01_-_Requiem_for_a_Fish.mp3"
    },
    {
      title: "Russian Beach (Heycaluca)",
      artist: "Party People in a Can",
      url: "music/Party_People_in_a_Can_-_05_-_Russian_Beach_Heycaluca.mp3"
    },
    {
      title: "Pueblo Duerme",
      artist: "La Barca de Sua",
      url: "music/La_Barca_de_Sua_-_05_-_Pueblo_Duerme.mp3"
    },
    {
      title: "Ragtime Dance",
      artist: "Scott Joplin",
      url: "music/Scott_Joplin_-_Ragtime_Dance.mp3"
    },
    {
      title: "Ghost Dance",
      artist: "Kevin MacLeod",
      url: "music/Kevin_MacLeod_-_Ghost_Dance.mp3"
    }
];
// do this when you have multiple files!
var RFMP = RFMP || {};

// the view is for talking to the HTML and the user
RFMP.view = {

  init: function(listeners) {
    // adds song HTML to playlist 
    RFMP.view.addSongs();

    // pass handler methods from our player
    // to add to the DOM
    RFMP.view.addListeners(listeners);

    // update the info text for the currently
    // playing track
    RFMP.view.updateSongInfo(); 
  },

  // changes the controls center button to play or pause
  updateControls: function() {
    if (RFMP.currentState.playing) {
      $('#ctrl-play').addClass('glyphicon-pause')
                     .removeClass('glyphicon-play');
    } else { 
      $('#ctrl-play').removeClass('glyphicon-pause')
                     .addClass('glyphicon-play');
    }
  },

  // Changes the text in the control panel
  // to reflect the song name and artist
  // of the current song
  updateSongInfo: function() {
    // get the info of the current song
    var currentSong = RFMP.songs[RFMP.currentState.song];

    $('#song-info .song-title').text(currentSong.title);
    $('#song-info .song-artist').text(currentSong.artist);
  },

  // this takes in a `$song` jQuery
  // element that references the play/pause
  // button and returns the index ID
  getId: function($song) {
    // `+` is a quick way to convert a string
    // to a number
    return +$song.data('index');
  },

  // this takes in a `$song` jQuery
  // element that references the play/pause
  // button and returns the audio element associated
  // with it
  getAudio: function($song) {
    return $song.next();
  },

  // this return finds the play/pause button
  // of the song associated with the `id`
  // we passed into the argument
  getSongFromId: function(id) {
    // the selector looks for a span element
    // with a particular `data-index`.
    // This data-index corresponds
    // to our `songs` array.
    // Make sure there's no space between
    // span and []
    return $('span[data-index=' + id + ']');
  },

  // calls the above method with the id
  // of the current song
  getCurrentSong: function() {
    var id = RFMP.currentState.song;

    return RFMP.view.getSongFromId(id);
  },

  // changes the song's button to a "play" icon
  changeToPlay: function($song) {
    $song.removeClass('glyphicon-pause')
         .addClass('glyphicon-play');
  },

  // changes the song's button to a "pause" icon
  changeToPause: function($song) {
    $song.addClass('glyphicon-pause')
         .removeClass('glyphicon-play');
  },

  // adds listeners to the elements we need
  addListeners: function(listeners) {
    // Note: we are simply passing our methods as
    // handlers rather than writing anonymouse functions
    var $playlist = $('#playlist'),
        $ctrlPlay = $('#ctrl-play'),
        $ctrlNext = $('#ctrl-next'),
        $ctrlPrev = $('#ctrl-prev');
    
    // this is event delegation.  It adds a `click`
    // listener to all the elements with a
    // `play-pause` class inside our playlist,
    // i.e. all our play/pause buttons.
    $playlist.on("click", ".play-pause", listeners.playPause);

    $ctrlPlay.on("click", listeners.playPause);
    $ctrlNext.on("click", listeners.nextTrack);
    $ctrlPrev.on("click", listeners.prevTrack);
  },

  // creates a song HTML element for each song
  // in our `songs` array. Now it's easy to modify
  // our song list without touching the HTML.
  addSongs: function() {
    RFMP.songs.forEach(function(song, index) {
      // this creates the element
      var $playlistItem = RFMP.view.createSongItem(song, index);
      
      // and now we add it to the bottom of our playlist
      $('#playlist').append($playlistItem);
    });
  },

  // this dynamically creates a list item
  // of all the necessary elements
  // for a single song and returns it
  createSongItem: function(song, index) {
    var $li = $('<li>')
                .addClass('col-xs-8 col-xs-offset-2 list-group-item');

    var $textCol = $('<div>')
                    .addClass("col-xs-1")
                    .appendTo($li);

    var $button = $('<span>')
                    .addClass("glyphicon glyphicon-play play-pause")
                    .attr("aria-hidden", "true")
                  // this adds a `data` property that
                  // refers to the index in the
                  // `songs` array
                    .attr("data-index", index)
                    .appendTo($textCol);

    var $audio = $('<audio>')
                    .appendTo($textCol);

    var $source = $('<source>')
                    .attr("src", song.url)
                    .attr("type", "audio/mpeg")
                    .appendTo($audio);

    var $songInfo = $('<div>')
                      .addClass("col-xs-11 song")
                      .appendTo($li);

    $('<p>')
      .addClass("song-title")
      .text(song.title)
      .appendTo($songInfo);
    $('<p>')
      .addClass("song-artist")
      .text(song.artist)
      .appendTo($songInfo);

    return $li;
  }
};
$(document).ready(function() {
  // starts our app
  RFMP.player.init();  
});

// do this when you have multiple files!
// Note that we are attaching
// everything to an object
// so that we don't pollute the global scope
var RFMP = RFMP || {};

// This keeps track of what our player is doing.
// `song` is the index in the array of the current song,
// while `playing` keeps track of whether or 
// not a song is currently playing
RFMP.currentState = {
  song: 0,
  playing: false
};

RFMP.player = {

  init: function() {
    // make an object to pass our handlers
    // to the view object. It keeps
    // these more loosely coupled
    var listeners = {
      playPause: RFMP.player.playPause,
      nextTrack: RFMP.player.nextTrack,
      prevTrack: RFMP.player.prevTrack
    };
    // initialize our other object
    RFMP.view.init(listeners);
  },

  // Starts the audio for the selected song,
  // updates the state, and changes the play/pause.
  // $song references the play/pause button
  // element of the song we want to play
  playSong: function ($song) {
    // find the audio element associated with $song
    var $audio = RFMP.view.getAudio($song),
        newSongID = RFMP.view.getId($song); 

    // jQuery function to start the 'play' event
    $audio.trigger('play');

    // update our state
    RFMP.currentState.song = newSongID;
    RFMP.currentState.playing = true;

    // change the button to the pause icon
    RFMP.view.changeToPause($song);
  },

  // Pauses the audio for the selected song,
  // updates the state, and changes the play/pause.
  // $song references the play/pause button
  // element of the song we want to pause
  pauseSong: function($song) {
    // find the audio element associated with $song
    var $audio = RFMP.view.getAudio($song);

    // pause the audio and update the state
    $audio.trigger('pause');
    RFMP.currentState.playing = false;

    // change the icon
    RFMP.view.changeToPlay($song);
  },

  // Switches from one song to another.
  // $song references the play/pause button
  // element of the song we want to pause
  changeSong: function($song) {
    // Save our old song
    var $prevSong = RFMP.view.getCurrentSong();

    // pause the old song and start the new
    RFMP.player.pauseSong($prevSong);
    RFMP.player.playSong($song);

    // update the text in the
    // control panel to our new song
    RFMP.view.updateSongInfo();
  },

  // This is the click handler for all the play/pause
  // buttons. `event` is an object automatically
  // passed in for any event handlers.
  // This method determines the correct action
  // from the current state and calls the
  // appropriate action
  playPause: function(event) {
    // event.target is the element that was clicked
    var $song = $(event.target),
        songId = RFMP.view.getId($song);

    // (The bottom controller play button was pressed)
    // The `-1` comes from the data-index attribute
    // that is on the html for the control play button
    // This makes sure `$song` references the currently
    // playing song
    if (songId === -1) {
      $song = RFMP.view.getCurrentSong();
      songId = RFMP.view.getId($song);
    }

    // call the appropriate method
    if (songId !== RFMP.currentState.song) {
      RFMP.player.changeSong($song);
    } else if (RFMP.currentState.playing) {
      RFMP.player.pauseSong($song);
    } else {
      RFMP.player.playSong($song);
    }

    // make sure our play/pause button in the controller
    // reflects the current state
    RFMP.view.updateControls();
  },

  // changes song to the next track
  nextTrack: function() {
    // the % method returns a remainder.
    // Here we use it to wrap around to the beginning
    // if we are on the last track
    var nextId = (RFMP.currentState.song + 1) %
                  RFMP.songs.length,
        $nextSong = RFMP.view.getSongFromId(nextId);

    RFMP.player.changeSong($nextSong);
    RFMP.view.updateControls();
  },

  prevTrack: function() {
    var prevId = RFMP.currentState.song - 1;
    // Wraps around to the last track if we
    // were on the first one
    if (prevId < 0) {
      prevId = RFMP.songs.length - 1;
    }

    var $prevSong = RFMP.view.getSongFromId(prevId);

    RFMP.player.changeSong($prevSong);
    RFMP.view.updateControls();
  }
};