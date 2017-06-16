musicControllerOptionHandlers = {
  previousTrackHandler: function(){
    let currTrackNum = findCurrTrackNum();
    let lastTrackNum = findLastTrackNum();

    if(currTrackNum == 0){
      switch2Track(lastTrackNum);
    } else {
      switch2Track(currTrackNum - 1);
    }
  },

  nextTrackHandler: function(){
    let currTrackNum = findCurrTrackNum();
    let lastTrackNum = findLastTrackNum();

    if(currTrackNum == lastTrackNum){
      switch2Track(0);
    } else {
      switch2Track(currTrackNum + 1);
    }
  },

  // make change for hitting pause and play
  mainPlayStateHandler: function(){
    let playingState = $(".trackOptions").attr("playing");

    if(playingState === "true"){
      // Change state of trackOptions to not playing and change image to play
      $(".trackOptions").attr("playing", "false");
      $(".trackOptions .mainState").attr("src", "./assets/images/bottomPlayButton.png");

      // Find currentTrack and set pause to play
      let currTrackNum = findCurrTrackNum();
      $(".track" + currTrackNum + " img.buttonState").attr("src", "./assets/images/playButtonInd.png");
    } else {
      // Change state of trackOptions to playing and change image to pause
      $(".trackOptions").attr("playing", "true");
      $(".trackOptions .mainState").attr("src", "./assets/images/bottomPauseButton.png");

      // Find currentTrack and set play to pause
      let currTrackNum = findCurrTrackNum();
      $(".track" + currTrackNum + " img.buttonState").attr("src", "./assets/images/stopButton.png");
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

function switch2Track(trackNum){

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
}



$(document).ready(function() {

  // assign track numbers to each respective music track
  $("article").each(function(key, value){
    //console.log("track" + key);
    $(this).addClass("track" + key);
  });

  $(".previousTrack").on("click", musicControllerOptionHandlers.previousTrackHandler);

  $(".nextTrack").on("click", musicControllerOptionHandlers.nextTrackHandler);

  $(".trackOptions .mainState").on("click", musicControllerOptionHandlers.mainPlayStateHandler);

});
