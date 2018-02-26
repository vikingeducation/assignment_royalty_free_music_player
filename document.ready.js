$(document).ready(function(){

  $('.preload').remove();

  //Selection control functions
  function changeSelected(target) {
    $(".selected").removeClass("selected");
    $(target).addClass("selected");
  }
  function playNew() {
    $('.pause').attr('class', 'icon play');
    $('.selected img').attr('class', 'icon pause');
    $('.paused').attr('class', 'playingPaused playing controls');
  }
  function currentlyPlaying() {
    $('.playingTitle').text($('.selected').children('.title').text());
    $('.playingAuthor').text($('.selected').children('.author').text());
  }
  //Music player function controls
  function startSelected() {
    $('.selected audio').get(0).play();
  }
  function stopSelected() {
    $('.selected audio').get(0).pause();
  }
  function resetTrack() {
    $('.selected audio').get(0).currentTime = 0;
  }

  //Add auto-play functionality listener to all tracks
  $('.song audio').each(function(){
    $(this).get(0).addEventListener('ended' ,function(){
      var target = $('.song.selected').next('.song');
      if ($('.song').last().children('.title').text() == $('.selected').children('.title').text()) {}
        else {
          stopSelected();
          changeSelected(target);
          playNew();
          currentlyPlaying();
          resetTrack();
          startSelected();
        }
    });
  });

  //On clicking a song's play/pause button
  $(document).on('click', '.play', function(e){
    stopSelected();
    changeSelected($(e.target).parent());
    playNew();
    currentlyPlaying();
    resetTrack();
    startSelected();
  });
  $(document).on('click', '.pause', function(){
    $('.pause').attr('class', 'icon play');
    $('.playing').attr('class', 'playingPaused paused controls');
    stopSelected();
  });

  //Skipping back/forwards a track
  $('.skipBack').on('click', function() {
    var target = $('.song.selected').prev('.song');
    if ($('.song').first().children('.title').text() == $('.selected').children('.title').text()) {}
      else {
        stopSelected();
        changeSelected(target);
        playNew();
        currentlyPlaying();
        resetTrack();
        startSelected();
      }
  });
  $('.skipForward').on('click', function() {
    var target = $('.song.selected').next('.song');
    if ($('.song').last().children('.title').text() == $('.selected').children('.title').text()) {}
      else {
        stopSelected();
        changeSelected(target);
        playNew();
        currentlyPlaying();
        resetTrack();
        startSelected();
      }
  });

  //Main pause/play button toggle
  $(document).on('click', '.playing', function(){
    $('.playing').attr('class', 'playingPaused paused controls');
    $('.selected img').attr('class', 'icon play');
    stopSelected();
  });
  $(document).on('click', '.paused', function(){
    $('.paused').attr('class', 'playingPaused playing controls');
    $('.selected img').attr('class', 'icon pause');
    startSelected();
  });
});
