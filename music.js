
var getJson = {
  url: 'https://vcs-royalty-free-music-player.surge.sh/data/tracks/index.json',
  createCORSRequest: function (method, url) {
                        var xhr = new XMLHttpRequest();
                        if ("withCredentials" in xhr) {
                          // XHR for Chrome/Firefox/Opera/Safari.
                          xhr.open(method, url, true);
                        } else if (typeof XDomainRequest != "undefined") {
                          // XDomainRequest for IE.
                          xhr = new XDomainRequest();
                          xhr.open(method, url);
                        } else {
                          // CORS not supported.
                          xhr = null;
                        }
                        // xhr.responseType = 'json';
                        return xhr;
                      },
};

var togglePlayStatus = function(jQ, elementHide, elementShow) {
  jQ.children(elementHide).hide();
  jQ.children(elementShow).show();
}

var toggleSiblingsPlayStatus = function(jQ, elementHide, elementShow) {
  jQ.siblings(elementHide).hide();
  jQ.siblings(elementShow).show();
}

// var safePausing = function(audio) {
//   var playPromise = audio.play();
//   if (playPromise !== undefined) {
//     playPromise.then(_ => {
//       // Automatic playback started!
//       // Show playing UI.
//       // We can now safely pause video...
//       video.pause();
//     })
//     .catch(error => {
//       // Auto-play was prevented
//       // Show paused UI.
//     });
//   }
// }


$(document).ready(function() {

  var xhr = getJson.createCORSRequest('GET', getJson.url);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    var vcsMusic = xhr.response;
    showSong(vcsMusic);
  }

  var songsLink = {};
  var audioTracks = {};
  var isPlaying;

  function showSong(jsonObj) {
    var albums = jsonObj;

    for (var j = 0; j < albums.length; j++) {
      var currentSongName = albums[j]['name'];
      var currentSongAuthor = albums[j]['artist'];
      var currentSongLink = albums[j]['track_url'];
      songsLink[currentSongName] = currentSongLink;
      var $songBox = $('a.test-song').clone(true, true);

      $songBox.removeClass().addClass('song-listed');
      $songBox.find('h5').text(currentSongName);
      $songBox.find('h6').text(currentSongAuthor);
      $songBox.appendTo('.playlist');
    }

    var $link = $('a.song-listed');


    $link.click( function(event) {
      event.preventDefault();

      var name = $(this).find('h5').text();
      var author = $(this).find('h6').text();
      // console.log(name);
      // console.log(author);

      if (audioTracks[name]) {
        audioTracks[name] = audioTracks[name];
      } else {
        audioTracks[name] = new Audio(songsLink[name]);
      }

      if (Object.keys(audioTracks).length > 1 && !isPlaying ) {
        delete audioTracks[Object.keys(audioTracks)[0]];
      }

      // console.log(audioTracks[name]);
      // console.log(Object.keys(audioTracks));
      if (Object.keys(audioTracks).length > 1 && isPlaying) {
        delete audioTracks[name];
        return
      } else if (isPlaying && name == Object.keys(audioTracks)) {
        // safePausing(audioTracks[$name]);
        audioTracks[name].pause();
        console.log('pause');
        togglePlayStatus( $(this), 'span.glyphicon-pause', 'span.glyphicon-play');
        togglePlayStatus( $('a.controls'), 'span.glyphicon-pause', 'span.glyphicon-play');
        audioTracks[name].currentTime = 0;
        audioTracks = {};
      } else if (!isPlaying && name == Object.keys(audioTracks)) {
        audioTracks[name].play();
        console.log('play');
        togglePlayStatus( $(this), 'span.glyphicon-play', 'span.glyphicon-pause');
        togglePlayStatus( $('a.controls'), 'span.glyphicon-play', 'span.glyphicon-pause');
        $('a.controls').find('h4').text(name);
        $('a.controls').find('h5').text(author);

      }
      isPlaying = !isPlaying;
      return false;

    })
    $('a.test-song').hide();
  }


  var $controlsPlay = $('a.controls span.glyphicon');

  $controlsPlay.on('click', function(event) {
    var $name = $('a.controls').find('h4').text();
    var $target = $(event.target);
    var $playlistSong = $("h5:contains('" + $name + "')").parents().parents();

    if ( $target.is('span.glyphicon-pause') ) {
      // safePausing(audioTracks[$name]);
      audioTracks[$name].pause();
      $(this).hide();
      $(this).siblings('span.glyphicon-play').show();
      togglePlayStatus( $playlistSong, 'span.glyphicon-pause', 'span.glyphicon-play');

    } else if ( $target.is('span.glyphicon-play') ) {
      if ($name) {
        audioTracks[$name].play();
        $(this).siblings('span.glyphicon-pause').show();
        $(this).hide();
        togglePlayStatus( $playlistSong, 'span.glyphicon-play', 'span.glyphicon-pause');
      }

    } else if ( $target.is('span.glyphicon-step-backward') ) {

      if ($name && $target.siblings('span.glyphicon-play').is(":visible")) {
        isPlaying = false;
        audioTracks = {};
        $playlistSong.prev().trigger( "click" );

      } else if ($name && $target.siblings('span.glyphicon-pause').is(":visible")) {
        // safePausing(audioTracks[$name]);
        audioTracks[$name].pause();
        toggleSiblingsPlayStatus($(this), 'span.glyphicon-pause', 'span.glyphicon-play');
        togglePlayStatus( $playlistSong, 'span.glyphicon-pause', 'span.glyphicon-play');
        isPlaying = false;
        audioTracks = {};
        $playlistSong.prev().trigger( "click" );
      }

    } else if ( $target.is('span.glyphicon-step-forward') ) {

      if ($name && $target.siblings('span.glyphicon-play').is(":visible")) {
        isPlaying = false;
        audioTracks = {};
        $playlistSong.next().trigger( "click" );

      } else if ($name && $target.siblings('span.glyphicon-pause').is(":visible")) {
        // safePausing(audioTracks[$name]);
        audioTracks[$name].pause();
        toggleSiblingsPlayStatus($(this), 'span.glyphicon-pause', 'span.glyphicon-play');
        togglePlayStatus( $playlistSong, 'span.glyphicon-pause', 'span.glyphicon-play');
        isPlaying = false;
        audioTracks = {};
        $playlistSong.next().trigger( "click" );
      }

    }
    isPlaying = !isPlaying;
  });

  $('span.glyphicon-pause').hide();

});
