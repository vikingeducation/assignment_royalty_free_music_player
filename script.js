$(document).ready(function(){

  $("audio").trigger("load");

  //function to update text in the footer
  function updateFooter(){
    var $replacement = $(".playing").parent().next().eq(0).clone().removeClass("col-xs-11");
    $(".song", ".footer").replaceWith($replacement);
  }

  //function to play other (not currently active) song depending on which button was clicked
  function playOther(targetSong, audio){
    $(".play-pause").removeClass("playing").removeClass("glyphicon-pause").addClass("glyphicon-play");
    $("audio").trigger('pause').prop("currentTime", 0);
    targetSong.addClass("playing").addClass("glyphicon-pause").removeClass("glyphicon-play");
    $(".footer-play-pause").removeClass("glyphicon-play").addClass("glyphicon-pause");
    audio.trigger('play');
    updateFooter();
  }

  $(".play-pause").on("click", function(){
    var $audio = $(this).next('audio').eq(0);
    if ($(this).hasClass("playing") && $(this).hasClass("glyphicon-play")) {
      $audio.trigger('play');
      $(this).addClass("glyphicon-pause").removeClass("glyphicon-play");
      $(".footer-play-pause").addClass("glyphicon-pause").removeClass("glyphicon-play");
    } else if ($(this).hasClass("playing") && $(this).hasClass("glyphicon-pause")) {
      $audio.trigger('pause');
      $(this).addClass("glyphicon-play").removeClass("glyphicon-pause");
      $(".footer-play-pause").addClass("glyphicon-play").removeClass("glyphicon-pause");
    } else {
      playOther($(this), $audio);
    }
  });

  $(".footer-play-pause").on("click", function(){
    var $audio = $(".playing").next('audio').eq(0);
    if ($(this).hasClass("glyphicon-play")) {
      $audio.trigger('play');
      $(this).addClass("glyphicon-pause").removeClass("glyphicon-play");
      $(".playing").addClass("glyphicon-pause").removeClass("glyphicon-play");
    } else {
      $audio.trigger('pause');
      $(this).addClass("glyphicon-play").removeClass("glyphicon-pause");
      $(".playing").addClass("glyphicon-play").removeClass("glyphicon-pause");
    }
  });

  $(".prev-track").on("click", function(){
    if ($(".play-pause").index($(".playing")) !== 0) {
      var $targetSong = $(".play-pause").eq($(".play-pause").index($(".playing")) - 1);
      var $audio = $targetSong.next('audio').eq(0);
      playOther($targetSong, $audio);
    }
  });

    $(".next-track").on("click", function() {
      if ($(".play-pause").index($(".playing")) < $(".play-pause").length - 1) {
      var $targetSong = $(".play-pause").eq($(".play-pause").index($(".playing")) + 1);
      var $audio = $targetSong.next('audio').eq(0);
      playOther($targetSong, $audio);
    }
  });

});