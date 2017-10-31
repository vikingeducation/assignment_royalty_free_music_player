let audioArray;
let sectionArray;
let lastThis;
let newThis;

$(document).ready(function() {
  audioArray = $('audio');
  sectionArray = $('section');

  let iconReset = function() {
    $('div.pause')
      .addClass('play')
      .removeClass('pause');
  };

  let trackIcon = function(element) {
    if (element.hasClass('play')) {
      element.removeClass('play').addClass('pause');
    } else {
      element.removeClass('pause').addClass('play');
    }
  };

  let trackAssign = function(element) {
    $('#sound').attr(
      'src',
      element
        .parent()
        .siblings('audio')
        .attr('src')
    );
  };

  let play = function() {
    $('#sound')
      .get(0)
      .play();
    $('#playback').attr('src', 'images/pause.jpg');
  };

  let pause = function() {
    $('#sound')
      .get(0)
      .pause();
    $('#playback').attr('src', 'images/play_button.png');
  };

  let redHeading = function(element) {
    element
      .parent()
      .siblings('.track')
      .find('h2')
      .addClass('playing');
    $('#foot h2').html(
      element
        .parent()
        .siblings('.track')
        .find('h2')
        .html()
    );
    $('#foot p').html(
      element
        .parent()
        .siblings('.track')
        .find('p')
        .html()
    );
  };

  let tracker = function(callback) {
    for (let i = 0; i < audioArray.length; i++) {
      if ($(audioArray[i]).attr('src') === $('#sound').attr('src')) {
        callback(i);
        nowPlaying();
        break;
      }
    }
  };

  let backTrack = function(i) {
    if (i === 0) {
      $('#sound').attr('src', $(audioArray[audioArray.length - 2]).attr('src'));
      newThis = sectionArray[sectionArray.length - 1];
    } else {
      $('#sound').attr('src', $(audioArray[i - 1]).attr('src'));
      newThis = sectionArray[i - 1];
    }
    play();
  };

  let skipTrack = function(i) {
    if (i === audioArray.length - 2) {
      $('#sound').attr('src', $(audioArray[0]).attr('src'));
      newThis = sectionArray[0];
    } else {
      $('#sound').attr('src', $(audioArray[i + 1]).attr('src'));
      newThis = sectionArray[i + 1];
    }
    play();
  };

  let restartTrack = function() {
    $('#sound').get(0).currentTime = 0;
  };

  // let newThisFinder = function(callback) {
  //   return tracker(function() {
  //     return (newThis = sectionArray[i]);
  //   });
  // };

  let nowPlaying = function() {
    iconReset();
    $('h2').removeClass('playing');
    $(newThis)
      .find('h2')
      .addClass('playing');
    trackIcon($(newThis).find('div > div'));
    $('#foot h2').html(
      $(newThis)
        .find('h2')
        .html()
    );
    $('#foot p').html(
      $(newThis)
        .find('p')
        .html()
    );
    lastThis = $(newThis).find('.pause');
  };

  $(document.body).on('click', '.play', function() {
    if (lastThis !== undefined) {
      lastThis.removeClass('pause').addClass('play');
      $('h2').removeClass('playing');
    }
    trackIcon($(this));
    trackAssign($(this));
    play();
    redHeading($(this));
    lastThis = $(this);
  });

  $(document.body).on('click', '.pause', function() {
    trackIcon($(this));
    pause();
  });

  $(document.body).on('click', '#skip', function() {
    trackIcon(lastThis);
    return tracker(function(i) {
      return skipTrack(i);
    });
  });

  $(document.body).on('dblclick', '#back', function() {
    trackIcon(lastThis);
    return tracker(function(i) {
      return backTrack(i);
    });
  });

  $(document.body).on('click', '#back', function() {
    restartTrack();
  });

  $(document.body).on('click', '#playback', function() {
    if ($('#sound').prop('paused')) {
      play();
      trackIcon(lastThis);
    } else {
      pause();
      trackIcon(lastThis);
    }
  });
});
