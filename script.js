SONGS = ["Audiobinger_-_Catching_Feelings.mp3", "Kadhja_Bonet_-_05_-_Miss_You.mp3", " Pipe_Choir_-_10_-_Gemini.mp3", "Caleb_Lemond_-_14_-_Life_Taught_Me.mp3", " Mystery_Mammal_-_08_-_Tip_Toe.mp3"];

class Song {
  constructor(title, author, file) {
    this.title = title;
    this.author = author;
    this.file = file;
  }
  
  addOption() {
    let $songInfo = $('<div></div>');
    $songInfo
      .attr("class", "songInfo")
      .append($(`<h3>${this.title}</h3>`))
      .append($(`<h3>${this.author}</h3>`));
    
    let $songDiv = $('<div></div>', {'id':`${this.title}`, 'class':'songDiv'})
    $songDiv
      .append($('<img></img>', {"src":"images/play_button_simple_2.png", 'class':'simpleButton'}))
      .append($songInfo);
    
    $songDiv.appendTo($('#songs'));
  }
}

let parseSong = (songName) => {
  // a little messy but works
  let songarr = songName.split('_-_');
  let name = songarr[songarr.length-1], author = songarr[0];
  return [name.split("_").join(" ").split(".mp3").join(" "), author.split("_").join(" ")]
}

$(document).ready(function() {

  for (let i = 0; i < SONGS.length; i++) {
    let songarr = parseSong(SONGS[i]);
    let song = new Song(songarr[0], songarr[1]);
    song.addOption();
  }
 
});
