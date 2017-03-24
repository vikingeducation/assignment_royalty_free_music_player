window.onload = function () {
  var audio;

  //Hide Pause Button
  $('.pause').hide();
  $('#pause-button').hide();

  //Initializer Function
  function initAudio(element) {
    //Gives us the filename of the song
    var song = element.attr('song');
    var title = element.attr('title');
    var artist = element.attr('artist');

 
    //Create Audio Object
    audio = new Audio('/assets/Media/'+song);


    //Populates status bar display
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

 // if (myAudio.duration > 0 && !myAudio.paused) {
 //    //Its playing...do your job
 //  } else {
 //    //Not playing...maybe paused, stopped or never played.
 //  }


  //   Event Logger
  //   $('.play').click(function(e) {
  //   console.log(e)
  // })
}


















  //      EVENT DATA DRIVEN PLAY CLICK LOGIC - INCOMPLETE
  //        Requires play and pause classes added to status bar controls
  //   // var title;
  //   // var active = $('#playlist li.song.active')
  //   // var clickedButton = $(`#${e.target.id}`) 
  //   // if (clickedButton["0"].id == "play-button") {
  //     audio.play();
  //   //   $(`${active} .play`).fadeOut(100)
  //   //   $('#play-button').fadeOut(100)
  //   //   $(`${active} .pause`).fadeIn(100)
  //   //   $('#pause-button').fadeIn(100)
  //   // } else {
  //   //   var clickedTitle = e.currentTarget.offsetParent.attributes[1].nodeValue
  //   //   var clickedSong = `#playlist li[song="${clickedTitle}"]`
  //   //   audio.play()
  //     $(`${clickedSong} .play`).fadeOut(100)
  //     $('#play-button').fadeOut(100)
  //     $(`${clickedSong} .pause`).fadeIn(100)
  //     $('#pause-button').fadeIn(100)
  //   // }

  //      EVENT DATA DRIVEN PAUSE CLICK LOGIC - INCOMPLETE
  //  // console.log(e);
  //  var title = e.currentTarget.offsetParent.attributes[1].nodeValue
  //  var currentSong = `#playlist li[song="${title}"]`
  //  audio.pause()
  //  $(`${currentSong} .pause`).fadeOut(100)
  //  $("#pause-button").fadeOut(100)
  //  $(`${currentSong} .play`).fadeIn(100)
  //  $('#play-button').fadeIn(100)
