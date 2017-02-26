$(document).ready(function() {
	musicPlayer.init();
});

var songs = 
	[{
		"name": "Already Flown",
		"artist": "Barefoot McCoy",
		"currentlyPlaying": false,
		"src": "audio/song1.mp3"
	},
	{
		"name": "Puddles",
		"artist": "Mega Gem",
		"currentlyPlaying": false,
		"src": "audio/song2.mp3"
	},
	{
		"name": "Onions",
		"artist": "Mega Gem",
		"currentlyPlaying": false,
		"src": "audio/song3.mp3"
	},
	{
		"name": "Concerts",
		"artist": "Trotski Nautique",
		"currentlyPlaying": false,
		"src": "audio/song4.mp3"
	},
	{
		"name": "Métal Province",
		"artist": "Trotski Nautique",
		"currentlyPlaying": false,
		"src": "audio/song5.mp3"
	}];

var musicPlayer = {

	init: function() {
		$(".play-pause-icon").click(function() {
			musicPlayer.updateActiveSong(event);
			musicPlayer.updateButtons(event);
			musicPlayer.updateDisplay();
		});
		$("#main-play-pause-icon").click(function(){
			musicPlayer.updateActiveSong(event);
			musicPlayer.updateButtons(event);
		});
		$("#prev").click(function() {
			musicPlayer.previousSong();
		});
		$("#next").click(function() {
			musicPlayer.nextSong();
		});
	},

	updateActiveSong: function(event) {
		// Small button on left of songs is pressed
		if($(event.target).is(".play-pause-icon")) {
			var songID = parseInt($(event.target).parent().attr("data-songID"));
			$("#main-play-pause-icon").attr("data-songID", songID);
		} else { // Main button in footer is pressed
				var songID = parseInt($("#main-play-pause-icon").attr("data-songID"));
			}
		
		var currentSong = $("[data-songid='" + songID + "'").find("audio")[0];

		for (var song in songs) {
			// if song is the clicked song
			if(songs[song] === songs[songID]) {

				// check if it is already playing
				if (songs[songID].currentlyPlaying === true) {
					songs[song].currentlyPlaying = false;
					currentSong.pause();
				} else {
					songs[song].currentlyPlaying = true;
					currentSong.play();
				}	
				// all songs that are not clicked, should be set to not playing 
			} else {
					songs[song].currentlyPlaying = false;
				}
		}


	},
	updateButtons: function(event) {

		// Small button on left of songs is pressed
		if($(event.target).is(".play-pause-icon")) {
			var songID = parseInt($(event.target).parent().attr("data-songID"));
		} else { // Main button in footer is pressed
				var songID = parseInt($("#main-play-pause-icon").attr("data-songID"));
			}
			
		// Updating small buttons left of songs
		for (var song in songs) {
			if (songs[song].currentlyPlaying === true) {
				$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/pause-black.png");
			} else {
					$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/play-black.png");
				}
		}

		// Updating main button footer
		if (songs[songID].currentlyPlaying === true) {
			$("#main-play-pause-icon").attr("src", "img/controls/pause-white.png");
		} else {
				$("#main-play-pause-icon").attr("src", "img/controls/play-white.png");
			}
	},
	updateDisplay: function() {
		for (var song in songs) {
			if (songs[song].currentlyPlaying === true) {
				$(".current-song").find("h2").text(songs[song].name);
				$(".current-song").find("a").text(songs[song].artist);
			}
		}
	},
	previousSong: function() {
		var songID = parseInt($("#main-play-pause-icon").attr("data-songid"));

		if (songID === 0) {
			songID = songs.length-1;
		} else {
				songID -= 1;
			}

		$("#main-play-pause-icon").attr("data-songID", songID);

		for (var song in songs) {
			if (songs[song] === songs[songID]) {
				songs[songID].currentlyPlaying = true;
				$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/pause-black.png");					
				$("#main-play-pause-icon").attr("src", "img/controls/pause-white.png");
				$(".current-song").find("h2").text(songs[song].name);
				$(".current-song").find("a").text(songs[song].artist);
			} else {
					$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/play-black.png");
				}
		}		
		
	},
	nextSong: function() {
		var songID = parseInt($("#main-play-pause-icon").attr("data-songid"));

		if (songID === songs.length-1) {
			songID = 0;
		} else {
				songID += 1;
			}		

		$("#main-play-pause-icon").attr("data-songID", songID);

		for (var song in songs) {
			if (songs[song] === songs[songID]) {
				songs[songID].currentlyPlaying = true;
				$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/pause-black.png");
				$("#main-play-pause-icon").attr("src", "img/controls/pause-white.png");
				$(".current-song").find("h2").text(songs[song].name);
				$(".current-song").find("a").text(songs[song].artist);
			} else {
					$("[data-songID='" + song + "'").find("img").attr("src", "img/controls/play-black.png");
				}
		}		
	},
};
