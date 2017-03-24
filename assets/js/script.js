window.onload = function () {
  var audio;

  $('.pause').hide();
  $('#pause-button').hide();


  function initAudio(element) {
    var song = element.attr('song');
    var title = element.attr('title');
    var artist = element.attr('artist');

    audio = new Audio('/assets/Media/'+song);

    $('#current-song').text(title);
    $('#current-artist').text(artist);
    
    $('#playlist li').removeClass('active');
    element.addClass('active');
  }

  function play() {
    audio.play();
    var activePlay = $('#playlist li.song.active').find(".play")
    var activePause = $('#playlist li.song.active').find(".pause")
    activePlay.hide()
    activePause.fadeIn(100)
    $('#play-button').hide()
    $('#pause-button').fadeIn(100) 
  }

  function pause() {
    audio.pause();
    var activePlay = $('#playlist li.song.active').find(".play")
    var activePause = $('#playlist li.song.active').find(".pause")
    activePause.hide()
    activePlay.fadeIn(100)
    $('#pause-button').hide()
    $('#play-button').fadeIn(100)
  }


  initAudio($('#playlist li:first-child'))


  $('#play-button').click(function(e) {
    play()
  })

  $('#pause-button').click(function(e) {
    pause()
  })

  $('#playlist li').click(function(){
    // console.log($())
    if ($(this).hasClass("active")) {
      if (audio.duration > 0 && !audio.paused) {
        pause()
      } else {
        play()
      }
    } else {
      pause()
      initAudio($(this));
      play()
    }
  })

}