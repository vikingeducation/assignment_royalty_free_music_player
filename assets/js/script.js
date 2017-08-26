var tracks = [{
  title: "Subzero",
  artist: "Ben Klock",
  url: "http://www36.zippyshare.com/d/WTpaDpHX/17920/Ben%20Klock%20-%20Subzero%20%28Original%20Mix%29.mp3"
},{
  title: "Higher Level (Bicep Remix)",
  artist: "Isaac Tichauer",
  url: "http://www120.zippyshare.com/d/lT7ZgFOf/21209/Isaac%20Tichauer%20-%20Higher%20Level%20%28Bicep%20Remix%29%20%5bClapCrate.com%5d.mp3"
},{
  title: "Sometimes (Original Mix)",
  artist: "Detroit Swindle",
  url: "http://www26.zippyshare.com/d/P9ujfI1o/18924/Detroit%20Swindle%20-%20Sometimes%20%28Original%20Mix%29.mp3"
},{
  title: "B.F.O.D.A.A.S",
  artist: "Mall Grab",
  url: "http://www117.zippyshare.com/d/i31FJ7se/51551/Mall%20Grab%20-%20B.F.O.D.A.A.S%20%5bClapCrate.net%5d.mp3"
},{
  title: "German Winter (Original Mix)",
  artist: "andhim",
  url: "http://www44.zippyshare.com/d/JVnLbj2l/21799/Andhim%20-%20German%20Winter%20%28Original%20Mix%29.mp3"
}];

$(document).ready(function() {

  $(".play-btn").on("click", function(event) {
    event.preventDefault();
    $target = $(this);
    loadTrack($target);
    updateControls($target);
    // playSong();
  });
});

loadTrack = function($target) {
  var title = $target.parent().next().find(".track-title").text();
  var artist = $target.parent().next().find(".artist").text();
  var url = (tracks.find(u => u.title === title)).url;

  $(".track-selected").find(".track-title")
    .text(title);
  $(".track-selected").find(".artist")
    .text(artist);
  $("audio source").attr("src", url);
};

updateControls = function($target) {
  $(".glyphicon-pause")
    .removeClass("glyphicon-pause")
    .addClass("glyphicon-play");
  $(".navbar .play-btn").find("span")
    .removeClass("glyphicon-play")
    .addClass("glyphicon-pause");
  $target.find("span")
    .removeClass("glyphicon-play")
    .addClass("glyphicon-pause");
};
