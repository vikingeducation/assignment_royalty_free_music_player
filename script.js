var audio;

// Hide pause buttons to start
$("#pause").hide();
$(".song-pause").hide();

// Initialize audio
initAudio($(".song:first-child"));

function initAudio(element) {
  var song = element.attr("song-info");
  var title = element.text();

  // new audio object
  audio = new Audio("assets/audio/" + song);

  $(".now-playing .title").text(title);

  $(".active").removeClass("active");
  element.addClass("active");
}

// Play button
$("#play").on("click", function() {
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $(".active .song-play").hide();
  $(".active .song-pause").show();
});

// Pause button
$("#pause").on("click", function() {
  audio.pause();
  var audioTime = audio.currentTime;
  $("#play").show();
  $("#pause").hide();
  $(".active .song-play").show();
  $(".active .song-pause").hide();
  // If you hit play on the same track after hitting pause, continue playing at the same point
  $("#play").on("click touchscreen", function() {
    audio.play(audioTime);
    $("#play").hide();
    $("#pause").show();
    $(".active .song-play").hide();
    $(".active .song-pause").show();
  });
});

// Next button
$("#next").on("click", function() {
  audio.pause();
  $("#play").hide();
  $("#pause").show();
  $(".active .song-play").show();
  $(".active .song-pause").hide();
  // Save next element to variable
  var nextT = $(".active").next();
  // If its on the last song, skip to the first
  if (nextT.length === 0) {
    nextT = $(".song:first-child");
  }
  // Reinitialize with new element
  initAudio(nextT);
  $(".active .song-play").hide();
  $(".active .song-pause").show();
  audio.play();
});

// Previous button
$("#prev").on("click", function() {
  audio.pause();
  $("#play").hide();
  $("#pause").show();
  $(".active .song-play").show();
  $(".active .song-pause").hide();
  // Save previous element to variable
  var prevT = $(".active").prev();
  // If on the first song, skip to the last
  if (prevT.length === 0) {
    prevT = $(".song:last-child");
  }
  // Reinitialize with new element
  initAudio(prevT);
  $(".active .song-play").hide();
  $(".active .song-pause").show();
  audio.play();
});

// Play button for each song track
$(".song-play").on("click", function() {
  audio.pause();
  $(".active .song-play").show();
  $(".active .song-pause").hide();
  $(this).hide();
  $(this).next().show();
  $("#play").hide();
  $("#pause").show();

  var thisT = $(this).parent();
  initAudio(thisT);

  audio.play();
});

// Pause button for each track
$(".song-pause").on("click", function() {
  audio.pause();
  var audioTime = audio.currentTime;
  $(this).hide();
  $(this).prev().show();
  $("#play").show();
  $("#pause").hide();
});
