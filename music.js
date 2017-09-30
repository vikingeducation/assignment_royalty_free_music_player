$(document).ready( function() {

  $('span.glyphicon-pause').hide();

  var $myAudio = $("#mySong"),
      $control = $('#audioControl');
  var aud = document.getElementById("mySong");

  $control.click( function() {
    $('span.glyphicon-pause').toggle();
    $('span.glyphicon-play').toggle();
    var pause = $('span.glyphicon-pause').is(':visible');


    pause ? aud.play() : aud.pause() ;

    alert('music playing');

    // return false;
  })
});
