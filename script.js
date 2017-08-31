var currentlyPlaying = {
  title: "Good Bye",
  artist: "Dee Yan-Key"
};

$( document ).ready(function() {
  setSongIds();

  $( ".song" ).click(function() {
    playAudio( $( this ) );
  });

  $( "#currently-playing-icon" ).click(function() {
    playAudio( findCurrentSong() );
  });

  $( "#next-icon" ).click(function() {
    var $allSongs = $( ".song" );
    var $currentSong = findCurrentSong();

    // if last song
    if ($currentSong[0] === $allSongs[$allSongs.length - 1]) {
      playAudio( $( $allSongs.first() ) );
    } else {
      playAudio( $($allSongs[$allSongs.index($currentSong[0]) + 1]) );
    }
  });

  $( "#prev-icon" ).click(function() {
    var $allSongs = $( ".song" );
    var $currentSong = findCurrentSong();

    // if first song
    if ($currentSong[0] === $allSongs[0]) {
      playAudio( $( $allSongs.last() ) );
    } else {
      playAudio( $($allSongs[$allSongs.index($currentSong[0]) - 1]) );
    }
  });
});

function setSongIds() {
  $songs = $( ".song" );

  $.each($( '.song' ), function(index, song) {
    var title = $(song).children('.song-info').children('.song-name').text();
    var idFormatTitle = title.toLowerCase().replace(/ /g, "-");
    $(song).attr('id', idFormatTitle);
  });
}

function playAudio( $song ) {
  var song = $song.next('audio').get(0);
  $mainIcon = $( "#currently-playing-icon" );

  handleSongIcons($song);

  if (song.paused) {
    pauseAllOtherMusic(song);
    placeCirclePauseIcon($mainIcon);
    song.play();
  } else {
    song.pause();
    placeCirclePlayIcon($mainIcon);
  }

  setCurrentlyPlaying($song);
}

function setCurrentlyPlaying($song) {
  var info = $song.children('.song-info');

  currentlyPlaying.title = info.children('.song-name').text();
  currentlyPlaying.artist = info.children('.artist').text();

  $( '#current-song-info .song-name' ).text(currentlyPlaying.title);
  $( '#current-song-info .artist' ).text(currentlyPlaying.artist);
}

function pauseAllOtherMusic(song) {
  var $allSongs = $( 'audio' )
  for (var i = $allSongs.length - 1; i >= 0; i--) {
    if ( $allSongs[i] !== song ) {
      $allSongs[i].pause();
      $allSongs[i].currentTime = 0;

      var $currentIcon = $($allSongs[i]).prev('.song').children('.fa')
      if ($currentIcon.hasClass('fa-pause')) {
        placePlayIcon($currentIcon);
      }
    }
  }
}

function handleSongIcons($song) {
  $icon = $song.children('.fa');
  swapSongIcon($icon);
}

function swapSongIcon($icon) {
  if ($icon.hasClass('fa-play')) {
    placePauseIcon($icon);
  } else {
    placePlayIcon($icon);
  }
}

function placePauseIcon($icon) {
  $icon.removeClass('fa-play')
    .addClass('fa-pause');
}

function placeCirclePauseIcon($icon) {
  $icon.removeClass('fa-play-circle-o')
    .addClass('fa-pause-circle-o');
}

function placePlayIcon($icon) {
  $icon.removeClass('fa-pause')
    .addClass('fa-play');
}

function placeCirclePlayIcon($icon) {
  $icon.removeClass('fa-pause-circle-o')
    .addClass('fa-play-circle-o');
}

function isCurrentSong($song) {
  var title = $song.children('.song-info').children('.song-name').text();

  if (title === currentlyPlaying.title) {
    return true;
  } else {
    return false;
  }
}

function findCurrentSong() {
  return $( "#" + currentlyPlaying.title.toLowerCase().replace(/ /g, "-") );
}

