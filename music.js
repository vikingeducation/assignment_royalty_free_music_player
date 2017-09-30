// Access-Control-Allow-Origin: http://vcs-royalty-free-music-player.surge.sh

$(document).ready( function() {

  var requestURL = 'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc&market=ES';

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
  xhr.setRequestHeader('Authorization','Bearer BQBo8tixSHLUbBcVhkWH09-K_EX3g_q0vgu9UfvhFlfsuNgusa4dzhGHFdO2Tiium0BKVyRk62iuy2YOmw8FtD1jflKLgxOrUop8HidjKPmBJnbTLP9e1BOA4ldZylPyyBd2svm77FK3');
  xhr.responseType = 'json';
  xhr.send();
  // request.open('GET', requestURL);
  xhr.onload = function() {
    var musicSpotify = xhr.response;
    showSong(musicSpotify);
  }

  function showSong(jsonObj) {
    var albums = jsonObj['albums'];

    for (var i = 0; i < albums.length; i++) {
      var albumSongs = albums[i]['tracks']['items'];

      for (var j = 0; j < albumSongs.length; j++) {
        var currentSongName = albumSongs[j]['name'];
        var currentSongAuthor = albumSongs[j]['artists'][0]['name'];
        var currentLink = albumSongs[j]['linked_from']['href'];

        var $songBox = $('a.song-listed').clone();
        $($songBox.get(0)).attr( 'id', 'song' + j + i );
        $($songBox.get(0))[0]['childNodes'][5].text();
        // zmien link source src=
        $($songBox.get(0)).find('source').attr('src', currentLink )
        $($songBox.get(0)).find('h5').text(currentSongName);
        $($songBox.get(0)).find('h6').text(currentSongAuthor);

        $songBox.appendTo($('div.playlist'));
      }
    }
  }

  $('span.glyphicon-pause').hide();

  var $control = $('#audioControl');
  var aud = document.getElementById("mySong");

  $control.click( function() {
    $('span.glyphicon-pause').toggle();
    $('span.glyphicon-play').toggle();
    var pause = $('span.glyphicon-pause').is(':visible');

    pause ? aud.play() : aud.pause() ;

    // return false;
  })
});
