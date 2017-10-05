// Access-Control-Allow-Origin: http://vcs-royalty-free-music-player.surge.sh

$(document).ready( function() {

  // var requestURL = 'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc&market=ES';

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
  // xhr.setRequestHeader('Authorization','Bearer BQBgKgh_qII2_ndRuCMMJN9R4XoiIAQFyDFQA8a_Ui1huXjA9Br3bb-EQsCQjV5ThQnzxOEwb5H14Y2NSF2qvjg_zgz5YYxwEn1EoeSKCYTvv8O2rt8ZJbg_RHSEOm4H4zy8S1LxnWyb');
  xhr.responseType = 'json';
  xhr.send();
  // request.open('GET', requestURL);
  xhr.onload = function() {
    var musicSpotify = xhr.response;
    showSong(musicSpotify);
  }


  function showSong(jsonObj) {
    var albums = jsonObj;

    // for (var i = 0; i < albums.length; i++) {
      // var albumSongs = albums[i]['tracks']['items'];
    for (var j = 0; j < albums.length; j++) {
      // var currentSongName = albumSongs[j]['name'];
      var currentSongName = albums[j]['name'];
      // var currentSongAuthor = albumSongs[j]['artists'][0]['name'];
      var currentSongAuthor = albums[j]['artist'];
      // var currentLink = $(albumSongs[j]['external_urls']).attr('spotify');
      var currentSongLink = albums[j]['track_url'];
      songsLink[currentSongName] = currentSongLink;

      var $songBox = $('a.test-song').clone(true, true);
      // $($songBox.get(0)).find('#mySong').attr( 'id', 'song' + j + i);
      // $($songBox.get(0)).attr( 'id', 'audioSong' + j + i);
      //  + Math.floor(Math.random()*10)
      // $songBox.attr('href', currentSongLink );
      $songBox.removeClass().addClass('song-listed');
      $songBox.find('h5').text(currentSongName);
      $songBox.find('h6').text(currentSongAuthor);
      $songBox.appendTo('.playlist');


    }

    var $link = $('a.song-listed');
    var audio = 'none';
    audioPicker = function(songHref) {
      audio = new Audio( songHref );
    };

    var isPlaying;

    $link.click( function(event) {
      event.preventDefault();
      var songName = $(this).find('h5').text();
      audioPicker(songsLink[songName]);
      if (isPlaying) {
        audio.pause();
        console.log('pause');
        audio.currentTime = 0;
        $(this).children('span.glyphicon-pause').hide();
        $(this).children('span.glyphicon-play').show();
      } else {
        audio.play();
        console.log('play');
        $(this).children('span.glyphicon-pause').show();
        $(this).children('span.glyphicon-play').hide();
      }
      isPlaying = !isPlaying;
      return false;

      // var pause = $(this).children('span.glyphicon-pause').is(':visible');
      // pause ? aud.play() : aud.pause() ;
      // return false;
    })
    // }
    $('a.test-song').hide();
  }

  $('span.glyphicon-pause').hide();

  // $(function() {
  // var $toggle = $('#toggle');
  //
  // // Imagine is might be an array of audio elements instead of just one
  // var audio = new Audio('http://vcs-royalty-free-music-player.surge.sh/data/mp3s/4-Corner-Bass_preview.mp3');
  // var isPlaying;
  //
  // $toggle.click(function(e) {
  //     e.preventDefault();
  //     if (isPlaying) {
  //       audio.pause();
  //       audio.currentTime = 0;
  //       $toggle.text('Play');
  //     } else {
  //       audio.play();
  //       $toggle.text('Stop');
  //     }
  //     isPlaying = !isPlaying;
  //     return false;
  //   });
  // });


});
