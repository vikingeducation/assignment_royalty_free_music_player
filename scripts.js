
$(document).ready(function() {

 $('.selection-pause-btn').hide();
 $('#player-pause-btn').hide();

  var audio;


  


  initAudio($('#select-song:first-child'));


  function initAudio(element) {
    var $song = element.attr('song');
    var $songText = element.attr('song-text');
    var $title = element.attr('title');
    var $artist = element.attr('artist');

    audio = new Audio('media/' + $song);


    //Populates status bar display
    $('#playing-now-title').text($songText);
    $('#playing-now-artist').text($artist);
    
    $('.active').removeClass('active');
    element.addClass('active');
  }

  function play() {
    audio.play();
    var $activePlay = $('.active').find(".selection-play-btn")
    var $activePause = $('.active').find(".selection-pause-btn")
    $activePlay.hide()
    $activePause.fadeIn(100)
    
    controlPlay()
  }

  function pause() {
    audio.pause();
    var $activePlay = $('.active').find(".selection-play-btn")
    var $activePause = $('.active').find(".selection-pause-btn")
    $activePause.hide()
    $activePlay.fadeIn(100)
   
    controlPause()
  }

  function next() {
    var $nextTrack = $('.active').next("#select-song")
    if ($nextTrack.length === 0) {
      $nextTrack = $('.active').first()
    }
    if (audio.duration > 0 && !audio.paused) {
      pause()
    } 
    initAudio($nextTrack)
    play()
  }

  function prev() {
    var $prevTrack = $('.active').prev("#select-song")
    if ($prevTrack.length === 0) {
      $prevTrack = $$('.active').last()
    }
    if (audio.duration > 0 && !audio.paused) {
      pause()
    } 
    initAudio($prevTrack)
    play()
  }

  

  $('#tracklist-container #select-song').click(function(){
     console.log('clicked');
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

function controlPlay() {
  $('#player-play-btn').click(function() {
    play()
    $('#player-play-btn').hide();
     $('#player-pause-btn').show();


  })
}

function controlPause() {
  $('#player-pause-btn').click(function() {
    pause()
    $('#player-pause-btn').hide();
     $('#player-play-btn').show();
  })
}

  $('#player-next-btn').click(function() {
    next()

  })

  $('#player-prev-btn').click(function() {
    prev()  
  })


$('#player-play-btn').click(function(){
   play()
})

});
