$(document).ready(function() {

  //listens for click on each song's play/pause button
  $(".play").each((idx, el) => {
    $(el).on("click", () => {
      if ($(el).attr("src") === "images/play_button.png") {
        $(el).attr("src", "images/pause.jpg");
        $("audio").get(idx).play();
      } else {
        $(el).attr("src", "images/play_button.png");
        $("audio").get(idx).pause();
      }
    })
  })

  //listens for click on the footer play/pause button
  $("#playPause").on("click", () => {
    if ($("#playPause").attr("src") === "images/play_button.png") {
      $("#playPause").attr("src", "images/pause.jpg");
      $("audio").get(5).play();
    } else {
      $("#playPause").attr("src", "images/play_button.png");
      $("audio").get(5).pause();
    }
  });

  /*changeSong(title, artist, file) {
    $("#currentSong").text(title);
    $("#currentArtist").text(artist);
    $("audio").attr("src", `audio/${songFile}`);
  }*/


});
