$(document).ready(function() {
  var $songs = $("a", "main");
  var $playing = $(".glyphicon-pause");
  var $currentSong = $(".media-body", "footer");
  var $playButton = $($("span", "footer")[1]);

  function changeIcons($e) {
    $playing.removeClass("glyphicon-pause");
    $playing.addClass("glyphicon-triangle-right");
    $e.removeClass("glyphicon-triangle-right");
    $e.addClass("glyphicon-pause");
    $playing = $e;
    $playButton.removeClass("glyphicon-triangle-right");
    $playButton.addClass("glyphicon-pause");
  }
  function changeCurrentSong($e) {
    var songName = $($e[0].children[0]).text();
    var artistName = $($e[0].children[1]).text();
    $($currentSong[0].children[0]).text(songName);
    $($currentSong[0].children[1]).text(artistName);
  }
  function songHasBeenSelected() {
    changeIcons($(this.children[0]));
    changeCurrentSong($($($(this)[0].parentNode)[0].nextElementSibling));
  }

  $songs.on("click", songHasBeenSelected);
});
