$(document).ready( function() {

  var requestURL = 'http://vcs-royalty-free-music-player.surge.sh/data/tracks/index.json';

  function createCORSRequest(method, url) {
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
    return xhr;
  }

  var xhr = createCORSRequest('GET', requestURL);
  var songsLink = {};
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    var musicSpotify = xhr.response;
    showSong(musicSpotify);
  }
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

      if (audioTracks[name]) {
        audioTracks[name] = audioTracks[name];
      } else {
        audioTracks[name] = new Audio(songsLink[name]);
      }
      console.log('length of audiotracks is ' + Object.keys(audioTracks).length);
      console.log('name is ' + name);
      if (isPlaying && name == Object.keys(audioTracks)) {
        audioTracks[name].pause();
        console.log('pause');
        $(this).children('span.glyphicon-pause').hide();
        $(this).children('span.glyphicon-play').show();

        $('a.controls').children('span.glyphicon-pause').hide();
        $('a.controls').children('span.glyphicon-play').show();

        audioTracks[name].currentTime = 0;
        audioTracks = {};
        console.log('in pause lenghts of audioTracks is ' + Object.keys(audioTracks).length );
      } else if (Object.keys(audioTracks).length > 1) {
          delete audioTracks[name];
      } else {
        audioTracks[name].play();
        console.log('play');
        $(this).children('span.glyphicon-pause').show();
        $(this).children('span.glyphicon-play').hide();

        $('a.controls').children('span.glyphicon-pause').show();
        $('a.controls').children('span.glyphicon-play').hide();
        $('a.controls').find('h4').text(name);
        $('a.controls').find('h5').text(author);

        console.log('in playlenghts of audioTracks is ' + Object.keys(audioTracks).length );
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
      audioTracks[$name].pause();
      $(this).hide();
      $(this).siblings('span.glyphicon-play').show();

      $playlistSong.children('span.glyphicon-play').show();
      $playlistSong.children('span.glyphicon-pause').hide();
    } else if ( $target.is('span.glyphicon-play') ) {
      if ($name) {
        audioTracks[$name].play();
        $(this).siblings('span.glyphicon-pause').show();
        $(this).hide();

        $playlistSong.children('span.glyphicon-play').hide();
        $playlistSong.children('span.glyphicon-pause').show();
      }
    } else if ( $target.is('span.glyphicon-step-backward') ) {
      if ($name && $target.siblings('span.glyphicon-play').is(":visible")) {
        isPlaying = false;
        audioTracks = {};
        $playlistSong.prev().trigger( "click" );
      } else if ($name && $target.siblings('span.glyphicon-pause').is(":visible")) {
        audioTracks[$name].pause();
        $(this).siblings('span.glyphicon-pause').hide();
        $(this).siblings('span.glyphicon-play').show();

        $playlistSong.children('span.glyphicon-play').show();
        $playlistSong.children('span.glyphicon-pause').hide();
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
        audioTracks[$name].pause();
        $(this).siblings('span.glyphicon-pause').hide();
        $(this).siblings('span.glyphicon-play').show();

        $playlistSong.children('span.glyphicon-play').show();
        $playlistSong.children('span.glyphicon-pause').hide();
        isPlaying = false;
        audioTracks = {};
        $playlistSong.next().trigger( "click" );
      }
    }
    isPlaying = !isPlaying;
  });

  $('span.glyphicon-pause').hide();

});
