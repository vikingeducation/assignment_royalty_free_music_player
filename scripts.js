// FILL IN THE FUNCTIONS BELOW
currentTrackAudio = "Lupe Fiasco - Kick Push.mp3";
currentTrackText = "Lupe Fiasco - Kick Push";
lastTrackText = "";
musicPlaying = false;
songs = ["Lupe Fiasco - Kick Push","Suicide - Ghost Rider","Janelle Monae feat. Miguel - Primetime"]
trackNumber = 0

var SongOver = function()
{
document.getElementById("MainPlayButton").src="PlayButton.png";
}
var FindSongIndex = function(songSelected)
{

}
var TrackSkip = function(fwdOrBack)
{
trackNumber += fwdOrBack;
if(trackNumber > songs.length - 1){trackNumber = 0;}
if(trackNumber < 0){trackNumber = songs.length - 1;}
lastTrackText = currentTrackText;
document.getElementById("LastPlayed").textContent = lastTrackText;
currentTrackAudio = songs[trackNumber] + ".mp3";
currentTrackText = songs[trackNumber];
document.getElementById("currentTrackText").textContent = currentTrackText;
audioPlayer = document.getElementById("currentTrackAudio");
audioPlayer.src = currentTrackAudio;
musicPlaying = true;
audioPlayer.play();
}

var PlayThisTrack =  function(thisTrack){
  if(thisTrack.textContent != currentTrackText)
  {
currentTrackAudio = thisTrack.textContent + ".mp3";

audioPlayer = document.getElementById("currentTrackAudio");
audioPlayer.src = currentTrackAudio;

lastTrackText = currentTrackText;


currentTrackText = thisTrack.textContent;
document.getElementById("currentTrackText").textContent = currentTrackText;
trackNumber = songs.indexOf(currentTrackText);
document.getElementById("LastPlayed").textContent = lastTrackText;

if(musicPlaying === true){

audioPlayer.play();
}
else{
audioPlayer.pause();
}
}
}


var PlayToggle =  function(){
  audioPlayer = document.getElementById("currentTrackAudio");

if(musicPlaying === true){musicPlaying = false;
audioPlayer.pause();
document.getElementById("MainPlayButton").src="PlayButton.png";
}
else{musicPlaying = true;
audioPlayer.play();
document.getElementById("MainPlayButton").src="PauseButton.png";
}


}
