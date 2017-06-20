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

  let state = setState(songs);

  var _createDivs = function(songs){
    for (var i=0; i<songs.length; i++){
      var song = `<div class="songs" data-song-id="${i}" url="${songs[i].url}"></div>`
      var name = `<h4>${songs[i].name}</h4>`
      var artist = `<h5>${songs[i].artist}</h5>`
      var $song = $(song)
      var $name = $(name)
      var $artist = $(artist);
      $song.append(`<div class='button-background'></div>`)
      $song.append($name);
      $song.append($artist);
      $('.queue').append($song)
    };
  };

  var _handleSong = function(e, element){
    var target;
    element ? target = element : target = $(e.currentTarget)
    var index = target.attr('data-song-id')
    setPlayingIndex(state, index)
    state.playing && target.hasClass('playing') ? _pauseSong(target) : _playSong(target);
  }

  var _playSong = function(target){
    console.log(target)
    target.toggleClass('playing')
    $('.footer-background').addClass('playing')
    setPlaying(state, true);
    $(target).siblings().removeClass('playing')
    var audio = $('audio source')
    audio[0].attributes[0].value = state.songs[state.songIndex].url;
    $('audio')[0].load();
    $('audio')[0].play();
  }

  var _pauseSong = function(target){
    $('audio')[0].pause();
    target.toggleClass('playing')
    $('.footer-background').removeClass('playing')
    setPlaying(state, false);
  }

  var _updatePlayer = function(e, target){
    console.log(e)
    e ? $target = $(e.currentTarget) : $target = target
    var newName = $target.children('h4').html();
    var newArtist = $target.children('h5').html();
    $('.footer h2').html(newName)
    $('.footer h3').html(newArtist)
    $('.footer-background').attr('data-song-id', $target.attr('data-song-id'))
  }

  var _handlePlayer = function(){
    var $target = $('.playing')
    if ($target.hasClass('playing')) {
      _handleSong(false, $target)
    } else {
      _pauseSong($target)
    }
  }

  var _nextSong = function(num){
    num = parseInt(num)
    var length = songs.length -1
    num === length ? num = 0 : num++;
    return num
  }

  var _lastSong = function(num){
    return num === 0 ? num === songs.length-1 : num--
  }

  var _registerEventHandlers = function(){
    $('.songs').on('click', _handleSong)
               .on('click', _updatePlayer);
    $('.footer-background').on('click', function(e){
      setPlayingIndex(state, $(this).attr('data-song-id'))
      _handleSong(e, $(this))
    });
    $('#forward').on('click', function(e){
      var currentSongIndex = $('.footer-background').attr('data-song-id')
      var newIndex = _nextSong(currentSongIndex)
      setPlayingIndex(state, _nextSong(currentSongIndex));
      _playSong($('.footer-background'));
      $('.footer-background').attr('data-song-id', _nextSong(currentSongIndex))
      var test = $(`.songs[data-song-id*=${newIndex}]`)
      _updatePlayer(false, test)
    })
  }


  _createDivs(songs);
  _registerEventHandlers();
}

const setState = (songs, songIndex=0) => {
  return {songs, songIndex, playing:false};
}

const setPlayingIndex = (state, songIndex=0) => {
  return Object.assign(state, {songIndex})
}

const setPlaying = (state, playing=false)=>{
  return Object.assign(state, {playing})
}

$(document).ready(function(){

  init();
})
