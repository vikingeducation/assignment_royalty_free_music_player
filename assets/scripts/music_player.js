
var statusBar = document.getElementsByClassName("status")[0].children,
  statusPlay = statusBar[1],
  statusPause = statusBar[2],
  statusSong = statusBar[4],
  statusArtist = statusBar[5],
  audios = document.querySelectorAll("audio"),
  songs = document.getElementsByClassName("song"),
  songPlay = document.getElementsByClassName("song-play"),
  songPause = document.getElementsByClassName("song-pause");

function pauser(song) {
  song[4].pause();
  song[0].classList.remove("hide");
  song[1].classList.remove("playing");
  statusPlay.classList.remove("hide");
  statusPause.classList.remove("playing");
}

function starter(song) {
  song[4].play();
  song[0].classList.add("hide");
  song[1].classList.add("playing");
  statusPlay.classList.add("hide");
  statusPause.classList.add("playing");
  statusSong.innerHTML = song[2].innerHTML;
  statusArtist.innerHTML = song[3].innerHTML;

  for (var step = 0; step < 5; step++) {
    if (audios[step].paused && audios[step].currentTime > 0) {
      audios[step].currentTime = 0;
    }
  }
}

function seek() {
  for (var piece in songs) {
    if (
      songs[piece].children[2].innerHTML == statusSong.innerHTML &&
      songs[piece].children[3].innerHTML == statusArtist.innerHTML
    ) {
      return songs[piece];
    }
  }
}

function lookup(listing) {
  for (var sequence = 0; sequence < 5; sequence++) {
    if (songs[sequence].getAttribute("num") == listing) {
      return songs[sequence].children;
    }
  }
}

function next(current) {
  pauser(current.children);

  if (current.getAttribute("num") == 5) {
    var numeral = 1;
  } else {
    var numeral = parseFloat(current.getAttribute("num")) + 1;
  }

  starter(lookup(numeral));
}

// song play button
for (var counter = 0; counter < 5; counter++) {
  songPlay[counter].addEventListener("click", function(action) {
    var played = document.getElementsByClassName("song-pause playing")[0];

    if (played != undefined) {
      pauser(played.parentNode.children);
    }

    starter(action.target.parentNode.children);
  });
}
// song play button

// status play button
statusPlay.addEventListener("click", function() {
  starter(seek().children);
});
// status play button

// song pause button
for (var limit = 0; limit < 5; limit++) {
  songPause[limit].addEventListener("click", function(root) {
    pauser(root.target.parentNode.children);
  });
}
// song pause button

// status pause button
statusPause.addEventListener("click", function() {
  pauser(seek().children);
});
// status pause button

// status previous button
statusBar[0].addEventListener("click", function() {
  var subjectSong = seek();

  pauser(subjectSong.children);

  if (subjectSong.getAttribute("num") == 1) {
    var symbol = 5;
  } else {
    var symbol = subjectSong.getAttribute("num") - 1;
  }

  starter(lookup(symbol));
});
// status previous button

// status after button
statusBar[3].addEventListener("click", function() {
  next(seek());
});
// status after button

// song finish handler
for (var tick = 0; tick < 5; tick++) {
  audios[tick].addEventListener("ended", function(ended) {
    next(ended.target.parentNode);
  });
}
// song finish handler
