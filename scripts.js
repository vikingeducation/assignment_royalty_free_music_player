$(document).ready(function() {

  var audioTracks = [{
    song: "Epic Song",
    artist: "BoxCat Games",
    src: "audio/BoxCat_Games_-_10_-_Epic_Song.mp3"
  }, {
    song: "Night Owl",
    artist: "Broke For Free",
    src: "audio/Broke_For_Free_-_01_-_Night_Owl.mp3"
  }, {
    song: "Siesta",
    artist: "Jahzzar",
    src: "audio/Jahzzar_-_05_-_Siesta.mp3"
  }, {
    song: "It's Your Birthday",
    artist: "Monk Turner",
    src: "audio/Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3"
  } , {
    song: "Enthusiast",
    artist: "Tours",
    src: "audio/Tours_-_01_-_Enthusiast.mp3"
  }];

  //fill in first track in existing html
  $("#track-1 .song").text(audioTracks[0].song);
  $("#track-1 .artist").text(audioTracks[0].artist);
  $("#track-1 audio").attr('src', audioTracks[0].src);

  //create and fill each additional row based on audioTracks object
  for (var i = 1; i < audioTracks.length; i++) {
    var idName = 'track-' + (i + 1);
    var $newTrack = $("#track-1").clone()
      .attr('id', idName);
    var previousTrackID = '#track-' + i;
    $newTrack.insertAfter(previousTrackID);
    $("#" + idName + " .song").text(audioTracks[i].song);
    $("#" + idName + " .artist").text(audioTracks[i].artist);
    $("#" + idName + " audio").attr('src', audioTracks[i].src);
  }

  var currentlyPlayingID,
      clickedID,
      clickedSong,
      clickedArtist,
      $clickedAudio;

  //when clicking a play button
  $('.icon').on('click', '.fa-play', function() {

    console.log('playing');
    clickedID = $(this).closest(".row").prop("id");
    clickedSong = $('#' + clickedID + ' .song').text();
    clickedArtist = $('#' + clickedID + ' .artist').text();
    $clickedAudio = $('#' + clickedID + " audio");

    //first pause all audio files playing, in case user clicks other track than currently playing
    $('audio').each(function() {
      var song = $(this);
      song[0].pause();
    });

    //then make all icons into play buttons
    $('.icon i').addClass('fa-play').removeClass('fa-pause');

    //play clicked audio and adjust icons/names as necessary
    $clickedAudio[0].play();
    $('#' + clickedID + ' i').removeClass('fa-play').addClass('fa-pause');
    $("#bottom-nav #nav-icon i").removeClass('fa-play').addClass('fa-pause');
    $("#bottom-nav .song").text(clickedSong);
    $("#bottom-nav .artist").text(clickedArtist);
    currentlyPlayingID = clickedID;

  });

  //if the user clicks a pause button
  $('.icon').on('click', '.fa-pause', function() {

    console.log('paused');
    $clickedAudio[0].pause();
    $(this).addClass('fa-play').removeClass('fa-pause');
    $("#bottom-nav #nav-icon i").addClass('fa-play').removeClass('fa-pause');

  });

  //if the user clicks the back button
  $('.fa-step-backward').click(function() {

    //I defined currentlyPlayingID above when a user played a track,
    //I'll take that to adjust which track is playing
    var trackToPlay;
    var currentTrackNum = parseInt(currentlyPlayingID[currentlyPlayingID.length - 1]);
    if (currentlyPlayingID[currentlyPlayingID.length - 1] > 1) {
      trackToPlay = currentlyPlayingID.slice(0, -1) + (currentTrackNum + 1);
    } else if (currentlyPlayingID[currentlyPlayingID.length - 1] == 1){
      trackToPlay = currentlyPlayingID.slice(0, -1) + (audioTracks.length - 1);
    }
    //first pause all audio files playing
    $('audio').each(function() {
      var song = $(this);
      song[0].pause();
    });
    //then make all icons into play buttons
    $('.icon i').addClass('fa-play').removeClass('fa-pause');
    //play clicked audio and adjust icons/names as necessary
    var $previousAudio = $('#' + trackToPlay + " audio");
    var previousSong = $('#' + trackToPlay + ' .song').text();
    var previousArtist = $('#' + trackToPlay + ' .artist').text();
    $previousAudio[0].play();
    $('#' + trackToPlay + " i").addClass('fa-pause').removeClass('fa-play');
    $("#bottom-nav #nav-icon i").addClass('fa-pause').removeClass('fa-play');
    $("#bottom-nav .song").text(previousSong);
    $("#bottom-nav .artist").text(previousArtist);
    currentlyPlayingID = clickedID;

  });

  //if user clicks button to move forward
  $('.fa-step-forward').click(function() {



  });

});
