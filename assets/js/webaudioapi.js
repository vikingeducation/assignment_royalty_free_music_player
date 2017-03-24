//Crete an audio context (object to create other objects)
window.onload = function () {
  var context = new AudioContext || new webkitAudioContext,
      request = new XMLHttpRequest(); //loads audio into the context

  request.open("GET", "/assets/media/rfm.mp3", true); //loads soundfile
  
  //makes sure that the data comes in in the format we need
  request.responseType = "arraybuffer";

  //tells us when the request has loaded the data 
  request.onload = function() { 
    
    //audio data is in the request.response property
    context.decodeAudioData(request.response, onDecoded); //first gets raw audio data, then sets a callback handler for when processing is complete
  }

  function onDecoded(buffer) {
    var bufferSource = context.createBufferSource(); //plays back what is in the buffer
    bufferSource.buffer = buffer;

    //creates a node connecting the buffer to the speakers
    bufferSource.connect(context.destination); 

    bufferSource.start(); //begins playback from the buffer

  }

  // request.send();
  

};
//control bar:
//play button press
//LISTENER AND CALLBACK FUNCTION
//hits a listener that resumes play on the paused buffer
//CSS CHANGE
//play button press switches off its button display and turns on the pause button display
//JQUERY
//sets id to playing

//pause button press
//LISTENER AND CALLBACK FUNCTION
//pause button pauses the song at a point in the buffer,
//CSS CHANGE
//toggles its display off and the play button display on
//JQUERY
//sets the id to paused

//next button press
//LISTENER AND ANONYMOUS CALLBACK FUNCTION 
//link next song to load with the next child in the html
//send that song to the buffer
//DEFINED FUNCTION CONTAINED IN ABOVE ANONYMOUS CALLBACK
//send the song data to the control bar display


//WRITE FUNCTION
//to populate the status bar, I need a function that will be called whenever I 
//load something new into the buffer


//window:

//play button press
//LISTENER AND ANONYMOUS CALLBACK FUNCTION
//on click, if id == paused, play from buffer marker
//if id == stopped, 
//call stop play function on currently playing or paused song
//then load new song and set current song-bar class to playing


//WRITE FUNCTION TO
//pass url into request.open


//WRITE FUNCTION TO
//stop playback on currently playing or paused content and set that song windows class to stopped

//LATER
//setter to iteratively create song bars in the window based on the provided library on load
//possibly use clone on song-bar as a default convention, navigate and populate, then appendTo the container to a max of 7 iterations
