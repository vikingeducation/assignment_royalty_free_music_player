window.onload = function () {
  var audio;

  $('.pause').hide();
  $('#pause-button').hide();


  function initAudio(element) {
    var $song = element.attr('song');
    var $title = element.attr('title');
    var $artist = element.attr('artist');

    audio = new Audio('/assets/Media/'+$song);


    //Populates status bar display
    $('#current-song').text($title);
    $('#current-artist').text($artist);
    
    $('#playlist li').removeClass('active');
    element.addClass('active');
  }

  function play() {
    audio.play();
    var $activePlay = $('#playlist li.song.active').find(".play")
    var $activePause = $('#playlist li.song.active').find(".pause")
    $activePlay.hide()
    $activePause.fadeIn(100)
    $('#play-button').hide()
    $('#pause-button').fadeIn(100) 
  }

  function pause() {
    audio.pause();
    var $activePlay = $('#playlist li.song.active').find(".play")
    var $activePause = $('#playlist li.song.active').find(".pause")
    $activePause.hide()
    $activePlay.fadeIn(100)
    $('#pause-button').hide()
    $('#play-button').fadeIn(100)
  }

  function next() {
    var $nextTrack = $('.active').next(".song")
    if ($nextTrack.length === 0) {
      $nextTrack = $('#playlist li.song').first()
    }
    if (audio.duration > 0 && !audio.paused) {
      pause()
    } 
    initAudio($nextTrack)
    play()
  }

  function prev() {
    var $prevTrack = $('.active').prev(".song")
    if ($prevTrack.length === 0) {
      $prevTrack = $('#playlist li.song').last()
    }
    if (audio.duration > 0 && !audio.paused) {
      pause()
    } 
    initAudio($prevTrack)
    play()
  }


  initAudio($('#playlist li:first-child'))

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


  $('#play-button').click(function() {
    play()
  })

  $('#pause-button').click(function() {
    pause()
  })

  $('#next-track').click(function() {
    next()
  })

  $('#prev-track').click(function() {
    prev()  
  })

}