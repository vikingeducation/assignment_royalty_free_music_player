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
    var sameSong = _handleSameSong(target.attr('data-song-id'))
    state.playing && target.hasClass('playing') ? _pauseSong(target, sameSong) : _playSong(target, sameSong);
  }

  var _handleSameSong = function(index){
    var oldIndex = state.songIndex;
    setPlayingIndex(state,index);
    var newIndex = state.songIndex;
    var sameSong;
    oldIndex === newIndex ? sameSong = true : sameSong = false
    return sameSong
  }

  var _playSong = function(target, sameSong){
    target.toggleClass('playing')
    $('.footer-background').addClass('playing')
    setPlaying(state, true);
    $(target).siblings().removeClass('playing')
    $('audio source').attr('src', state.songs[state.songIndex].url)
    if (sameSong) {
      $('audio')[0].play();
    } else {
      $('audio')[0].load();
      $('audio')[0].play();
    }
  }

  var _pauseSong = function(target){
    $('audio')[0].pause();
    target.toggleClass('playing')
    $('.footer-background').removeClass('playing')
    setPlaying(state, false);
  }

  var _updatePlayer = function(e, target){
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
    num === songs.length-1 ? num = 0 : num++;
    return num
  }

  var _lastSong = function(num){
    num === 0 ? num = songs.length -1 : num--
    return num
  }

  var _handleSkip = function(callback){
    var currentSongIndex = parseInt($('.footer-background').attr('data-song-id'))
    var newIndex = callback(currentSongIndex)
    setPlayingIndex(state, newIndex);
    _playSong($('.footer-background'));
    $('.footer-background').attr('data-song-id', newIndex)
    var target = $(`.songs[data-song-id*=${newIndex}]`)
    _updatePlayer(false, target)
  }

  var _registerEventHandlers = function(){
    $('.songs').on('click', _handleSong)
               .on('click', _updatePlayer);
    $('.footer-background').on('click', function(e){
      setPlayingIndex(state, $(this).attr('data-song-id'))
      _handleSong(e, $(this))
    });
    $('#forward').on('click', function(){ _handleSkip(_nextSong) })
    $('#backwards').on('click', function(){ _handleSkip(_lastSong) })
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
