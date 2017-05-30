// List of available music
var musicList = [
  "assets/music/a.mp3",
  "assets/music/b.mp3",
  "assets/music/c.mp3",
  "assets/music/d.mp3"];

/*  create elements to display song information
    this includes a button that will be used to
    play and pause the song, it will also hold the
    song name and artist */
for( var i = 0; i < musicList.length; i++) {
  var songBox = document.createElement("div");
  songBox.setAttribute("class", "song-box");
  var songBoxControls = document.createElement("div");
  songBoxControls.setAttribute("class", "song-box-controls");
  var songBoxDetails = document.createElement("div");
  songBoxDetails.setAttribute("class", "song-box-details");

  var section = document.getElementById("main");
  section.append(songBox);
  songBox.append(songBoxControls);
  songBox.append(songBoxDetails);
}
