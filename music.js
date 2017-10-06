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
  // var audioTracks = {};
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
      // audioTracks[currentSongName] = new Audio(currentSongLink);

      var $songBox = $('a.test-song').clone(true, true);
      // $($songBox.get(0)).find('#mySong').attr( 'id', 'song' + j + i);
      // $($songBox.get(0)).attr( 'id', 'audioSong' + j + i);
      // $songBox.attr('href', currentSongLink );
      $songBox.removeClass().addClass('song-listed');
      $songBox.find('h5').text(currentSongName);
      $songBox.find('h6').text(currentSongAuthor);
      $songBox.appendTo('.playlist');
    }

    var $link = $('a.song-listed');
    var isPlaying;
    var audioTracks = {};

    $link.click( function(event) {
      event.preventDefault();

      var name = $(this).find('h5').text();
      // audioTracks[name] = audioTracks[name] || new Audio(songsLink[name]);

      // if (audioTracks[name] && Object.keys(audioTracks).length == 0) {
      //   audioTracks[name] = audioTracks[name];
      // } else if (Object.keys(audioTracks).length > 1) {
      // } else {
      //   audioTracks = {};
      //   audioTracks[name] = new Audio(songsLink[name]);
      // }

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
        console.log('in playlenghts of audioTracks is ' + Object.keys(audioTracks).length );
      }
      isPlaying = !isPlaying;
      return false;

    })
    $('a.test-song').hide();
  }

  $('span.glyphicon-pause').hide();

});
