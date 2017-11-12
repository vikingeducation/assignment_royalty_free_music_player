$(document).ready(function() {

  let songIndex = 0;

  //listens for click on each song's play/pause button
  $(".play").each((idx, el) => {
    $(el).on("click", () => {
      if ($(el).attr("src") === "images/play_button.png") {
        for (i = 1; i <= 5; i++) {
          $("img").eq(i).attr("src", "images/play_button.png");
          $("h2").eq(i - 1).removeClass("current");
        }
        $(el).attr("src", "images/pause.jpg");
        $("#playPause").attr("src", "images/pause.jpg");
        let newSong = $("audio").eq(idx).attr("src");
        songIndex = idx;
        if ($("#currentMusic").attr("src") !== newSong) {
          $("#currentMusic").attr("src", newSong);
        }
        $("h2").eq(idx).addClass("current");
        $("audio").get(5).play();
        let songName = $("h2").eq(idx).text();
        let artistName = $("p").eq(idx).text();
        $("h2").eq(5).text(songName);
        $("p").eq(5).text(artistName);
        /*let songName = $("h2").eq(idx).text;
        let artistName = $("p").eq(idx).text;
        console.log(songName);
        $("h2").eq(5).text(songName);
        $("h2").eq(5).text(artistName);*/
      } else {
        $(el).attr("src", "images/play_button.png");
        $("#playPause").attr("src", "images/play_button.png");
        $("h2").eq(idx).removeClass("current");
        $("audio").get(5).pause();
      }
    })
  })

  //listens for click on the footer play/pause button
  $("#playPause").on("click", () => {
    if ($("#playPause").attr("src") === "images/play_button.png") {
      $("#playPause").attr("src", "images/pause.jpg");
      $(".play").eq(songIndex).attr("src", "images/pause.jpg");
      $("h2").eq(songIndex).addClass("current");
      $("audio").get(5).play();
    } else {
      $("#playPause").attr("src", "images/play_button.png");
      $(".play").eq(songIndex).attr("src", "images/play_button.png");
      $("h2").eq(songIndex).removeClass("current");
      $("audio").get(5).pause();
    }
  });

  //listens for click on previous button
  $("#prev").on("click", () => {
    for (i = 1; i <= 5; i++) {
      $("img").eq(i).attr("src", "images/play_button.png");
      $("h2").eq(i - 1).removeClass("current");
    }
    if ($("#playPause").attr("src") === "images/pause.jpg") {
      if (songIndex !== 0) {
        songIndex = songIndex - 1;
      } else {
        songIndex = 4;
      }
      let newSong = $("audio").eq(songIndex).attr("src");
      $("#currentMusic").attr("src", newSong);
      $("audio").get(5).play();
      $(".play").eq(songIndex).attr("src", "images/pause.jpg");
      $("h2").eq(songIndex).addClass("current");
      let songName = $("h2").eq(songIndex).text();
      let artistName = $("p").eq(songIndex).text();
      $("h2").eq(5).text(songName);
      $("p").eq(5).text(artistName);
    }
  });

  //listens for click on next button
  $("#next").on("click", () => {
    for (i = 1; i <= 5; i++) {
      $("img").eq(i).attr("src", "images/play_button.png");
      $("h2").eq(i - 1).removeClass("current");
    }
    if ($("#playPause").attr("src") === "images/pause.jpg") {
      if (songIndex !== 4) {
        songIndex = songIndex + 1;
      } else {
        songIndex = 0;
      }
      let newSong = $("audio").eq(songIndex).attr("src");
      $("#currentMusic").attr("src", newSong);
      $("audio").get(5).play();
      $(".play").eq(songIndex).attr("src", "images/pause.jpg");
      $("h2").eq(songIndex).addClass("current");
      let songName = $("h2").eq(songIndex).text();
      let artistName = $("p").eq(songIndex).text();
      $("h2").eq(5).text(songName);
      $("p").eq(5).text(artistName);
    }
  });

});
