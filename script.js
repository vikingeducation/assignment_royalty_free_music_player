//----------------------------- ROYALTY FREE MUSIC PLAYER PROJECT -------------------------------

// Author: Johann Baptista
// Contact: baptistajohann@gmail.com

// Date Started: Nov 7 2017
// Date Complete: Nov 9 2017

// ----------------------------------------------------------------------------------------------

// GLOBAL VARIABLES

let songnames = ["Audiobinger_-_Catching_Feelings.mp3", "Kadhja_Bonet_-_05_-_Miss_You.mp3", "Pipe_Choir_-_10_-_Gemini.mp3", "Caleb_Lemond_-_14_-_Life_Taught_Me.mp3", "Mystery_Mammal_-_08_-_Tip_Toe.mp3"];
const SONGS = [];

// GLOBAL UTILITY FUNCTIONS

let parseName = (songName) => {
  return songName.split('_-_').pop().split("_").join(" ").split(".mp3").join(" ");
}

let parseAuthor = (songName) => {
  return songName.split('_-_').shift().split("_").join(" ");
}

// CLASSES

class Song {
  constructor(file) {
    // Primary variables
    this.file = file;

    // Secondary variables
    this.title = parseName(file);
    this.author = parseAuthor(file);
    this.locator = this.title.split(" ").join("");
  }

  // Add the "current song div" to the player UI 
  addOption() {
    // Build current song info div
    let $songInfo = $('<div class = "songInfo"></div>');
    $songInfo
      .append($(`<h3>${this.title}</h3>`))
      .append($(`<h3>${this.author}</h3>`));
    
    // Build primary current song div with current song info div inside
    let $songDiv = $('<div></div>', {'id':`${this.locator}`, 'class':`songDiv ${this.locator}`})
    $songDiv
      .append($('<img></img>', {"src":"images/play_button_simple_2.png", 'class':'simpleButton'}))
      .append($songInfo);
    
    // Append current song div to DOM, inside songs container
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

  // State Getters

  // Internals
  atEndOfList() {
    return this.songidx === SONGS.length-1;
  }
  atStartOfList() {
    return this.songidx === 0;
  }
  
  // UX
  playerPaused() {
    return $('audio').get(0).paused;
  }

  // State Setters 

  // Internals
  setSongIdx(songidx) {
    this.songidx = songidx;
  }
  setSong(song) {
    this.song = song;
  }
 
  // UX
  playAudio() {
    $('audio').get(0).play();
  }
  playAudioButton() {
    $('#playBackButton').attr("src", "images/pause.jpg");
  }
  pauseAudioButton() {
    $('#playBackButton').attr("src", "images/play_button.png");
  }
  pauseAudio() {
    $('audio').get(0).pause();
  }
  colorCurrentSong(color) {
    $(`#${this.song.locator}`).css("background-color", color);
  }
  changePlayerTitle(title) {
    $('#currentSong').text(title);
  }
  changePlayerAuthor(author) {
    $('#currentAuthor').text(author);
  }
  changePlayerAudio(file) {
    $('audio').attr("src", `audio/${file}`);
  }

  // Higher level functions

  changeSong(songidx) {
    this.setSongIdx(songidx);
    this.setSong(SONGS[songidx]);

    this.changePlayerTitle(this.song.title);
    this.changePlayerAudio(this.song.file);   
    this.changePlayerAuthor(this.song.author);
  }

  togglePlayer() {
    if (this.playerPaused()) {
      this.playAudio();     
      this.playAudioButton();
    } else {
      this.pauseAudio();
      this.pauseAudioButton();
    }
  }

  moveUpOneSong() {
    this.colorCurrentSong("white");
    if (this.atStartOfList()) {
      this.changeSong(SONGS.length-1);
    } else {
      this.changeSong(this.songidx - 1);
    }
    this.colorCurrentSong("red");
  }

  moveDownOneSong() {
    this.colorCurrentSong("white");
    if (this.atEndOfList()) {
      this.changeSong(0);
    } else {
      this.changeSong(this.songidx + 1);
    }
    this.colorCurrentSong("red");
  }

  setUpPlayer(songidx) {

    // Set internals
    this.setSongIdx(songidx);
    this.setSong(SONGS[songidx]);

    // Set UX
    this.colorCurrentSong("red");
    this.changePlayerAudio(this.song.file);
    this.changePlayerTitle(this.song.title);    
    this.changePlayerAuthor(this.song.author);

    // Set click handlers
    $('#playBackButton').on("click", () => {
      this.togglePlayer();
    })
    $('#backButton').on("click", () => {
      if (!this.playerPaused()) {
        this.moveUpOneSong();  
        this.playAudio(); 
      } else {
        this.moveUpOneSong();
      }
    })
    $('#forwardButton').on("click", () => {
      if (!this.playerPaused()) {
        this.moveDownOneSong();
        this.playAudio();
      } else {
        this.moveDownOneSong();
      }
    })
    $('#songs').children().each((idx, el) => { 
      $(el).on("click", () => {
        this.colorCurrentSong("white");
        this.changeSong(idx);
        this.playAudio();
        this.playAudioButton();
        this.colorCurrentSong("red");
      });
    });
  }
}

// SCRIPT

$(document).ready(function() {

  // Populate SONGS array with Song objects
  for (let i = 0; i < songnames.length; i++) {
    let file = songnames[i];
    let newSong = new Song(file);
    SONGS.push(newSong);

    newSong.addOption();
  }

  let RFMplayer = new SongManager();
  RFMplayer.setUpPlayer(0);
 
});
