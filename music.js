$(document).ready(function(){

  var audioElement = document.createElement('audio');
  audioElement.play()



  $("#song-list li").on('click',playSong);
  $("#play-button").on('click',barPlay);
  $("#next-button").on('click',nextPlay);
  $("#prev-button").on('click',prevPlay);

  var playSong= false;
  var currentSong= $("#song-list li:first-child");
  setSongInfo();
  setSongLink();

  function setSongInfo(){
    var songTitle = currentSong.find('.song-title').text();
    var songArtist = currentSong.find('.song-artist').text();
    $("#song-title").text(songTitle);
    $("#song-artist").text(songArtist);
  }

  function setSongLink(){
    var songLink = currentSong.attr('src');
    if (audioElement.getAttribute('src') != songLink)
    audioElement.setAttribute('src', songLink);
  }

  function playSetSong(){
    audioElement.play();
  }

  function pauseSetSong(){
    audioElement.pause();
  }


  function reportPlaying(){
    console.log(currentSong.text() + "is playing");
  }

  function reportPaused(){
    console.log(currentSong.text() + "is paused");
  }



  function playSong(){
    if (playSong && $( this ).text()== currentSong.text()){
      $(this).find('span').attr("class","glyphicon glyphicon-play");
      $("#play-button").find('span').attr("class","glyphicon glyphicon-play");
      playSong= false;
      pauseSetSong();
      reportPaused();
    }else{
      $("#song-list").find('span').attr("class","glyphicon glyphicon-play");
      $( this).find('span').attr("class","glyphicon glyphicon-pause");
      $("#play-button").find('span').attr("class","glyphicon glyphicon-pause");
      setSongInfo();
      playSong= true;
      currentSong= $(this);
      setSongLink();
      playSetSong();
      reportPlaying();
    };
  }

  function barPlay(){
    if (playSong){
      reportPaused();
      currentSong.find('span').attr("class","glyphicon glyphicon-play");
      $("#play-button").find('span').attr("class","glyphicon glyphicon-play");
      playSong= false;
      pauseSetSong();
    }else{
      currentSong.find('span').attr("class","glyphicon glyphicon-pause");
      $("#play-button").find('span').attr("class","glyphicon glyphicon-pause");
      playSong= true;
      playSetSong();
      reportPlaying();
    }
  }

  function nextPlay(){
    if (currentSong.text()== $("#song-list li:last-child").text()){
      currentSong= $("#song-list li:first-child");
    }else{
      currentSong= currentSong.next();
    };
    $("#song-list").find('span').attr("class","glyphicon glyphicon-play");
    currentSong.find('span').attr("class","glyphicon glyphicon-pause");
    $("#play-button").find('span').attr("class","glyphicon glyphicon-pause");
    var songTitle = currentSong.find('.song-title').text();
    setSongInfo();
    setSongLink();
    playSetSong();
    reportPlaying();
  }

  function prevPlay(){
    if (audioElement.currentTime> 4){
      console.log(audioElement.currentTime);
      audioElement.currentTime = 0;
    }else{
    if (currentSong.text()== $("#song-list li:first-child").text()){
      currentSong= $("#song-list li:last-child");
    }else{
      currentSong= currentSong.prev();
    };
    $("#song-list").find('span').attr("class","glyphicon glyphicon-play");
    currentSong.find('span').attr("class","glyphicon glyphicon-pause");
    $("#play-button").find('span').attr("class","glyphicon glyphicon-pause");
    playSong= true;
    setSongInfo();
    setSongLink();
    playSetSong();
    reportPlaying();
    }
  }




  //end of doc ready
});
