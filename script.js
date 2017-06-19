var init = function(){

  var songs = [
    {
      'name': 'Springish',
      'artist': 'Gillicuddy',
      'url': './assets/gillicuddy.mp3'
    },

    {
      'name': 'Ancient Heavy tech',
      'artist': 'Komiku',
      'url': './assets/komiku.mp3'
    },

    {
    'name': 'Enthusiast',
    'artist': 'Tours',
    'url': './assets/tours.mp3'
    },

    {
      'name': 'Fater Lee',
      'artist': 'Black Ant',
      'url': './assets/black_ant.mp3'
    }

  ];

  var _createDivs = function(songs){
    for (var i=0; i<songs.length; i++){
      var song = `<div class="songs" url="${songs[i].url}"></div>`
      var $song = $(song)
      var name = `<h4>${songs[i].name}</h4>`
      var $name = $(name)
      var artist = `<h5>${songs[i].artist}</h5>`
      var $artist = $(artist);
      $song.append('<img src="./assets/play.jpg">')
      $song.append($name);
      $song.append($artist);
      $song.on('click', _handleSong)
      $('.queue').append($song)
    };
  };

  var _handleSong = function(e){
    var target = $(e.currentTarget)
    target.hasClass('playing') ? _pauseSong(target) : _playSong(target)
  }

  var _playSong = function(target){
    // $('audio')[0].pause();
    var audio = $('audio source')
    console.log(target)
    console.log(audio)
    audio[0].attributes[0].value = target[0].attributes[1].value

    console.log(target[0].attributes[1].value)
    console.log(audio[0].attributes[0].value)
    var play = $('audio')
    console.log(play)
    // play[0].play();
    $('audio')[0].load();
    $('audio')[0].play();
    console.log(play)
    target.toggleClass('playing')
  }


  _createDivs(songs);
}

$(document).ready(function(){
  init();
})
