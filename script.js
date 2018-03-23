//has some help from here https://github.com/bradtraversy/html5audioplayer/blob/master/js/main.js

//song Data
const tracks = [{
    title: 'Epic Song',
    artist: 'BoxCat Games',
    path: 'tracks/BoxCat_Games_-_10_-_Epic_Song.mp3',
    id: 0 //id value allows for integar identification and correseponds to html
  },
  {
    title: 'Night Owl',
    artist: 'Broke For Free',
    path: 'tracks/Broke_For_Free_-_01_-_Night_Owl.mp3',
    id: 1
  },
  {
    title: 'Siesta',
    artist: 'Jahzzar',
    path: 'tracks/Jahzzar_-_05_-_Siesta.mp3',
    id: 2
  },
  {
    title: 'Its Your Birthday!',
    artist: 'Monk Turner',
    path: 'tracks/Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3',
    id: 3
  },
  {
    title: 'Enthusiast',
    artist: 'Tours',
    path: 'tracks/Tours_-_01_-_Enthusiast.mp3',
    id: 4
  }
]

var audio; //audio is responsive variable through initAudio that plays() and pauses()
var currentSong; //varible of song playing, same as tracks.id

$(document).ready(function() {

  //hide the pause element right away
  $('.glyphicon-pause').hide();

  //load up a song in the player bar right away
  initAudio(tracks[0]);

  //blank function that loads songs
  function initAudio(e) {
    //variables to store the current song data in
    var song = e.path;
    var title = e.title;
    var artist = e.artist;
    currentSong = e.id;

    //new audio object to control
    audio = new Audio(song)

    //change player info
    $('.songPlayer dt').text(title);
    $('.songPlayer dd').text(artist);

  };

  //fix controls on playlist
  function fixControls(num){

    if (num === 1)
    {
    $(".song-body").find("."+ currentSong).each(function(){
      $(this).find('.glyphicon-play').hide();
      $(this).find('.glyphicon-pause').show();
    });
    }
    else
    {
      $(".song-body").find("."+ currentSong).each(function(){
        $(this).find('.glyphicon-play').show();
        $(this).find('.glyphicon-pause').hide();
      });
    }
  };

  //fixControls on player
  function fixPlayerControls(){
    $('.glyphicon-pause').hide();
    $('.glyphicon-play').show();
    $('.playControl').hide();
    $('.pauseControl').show();
  }

  //play button
  $('.playControl').click(function() {
    audio.play();
    $(this).hide();
    $(this).next('span').show();
    fixControls(1);
  });

  //pause button
  $('.glyphicon-pause').click(function() {
    audio.pause();
    $(this).hide();
    $(this).prev('span').show();
    $('.playControl').show();
    $('.pauseControl').hide();
    fixControls(0);
  });

  //Next button
  $('.glyphicon-step-forward').click(function() {
    audio.pause();

    var nextSong = tracks[currentSong + 1]

    if (nextSong === undefined) {
      nextSong = tracks[0];
    };

    initAudio(nextSong);
    audio.play();
    fixPlayerControls()
    fixControls(1)
  })

  //Prev button
  $('.glyphicon-step-backward').click(function() {
    audio.pause();

    var prevSong = tracks[currentSong - 1]

    if (prevSong === undefined) {
      prevSong = tracks[4];
    };

    initAudio(prevSong);
    audio.play();
    fixPlayerControls()
    fixControls(1);
  })

  //playlist song click
  $('.song-body .glyphicon-play').click(function() {

    audio.pause();

    //get the html id for song ids then parseInt for use
    var listSongIdStr = $(this).attr('id')
    var listSongId = parseInt(listSongIdStr);

    initAudio(tracks[listSongId]);
      fixPlayerControls()
      audio.play();
      fixControls(1);
  })

});

//the only thing is a new song doesn't play when one song finishes
