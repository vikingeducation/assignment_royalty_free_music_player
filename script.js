let audioArray;
let lastThis;

$(document).ready(function() {
  let audioCtx = new (window.AudioContext || window.webkitAudiocontext)();

  audioArray = $('audio');

  $(document.body).on('click', '.play', function() {
    if (lastThis !== undefined) {
      lastThis.removeClass('pause').addClass('play');
      $('h2').removeClass('playing');
    }
    $(this)
      .removeClass('play')
      .addClass('pause');
    $('#sound').attr(
      'src',
      $(this)
        .parent()
        .siblings('audio')
        .attr('src')
    );
    $('#sound')
      .get(0)
      .play();
    $(this)
      .parent()
      .siblings('.track')
      .find('h2')
      .addClass('playing');
    lastThis = $(this);

    $('#playback').attr('src', 'images/pause.jpg');
    $('#foot h2').html(
      $(this)
        .parent()
        .siblings('.track')
        .find('h2')
        .html()
    );
    $('#foot p').html(
      $(this)
        .parent()
        .siblings('.track')
        .find('p')
        .html()
    );
  });
  $(document.body).on('click', '.pause', function() {
    $(this)
      .removeClass('pause')
      .addClass('play');
    $('#sound')
      .get(0)
      .pause();
    $(this)
      .parent()
      .siblings('.track')
      .find('h2')
      .removeClass('playing');
    $('#playback').attr('src', 'images/play_button.png');
  });
  $(document.body).on('click', '#skip', function() {
    for (let i = 0; i < audioArray.length; i++) {
      if ($(audioArray[i]).attr('src') === $('#sound').attr('src')) {
        console.log(i);
        if (i === audioArray.length - 2) {
          $('#sound').attr('src', $(audioArray[0]).attr('src'));
        } else {
          $('#sound').attr('src', $(audioArray[i + 1]).attr('src'));
        }
        $('#sound')
          .get(0)
          .play();
        break;
      }
    }
  });

  $(document.body).on('dblclick', '#back', function() {
    for (let i = 0; i < audioArray.length; i++) {
      if ($(audioArray[i]).attr('src') === $('#sound').attr('src')) {
        console.log(i);
        if (i === 0) {
          $('#sound').attr(
            'src',
            $(audioArray[audioArray.length - 2]).attr('src')
          );
        } else {
          $('#sound').attr('src', $(audioArray[i - 1]).attr('src'));
        }
        $('#sound')
          .get(0)
          .play();
        break;
      }
    }
  });
  $(document.body).on('click', '#back', function() {
    $('#sound').get(0).currentTime = 0;
  });

  $(document.body).on('click', '#playback', function() {
    if ($('#sound').prop('paused')) {
      $('#sound')
        .get(0)
        .play();
      $('#playback').attr('src', 'images/pause.jpg');
    } else {
      $('#sound')
        .get(0)
        .pause();
      $('#playback').attr('src', 'images/play_button.png');
    }
  });
});
