

//SONG IMAGE[i].on("click", if paused, CHANGEIMAGE SRC, CHANGE NP INFO, CHANGE FOOTER PLAYPAUSE, CHANGE CLASS)

//SONG IMAGE[i].on("click", if playing, CHANGEIMAGE SRC, CHANGE FOOTER PLAYPAUSE, CHANGE CLASS)

//FOOTER IMAGE.on("click", if paused, CHANGEIMAGE SRC, PLAY SELECTED)

$(document).ready(function() {

var i = 0;

var q = {
  nowPlaying: $(".playing-now"),
  nowPlayingSong: $(".playing-now audio"),
  allSongs: $(".song"),
  songControl: $(".song img"),
  mainControl: $(".pause-play"),
  rewind: $(".rewind"),
  fastF: $(".fast-forward"),
  jumboSong: $(".np-song-title"),
  jumboArtist: $(".np-song-artist"),
}

var v = {
  pause: "pause.png",
  play: "play.png"
}

var f = {
  playImage: function(){
    q.allSongs.children("img").attr("src", v.play);
    q.nowPlaying= $(".playing-now");
    q.nowPlaying.children("img").attr("src", v.play);
    q.mainControl.attr("src", v.play);
  },
  pauseImage: function(){
    q.allSongs.children("img").attr("src", v.play);
    q.nowPlaying= $(".playing-now");
    q.nowPlaying.children("img").attr("src", v.pause);
    q.mainControl.attr("src", v.pause);
  },
  playImageBig: function(){
    q.nowPlaying= $(".playing-now");
    q.nowPlaying.children("img").attr("src", v.play);
    q.mainControl.attr("src", v.play);
  },
  pauseImageBig: function(){
    q.nowPlaying= $(".playing-now");
    q.nowPlaying.children("img").attr("src", v.pause);
    q.mainControl.attr("src", v.pause);
  },
  playSong: function(){
    q.nowPlayingSong = $(".playing-now audio");
    q.nowPlayingSong.get(0).play();
  },
  pauseSong: function(){
    q.nowPlayingSong = $(".playing-now audio");
    q.nowPlayingSong.get(0).pause();
  },
  changeNowPlaying: function(event){
    q.allSongs.removeClass("playing-now");
    $(event.target).parent().addClass("playing-now");
    q.nowPlaying = $(".playing-now");
    q.jumboSong.text(q.nowPlaying.children("div").children().first().html());
    q.jumboArtist.text(q.nowPlaying.children("div").children().last().html());
  },
  previousSong: function() {
    f.pauseSong();
    q.nowPlaying = $(".playing-now");
    q.nowPlayingSong.get(0).currentTime = 0;
    q.allSongs.removeClass("playing-now");
    q.nowPlaying.prev().addClass("playing-now");
    q.nowPlaying = $(".playing-now");
    q.jumboSong.text(q.nowPlaying.children("div").children().first().html());
    q.jumboArtist.text(q.nowPlaying.children("div").children().last().html());
    if(q.mainControl.attr("src") === v.pause) {
      f.playSong();
      f.pauseImage();
    }
    else {
      f.playImage();
      f.playImageBig();
    }
  },
  nextSong: function() {
    f.pauseSong();
    q.nowPlaying = $(".playing-now");
    q.nowPlayingSong.get(0).currentTime = 0;
    q.allSongs.removeClass("playing-now");
    q.nowPlaying.next().addClass("playing-now");
    q.nowPlaying = $(".playing-now");
    q.jumboSong.text(q.nowPlaying.children("div").children().first().html());
    q.jumboArtist.text(q.nowPlaying.children("div").children().last().html());
    if(q.mainControl.attr("src") === v.pause) {
      f.playSong();
      f.pauseImage();
    }
    else {
      f.playImage();
      f.playImageBig();
    }
  }

}

f.playImageBig();

q.songControl.on("click", function(event) {
  event.stopPropagation();
  if (q.mainControl.attr("src")===v.play) {
    f.changeNowPlaying(event);
    f.playSong();
    f.pauseImage();
  }
  else {
    f.pauseSong();
    f.playImage();
    f.playImageBig();
  }
});
q.mainControl.on("click", function() {
  if (q.mainControl.attr("src")===v.pause) {
    f.pauseSong(); f.playImageBig();
  } else {
    f.playSong(); f.pauseImageBig();
  }});
q.rewind.on("click", function() {
  q.nowPlaying = $(".playing-now");
  if (q.nowPlaying.prev().length > 0) {
    f.previousSong();
  }
});
q.fastF.on("click", function() {
  q.nowPlaying = $(".playing-now");
  if (q.nowPlaying.next().length > 0) {
    f.nextSong();
  }
});





});
