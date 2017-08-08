var audioMp3 = [
                "assets/audio/freemusicarchive_org/Artofescapism_-_Surprising_power.mp3",
                "assets/audio/freemusicarchive_org/Jahzzar_-_01_-_The_last_ones.mp3",
                "assets/audio/freemusicarchive_org/Monplaisir_-_02_-_Level_2.mp3",
                "assets/audio/freemusicarchive_org/simon_mathewson_-_02_-_disco_tokyo.mp3",
                "assets/audio/freemusicarchive_org/Tours_-_01_-_Enthusiast.mp3"
                ];

var audioOgg = [
                "assets/audio/freemusicarchive_org/Artofescapism_-_Surprising_power.ogg",
                "assets/audio/freemusicarchive_org/Jahzzar_-_01_-_The_last_ones.ogg",
                "assets/audio/freemusicarchive_org/Monplaisir_-_02_-_Level_2.ogg",
                "assets/audio/freemusicarchive_org/simon_mathewson_-_02_-_disco_tokyo.ogg",
                "assets/audio/freemusicarchive_org/Tours_-_01_-_Enthusiast.ogg"
                ];

var songAndArtist = [
                    ["Surprising Power", "Art of Escapism"],
                    ["The Last Ones", "Jahzzar"],
                    ["Level 2", "Monplaisir"],
                    ["Disco Tokyo", "Simon Mathewson"],
                    ["Enthusiast", "Tours"]
                    ];

function backTrack (audioTrackList, current) {
  if ((Number(current)-1) < 0) {
    return (Number(current) + Number(audioTrackList.length)-1);
  }
  else {
    return (Number(current)-1);
  }
}

function forwardTrack (audioTrackList, current) {
  if ( (Number(current)+1) === Number(audioTrackList.length) ) {
    return (Number(current) - Number(audioTrackList.length) + 1);
  }
  else {
    return (Number(current)+1);
  }
}

function clickSong($clickButton, songChoice, audio, playing, audioTrack){
  if ($clickButton.find(".glyphicon-play").is(":hidden")) {
    $(".glyphicon-pause").hide();
    $(".glyphicon-play").show();
    $(".glyphicon-pause").last().hide();
    $(".glyphicon-play").last().show();
    audio.pause();
  }
  else {
    $(".glyphicon-play").show();
    $(".glyphicon-pause").hide();
    $clickButton.find(".glyphicon-pause").show();
    $clickButton.find(".glyphicon-play").hide();
    $(".glyphicon-pause").last().show();
    $(".glyphicon-play").last().hide();
    audio.pause();
    playing = songChoice;
    audio.src = audioTrack[playing];
    audio.load();
    displayTitle(playing);
    audio.play();
  }
  return playing;
}

function pauseSong ($location){
  $location.find(".glyphicon-pause").show();
  $location.find(".glyphicon-play").hide();
}

function playSong ($location){
  $location.find(".glyphicon-pause").show();
  $location.find(".glyphicon-play").hide();
}

function displayTitle (playing){
  $("#footerStatus").find("dt").text(songAndArtist[playing][0]);
  $("#footerStatus").find("dd").text(songAndArtist[playing][1]);
}

$( document ).ready(function() {
  //Check for compatibility
  var audio = document.createElement( 'audio' );
  if ( audio.canPlayType('audio/mpeg') ) {
      var audioTrack = audioMp3;
  }
  else  {
      var audioTrack = audioOgg;
  }
  //Setup music array
  var playing = 0;
  var playlistLength = audioTrack.length;
  var audio = new Audio(audioTrack[playing]);
  //auto play
  audio.play();
  $(".glyphicon-pause").hide();
  $(".glyphicon-pause").eq(0).show();
  $(".glyphicon-play").eq(0).hide();
  $(".glyphicon-pause").last().show();
  $(".glyphicon-play").last().hide();

  //Clicking bottom pause
  $(".glyphicon-pause").last().on("click",function(event) {
    audio.pause();
    $(".glyphicon-pause").hide();
    $(".glyphicon-play").show();
  })

  //Clicking bottom play button
  $(".glyphicon-play").last().on("click", function(event){
    audio.play();
    $(".glyphicon-pause").last().show();
    $(".glyphicon-play").last().hide();
    $(".list-group").find(".glyphicon-pause").eq(playing).show();
    $(".list-group").find(".glyphicon-play").eq(playing).hide();
  })

  //Clicking bottom back button
  $(".glyphicon-step-backward").on("click", function(event){
    $(".list-group").find(".glyphicon-pause").eq(playing).hide();
    $(".list-group").find(".glyphicon-play").eq(playing).show();
    playing = backTrack(audioTrack,playing);
    audio.pause();
    audio.src = audioTrack[playing];
    audio.load();
    $(".glyphicon-pause").last().show();
    $(".glyphicon-play").last().hide();
    $(".list-group").find(".glyphicon-pause").eq(playing).show();
    $(".list-group").find(".glyphicon-play").eq(playing).hide();
    displayTitle(playing);
    audio.play();
  })

  //Clicking bottom next button
  $(".glyphicon-step-forward").on("click", function(event){
    $(".list-group").find(".glyphicon-pause").eq(playing).hide();
    $(".list-group").find(".glyphicon-play").eq(playing).show();
    playing = forwardTrack(audioTrack,playing);
    audio.pause();
    audio.src = audioTrack[playing];
    audio.load();
    $(".glyphicon-pause").last().show();
    $(".glyphicon-play").last().hide();
    $(".list-group").find(".glyphicon-pause").eq(playing).show();
    $(".list-group").find(".glyphicon-play").eq(playing).hide();
    displayTitle(playing);
    audio.play();
  })

  //Click first song
  $(".list-group").children("button").eq(0).on("click", function(event){
    playing = clickSong($(event.target), 0, audio, playing, audioTrack);
  })

  //Click second song
  $(".list-group").children("button").eq(1).on("click", function(event){
    playing = clickSong($(event.target), 1, audio, playing, audioTrack);
  })
  //Click third song
  $(".list-group").children("button").eq(2).on("click", function(event){
    playing = clickSong($(event.target), 2, audio, playing, audioTrack);
  })
  //Click fourth song
  $(".list-group").children("button").eq(3).on("click", function(event){
    playing = clickSong($(event.target), 3, audio, playing, audioTrack);
  })
  //Click fifth song
  $(".list-group").children("button").eq(4).on("click", function(event){
    playing = clickSong($(event.target), 4, audio, playing, audioTrack);
  })

});
