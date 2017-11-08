let songnames = ["Audiobinger_-_Catching_Feelings.mp3", "Kadhja_Bonet_-_05_-_Miss_You.mp3", "Pipe_Choir_-_10_-_Gemini.mp3", "Caleb_Lemond_-_14_-_Life_Taught_Me.mp3", "Mystery_Mammal_-_08_-_Tip_Toe.mp3"];
const SONGS = [];

class Song {
  constructor(title, author, file) {
    this.title = title;
    this.author = author;
    this.file = file;
    this.locator = title.split(" ").join("");
  }
  
  addOption() {
    let $songInfo = $('<div class = "songInfo"></div>');
    $songInfo
      .append($(`<h3>${this.title}</h3>`))
      .append($(`<h3>${this.author}</h3>`));
    
    let $songDiv = $('<div></div>', {'id':`${this.locator}`, 'class':`songDiv ${this.locator}`})
    $songDiv
      .append($('<img></img>', {"src":"images/play_button_simple_2.png", 'class':'simpleButton'}))
      .append($songInfo);
    
    $songDiv.appendTo($('#songs'));
  }
}

class SongManager {
  constructor() {
    // Primary variables
    this.songidx;

    // Secondary variabes
    this.song;
  }

  changeSong(songidx) {
    this.songidx = songidx;
    this.song = SONGS[songidx];

    $('audio').attr("src", `audio/${this.song.file}`);   
    $('#currentSong').text(`${this.song.title}`);
    $('#currentAuthor').text(`${this.song.author}`);
  }

  colorCurrentSong(color) {
    $(`#${this.song.locator}`).css("background-color", color);
  }

  togglePlayer(player) {
    if (player.paused) {
      player.play();     
      $('#playback').attr("src", "images/pause.jpg");
    } else {
      player.pause();
      $('#playback').attr("src", "images/play_button.png");
    }
  }

  moveUpOneSong() {
    this.colorCurrentSong("white");
    if (this.songidx === 0) {
      this.changeSong(SONGS.length-1);
    } else {
      this.changeSong(this.songidx - 1);
    }
    this.colorCurrentSong("red");
  }

  moveDownOneSong() {
    this.colorCurrentSong("white");
    if (this.songidx === SONGS.length-1) {
      this.changeSong(0);
    } else {
      console.log(this.songidx + 1);
      this.changeSong(this.songidx + 1);
    }
    this.colorCurrentSong("red");
  }

  setUpPlayer(songidx) {
    this.songidx = songidx;
    this.song = SONGS[songidx];
    $(`#${this.song.locator}`).css("background-color", "red");

    let $player = $('<audio></audio>');
    $player.attr("src", `audio/${this.song.file}`);
    $player.appendTo($('#footer'));
 
    $('#currentSong').text(`${this.song.title}`);
    $('#currentAuthor').text(`${this.song.author}`);

    let player = $('audio').get(0);

    $('#playback').on("click", () => {
      this.togglePlayer(player);
    })
    
    $('#back').on("click", () => {
      if (!player.paused) {
        this.moveUpOneSong();  
        player.play();       
      } else {
        this.moveUpOneSong();
      }
    })

    $('#skip').on("click", () => {
      if (!player.paused) {
        this.moveDownOneSong();
        player.play();
      } else {
        this.moveDownOneSong();
      }
    })

    $('#songs').children().each((idx, el) => { 
      $(el).on("click", () => {
        this.colorCurrentSong("white");
        let locator = $(el).get(0).classList[1];
        // okay, this is pretty hacky...
        let songnum = [0,1,2,3,4].filter((song) => {return SONGS[song].locator === locator})[0];
        this.changeSong(songnum);
        player.play();
        $('#playback').attr("src", "images/pause.jpg");
        this.colorCurrentSong("red");
      });
    });

  }
}

let parseSong = (songName) => {
  // a little messy but works
  let songarr = songName.split('_-_');
  let name = songarr[songarr.length-1], 
      author = songarr[0];
  return [name.split("_").join(" ").split(".mp3").join(" "), author.split("_").join(" ")]
}

$(document).ready(function() {

  for (let i = 0; i < songnames.length; i++) {
    let songarr = parseSong(songnames[i]);
    let newSong = new Song(songarr[0], songarr[1], songnames[i]);
    SONGS.push(newSong);
    newSong.addOption();
  }

  let RFMplayer = new SongManager();
  RFMplayer.setUpPlayer(0);
 
});
