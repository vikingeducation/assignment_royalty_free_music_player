$(document).ready(function() {
  var $songs = $("a", "main");
  var $playing = $(".glyphicon-pause");
  var $currentSong = $(".media-body", "footer");
  var $playButton = $($("span", "footer")[1]);
  var $skipForward = $($("span", "footer")[2]);
  var $skipBack = $($("span", "footer")[0]);
  var $resetDefault = $playButton;
  var $songSources = $("audio");
  var $currAudio = $songSources.get(0);

  function checkSelectionIsCurrentSong($e) {
    var currSongText = $($currentSong[0].children[0]).text();
    var currArtText = $($currentSong[0].children[1]).text();
    var newSongName = $($e[0].children[0]).text();
    var newArtistName = $($e[0].children[1]).text();
    if (currSongText === newSongName && currArtText === newArtistName) {
      return true;
    } else {
      return false;
    }
  }
  function changeCurrentIcon($e) {
    $e.toggleClass("glyphicon-triangle-right glyphicon-pause");
    $playButton.toggleClass("glyphicon-triangle-right glyphicon-pause");
    if ($e[0].className === "glyphicon glyphicon-triangle-right") {
      $playing = $resetDefault;
    } else {
      $playing = $e;
    }
  }
  function toggleSongState($e) {
    var song = $($($e).next().children("audio")).get(0);
    if (song.paused) {
      song.play();
    } else {
      song.pause();
    }
  }

  function playSong($e) {
    $currAudio = $($($e).next().children("audio")).get(0);
    $currAudio.play();
  }

  function changeIcons($e) {
    $playing.toggleClass("glyphicon-triangle-right glyphicon-pause");
    $e.toggleClass("glyphicon-triangle-right glyphicon-pause");
    console.log($currAudio.paused);
    if ($currAudio.paused) {
      $playButton.removeClass("glyphicon-triangle-right");
      $playButton.addClass("glyphicon-pause");
    }
    $playing = $e;
  }
  function changeCurrentSong($e) {
    var songName = $($e[0].children[0]).text();
    var artistName = $($e[0].children[1]).text();
    $($currentSong[0].children[0]).text(songName);
    $($currentSong[0].children[1]).text(artistName);
  }
  function songHasBeenSelected() {
    if (
      checkSelectionIsCurrentSong(
        $($($(this)[0].parentNode)[0].nextElementSibling)
      )
    ) {
      changeCurrentIcon($(this.children[0]));
      toggleSongState($($(this)[0].parentNode)[0]);
    } else {
      changeIcons($(this.children[0]));
      $currAudio.pause();
      playSong($($(this)[0].parentNode)[0]);
      changeCurrentSong($($($(this)[0].parentNode)[0].nextElementSibling));
    }
  }

  function changeListIcon() {
    $($($currAudio)[0].parentNode)
      .prev()
      .children()
      .children()
      .toggleClass("glyphicon-triangle-right glyphicon-pause");
  }
  function playbuttonFunction() {
    var $check = $("#needs-to-check");
    if ($check.text() === "Artist") {
      return;
    } else if ($currAudio.paused) {
      $currAudio.play();
    } else {
      $currAudio.pause();
    }
    changeListIcon();
    $playButton.toggleClass("glyphicon-triangle-right glyphicon-pause");
  }

  function nextSong() {
    var $toTheNext = $($currAudio)
      .parent()
      .parent()
      .next()
      .children()
      .first()
      .children()
      .first();
    console.log($($toTheNext));
    changeIcons($toTheNext.children());
    $currAudio.pause();
    playSong($($toTheNext[0].parentNode)[0]);
    changeCurrentSong($($($($toTheNext)[0].parentNode)[0].nextElementSibling));
  }
  function prevSong() {
    var $toTheNext = $($currAudio)
      .parent()
      .parent()
      .prev()
      .children()
      .first()
      .children()
      .first();
    console.log($($toTheNext));
    changeIcons($toTheNext.children());
    $currAudio.pause();
    playSong($($toTheNext[0].parentNode)[0]);
    changeCurrentSong($($($($toTheNext)[0].parentNode)[0].nextElementSibling));
  }

  $songs.on("click", songHasBeenSelected);
  $playButton.on("click", playbuttonFunction);
  $skipForward.on("click", nextSong);
  $skipBack.on("click", prevSong);
});
