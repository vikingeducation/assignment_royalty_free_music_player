$(document).ready(function() {

  let songIndex = 0;

  //listens for click on each song's play/pause button
  $(".play").each((idx, el) => {
    $(el).on("click", () => {
      if ($(el).attr("src") === "images/play_button.png") {
        $(el).attr("src", "images/pause.jpg");
        $("#playPause").attr("src", "images/pause.jpg");
        let newSong = $("audio").eq(idx).attr("src");
        songIndex = idx;
        if ($("#currentMusic").attr("src") !== newSong) {
          $("#currentMusic").attr("src", newSong);
        }
        $(".songTitle h2").eq(idx).addClass(".current");
        $("audio").get(5).play();
      } else {
        $(el).attr("src", "images/play_button.png");
        $("#playPause").attr("src", "images/play_button.png");
        $(".songTitle h2").eq(idx).removeClass(".current");
        $("audio").get(5).pause();
      }
    })
  })

  //listens for click on the footer play/pause button
  $("#playPause").on("click", () => {
    if ($("#playPause").attr("src") === "images/play_button.png") {
      $("#playPause").attr("src", "images/pause.jpg");
      $(".play").eq(songIndex).attr("src", "images/pause.jpg");
      $(".songTitle h2").eq(songIndex).addClass(".current");
      $("audio").get(5).play();
    } else {
      $("#playPause").attr("src", "images/play_button.png");
      $(".play").eq(songIndex).attr("src", "images/play_button.png");
      $(".songTitle h2").eq(songIndex).removeClass(".current");
      $("audio").get(5).pause();
    }
  });

  //listens for click on previous button
  $("#prev").on("click", () => {
    if ($("#playPause").attr("src") === "images/pause.jpg") {
      if (songIndex !== 0) {
        songIndex = songIndex - 1;
      } else {
        songIndex = 4;
      }
      let newSong = $("audio").eq(songIndex).attr("src");
      $("#currentMusic").attr("src", newSong);
      $("audio").get(5).play();
    }
  });

  //listens for click on next button
  $("#next").on("click", () => {
    if ($("#playPause").attr("src") === "images/pause.jpg") {
      if (songIndex !== 4) {
        songIndex = songIndex + 1;
      } else {
        songIndex = 0;
      }
      let newSong = $("audio").eq(songIndex).attr("src");
      $("#currentMusic").attr("src", newSong);
      $("audio").get(5).play();
    }
  });

  /*changeSong(title, artist, file) {
    $("#currentSong").text(title);
    $("#currentArtist").text(artist);
    $("audio").attr("src", `audio/${songFile}`);
  }*/


});
