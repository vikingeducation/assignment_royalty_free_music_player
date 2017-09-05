var audio;

$("#pause").hide();

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
});

// Pause button
$("#pause").on("click", function() {
  audio.pause();
  $("#play").show();
  $("#pause").hide();
});

// Next button
$("#next").on("click", function() {
  audio.pause();
  $("#play").show();
  $("#pause").hide();
  // Save next element to variable
  var nextT = $(".active").next();
  // If its on the last song, skip to the first
  if (nextT.length === 0) {
    nextT = $(".song:first-child");
  }
  // Reinitialize with new element
  initAudio(nextT);
  audio.play();
});

// Previous button
$("#prev").on("click", function() {
  audio.pause();
  $("#play").show();
  $("#pause").hide();
  // Save previous element to variable
  var prevT = $(".active").prev();
  // If on the first song, skip to the last
  if (prevT.length === 0) {
    prevT = $(".song:last-child");
  }
  // Reinitialize with new element
  initAudio(prevT);
  audio.play();
});
