// Access-Control-Allow-Origin: http://vcs-royalty-free-music-player.surge.sh

$(document).ready( function() {

  var requestURL = 'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc&market=ES';
  // var requestURL = 'https://accounts.spotify.com/api/token';

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
  // var xhr = createCORSRequest('POST', requestURL);
  // xhr.setRequestHeader('grant_type', 'client_credentials');
  // xhr.setRequestHeader("Authorization", "Basic 1ce48a9a44bb4731bc94a4e7ccb639cf:176637573b904e5399c6d6ac23d14bbc");
  // xhr.onload = requestComplete;

  xhr.setRequestHeader('Authorization','Bearer BQBgKgh_qII2_ndRuCMMJN9R4XoiIAQFyDFQA8a_Ui1huXjA9Br3bb-EQsCQjV5ThQnzxOEwb5H14Y2NSF2qvjg_zgz5YYxwEn1EoeSKCYTvv8O2rt8ZJbg_RHSEOm4H4zy8S1LxnWyb ');
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
      for (var j = 0; j < 1; j++) {
        var currentSongName = albumSongs[j]['name'];
        var currentSongAuthor = albumSongs[j]['artists'][0]['name'];
        var currentLink = $(albumSongs[j]['external_urls']).attr('spotify');
        // console.log(albumSongs[j]);

        var $songBox = $('a.song-listed').clone();
        $($songBox.get(0)).find('#mySong').attr( 'id', 'song' + j + i);
        $($songBox.get(0)).attr( 'id', 'audioSong' + j + i);
        //  + Math.floor(Math.random()*10)
        $($songBox.get(0)).find('source').attr('src', currentLink );
        $($songBox.get(0)).find('h5').text(currentSongName);
        $($songBox.get(0)).find('h6').text(currentSongAuthor);
        $songBox.appendTo($('div.playlist'));
      }
    }
  }

  $('span.glyphicon-pause').hide();


  $('div.playlist').click( function(event) {
    var $control  = $('audio').parent(event.target);
    var locator = $control.attr('id');

    var aud = document.getElementById(locator);
    $control.children('span.glyphicon-pause').toggle();
    $control.children('span.glyphicon-play').toggle();
    var pause = $(this).children('span.glyphicon-pause').is(':visible');
    pause ? aud.play() : aud.pause() ;

    // return false;
  })
});
