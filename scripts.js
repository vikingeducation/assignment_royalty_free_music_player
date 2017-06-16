musicControllerOptionHandlers = {
  previousTrackHandler: function(audio){
    let currTrackNum = findCurrTrackNum();
    let lastTrackNum = findLastTrackNum();

    if(currTrackNum == 0){
      switch2Track(lastTrackNum, audio);
    } else {
      switch2Track(currTrackNum - 1, audio);
    }
  },

  nextTrackHandler: function(audio){
    let currTrackNum = findCurrTrackNum();
    let lastTrackNum = findLastTrackNum();

    if(currTrackNum == lastTrackNum){
      switch2Track(0, audio);
    } else {
      switch2Track(currTrackNum + 1, audio);
    }
  },

  // make change for hitting pause and play
  mainPlayStateHandler: function(audio){
    let playingState = $(".trackOptions").attr("playing");

    if(playingState === "true"){
      pauseTrack(audio);

    } else {
      playTrack(audio);
    }
  },

  switchSongsHandler: function(eventObj, audio){
    let newTrack = $(eventObj.target).parent().attr("class");
    if(newTrack == $(".trackOptions").attr("trackNum")){
      // Not switching tracks, actually just want to pause or play
      if($(".trackOptions").attr("playing") === "true"){
        pauseTrack(audio);
      } else {
        playTrack(audio);
      }

    } else {
      switch2Track(parseInt(newTrack[newTrack.length - 1]), audio);
      playTrack(audio);

    }
  }
}

function findCurrTrackNum(){
  let currTrack = $(".trackOptions").attr("trackNum");
  return (parseInt(currTrack[currTrack.length - 1]));
}

function findLastTrackNum(){
  let lastTrack = $("article").last().attr("class");
  return (parseInt(lastTrack[lastTrack.length - 1]));
}

function pauseTrack(audio){
  $(".trackOptions").attr("playing", "false");
  $(".trackOptions .mainState").attr("src", "./assets/images/bottomPlayButton.png");

  // Find currentTrack and set pause to play button
  let currTrackNum = findCurrTrackNum();
  $(".track" + currTrackNum + " img.buttonState").attr("src", "./assets/images/playButtonInd.png");

  // PAUSE DAT AUDIO!!!
  audio.pause();
}

function playTrack(audio) {
  // Change state of trackOptions to playing and change image to pause
  $(".trackOptions").attr("playing", "true");
  $(".trackOptions .mainState").attr("src", "./assets/images/bottomPauseButton.png");

  // Find currentTrack and set play to pause
  let currTrackNum = findCurrTrackNum();
  $(".track" + currTrackNum + " img.buttonState").attr("src", "./assets/images/stopButton.png");

  // PLAY DAT AUDIO!!!!
  audio.play();
}

function switch2Track(trackNum, audio){

  // Get previous track class and playing state
  let prevTrack = $(".trackOptions").attr("trackNum");
  let prevTrackState = $(".trackOptions").attr("playing");

  // Stop playing this track
  // FOR NOW: replace the image of pause with playbutton
  $("." + prevTrack + " img.buttonState").attr("src", "./assets/images/playButtonInd.png");

  // Obtain track info from new track
  let trackClass = ".track" + trackNum;
  let songTitle = $(trackClass + " h2").text();
  let songArtist = $(trackClass + " h3").text();
  let songState = $(".trackOptions").attr("playing");

  // Set image of new play state to state of previous track
  if(songState === "true"){
    $("article" + trackClass + " img").attr("src", "./assets/images/stopButton.png");
  }

  // Change the bottom info of song title and artist
  $(".trackOptions").attr("trackNum", "track" + trackNum);
  $(".songInfoBottom h2").text(songTitle);
  $(".songInfoBottom h3").text(songArtist);

  // Now we switch the audio and audio state
  audio.src = $(trackClass + " audio source").attr("src");
  if(songState === "true"){
    audio.play();
  }
}





$(document).ready(function() {

  // assign track numbers to each respective music track
  $("article").each(function(key, value){
    $(this).addClass("track" + key);
  });

  let audio = new Audio($(".track0 audio source").attr("src"));

  $(".previousTrack").on("click", function() {
    musicControllerOptionHandlers.previousTrackHandler(audio);
  });

  $(".nextTrack").on("click", function() {
    musicControllerOptionHandlers.nextTrackHandler(audio);
  });

  $(".trackOptions .mainState").on("click", function() {
    musicControllerOptionHandlers.mainPlayStateHandler(audio);
  });

  $(".buttonState").on("click", function(eventObj){
    musicControllerOptionHandlers.switchSongsHandler(eventObj, audio);
  });

});
