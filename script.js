jQuery(document).ready(function ($) {
  var tracks = [
    'onhold',
    'thirsty',
    'wheels',
    'hold',
    'til'
  ]
  $('li i').click(function () {
    $(this).toggleClass('fa-pause fa-play');
    $('#playButton').toggleClass('fa-play-circle fa-pause-circle');
    $('h2').html($(this).siblings('h4').text());
    $('h3').html($(this).siblings('h5').text());
    play();
  }); //end li i click

  $('#playButton').click (function () {
    if (((this).class) ==  $('.fa-play-circle')) {
      play();
    } else {
      pause();
    };
  }); // end playButton

  $('#prev').click(function () {

  });

  $('#next').click(function (){

  });
    // play function

    // pause function - no sound


}); // end doc ready
