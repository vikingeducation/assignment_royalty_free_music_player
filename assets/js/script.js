$(document).ready(function() {

  $("audio").trigger("load");

  $(".play-pause").on("click", function() {
    let $target = $(this);
    let $audio = $target.parent().next("audio");
    loadTrack($target);

    if ($target.hasClass("active") && $target.hasClass("glyphicon-play")) {
      $target.removeClass("glyphicon-play").addClass("glyphicon-pause");
      $(".footer-play-pause").removeClass("glyphicon-play").addClass("glyphicon-pause");
      $audio.trigger("play");
    } else if ($target.hasClass("active") && $target.hasClass("glyphicon-pause")) {
      $target.removeClass("glyphicon-pause").addClass("glyphicon-play");
      $(".footer-play-pause").removeClass("glyphicon-pause").addClass("glyphicon-play");
      $audio.trigger("pause");
    } else {
      toggleOtherTrack($target, $audio);
    };
  });

  $(".footer-play-pause").on("click", function() {
    let $target = $(this);
    let $audio = $(".active").parent().next("audio");

    if ($target.hasClass("glyphicon-play")) {
      $target.removeClass("glyphicon-play").addClass("glyphicon-pause");
      $(".active").removeClass("glyphicon-play").addClass("glyphicon-pause");
      $audio.trigger("play");
    } else {
      $target.removeClass("glyphicon-pause").addClass("glyphicon-play");
      $(".active").removeClass("glyphicon-pause").addClass("glyphicon-play");
      $audio.trigger("pause");
    };
  });

  $(".footer-previous").on("click", function() {
    let $currentIndex = $(".play-pause").index($(".active"));
    let $target;
    let $audio;

    if ($currentIndex === 0) {
      $target = $(".play-pause").last();
      $audio = $target.parent().next("audio");
    } else {
      $target = ($(".play-pause").eq($currentIndex - 1));
      $audio = $target.parent().next("audio");
    };

    toggleOtherTrack($target, $audio);
  });

  $(".footer-next").on("click", function() {
    let $currentIndex = $(".play-pause").index($(".active"));
    let $target;
    let $audio;

    if ($currentIndex === $(".play-pause").length - 1) {
      $target = $(".play-pause").first();
      $audio = $target.parent().next("audio");
    } else {
      $target = ($(".play-pause").eq($currentIndex + 1));
      $audio = $target.parent().next("audio");
    };

    toggleOtherTrack($target, $audio);
  });

  loadTrack = function($target) {
    let title = $target.parent().parent().next().find(".track-title").text();
    let artist = $target.parent().parent().next().find(".artist").text();

    $(".track-selected").text(title);
    $(".artist-selected").text(artist);
  };

  toggleOtherTrack = function($target, $audio) {
    $(".play-pause").removeClass("active").removeClass("glyphicon-pause").addClass("glyphicon-play");
    $("audio").trigger("pause").prop("currentTime", 0);
    $target.addClass("active").removeClass("glyphicon-play").addClass("glyphicon-pause");
    loadTrack($target);
    $(".footer-play-pause").removeClass("glyphicon-play").addClass("glyphicon-pause");
    $audio.trigger("play");
  };

});
