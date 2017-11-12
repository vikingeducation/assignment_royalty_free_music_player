let sectionArray,
    sectionArray;

$(document).ready(function() {
  sectionArray = $("section");
  audioArray = $("audio");

  //for(i = 0; i < sectionArray.length; i++) {
  //  $(sectionArray[i].play).on

  $(".play").on("click", function () {

  });

  changeSong(title, artist, file) {
    $("#currentSong").text(title);
    $("#currentArtist").text(artist);
    $("audio").attr("src", `audio/${songFile}`);
  }


});
