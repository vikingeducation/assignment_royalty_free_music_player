'use strict';

//create song list

const SongList = {
	song1: {
		artist: "bensound",
		title: "A New Beginning",
		url: "/music/bensound-anewbeginning.mp3"
	},
	song2: {
		artist: "bensound",
		title: "Energy",
		url: "/music/bensound-energy.mp3"
	},
	song3: {
		artist: "bensound",
		title: "Going Higher",
		url: "/music/bensound-goinghigher.mp3"
	},
	song4: {
		artist: "bensound",
		title: "Happy Rock",
		url: "/music/bensound-happyrock.mp3"
	},
	song5: {
		artist: "bensound",
		title: "Jazzy Frenchy",
		url: "/music/bensound-jazzyfrenchy.mp3"
	},
	song6: {
		artist: "bensound",
		title: "Ukulele",
		url: "/music/bensound-uklulele.mp3"
	}
}

//create player object

let player = {

	//declare player variables
	$songList: $('.song-list'),

	currentSong: "song1",

	//loop through all songs in songList & populate eac one into player
	populateSongs: function(songs) {
			
		let songNumber = 1
		
		for (var song in songs) {
			this.$songList
				.append('<li class="song song' + songNumber + '">\
					<div class="list-play-icon">\
						<i class="fa fa-play" aria-hidden="true"></i>\
					</div>\
					<div class="list-pause-icon">\
						<i class="fa fa-pause" aria-hidden="true"></i>\
					</div>\
					<div class="song-info">\
						<h5 class="artist">' + (songs[song]).artist + '</h5>\
						<a href="' + (songs[song]).url + '" class="title">' + (songs[song]).title + '\
					</div>\
			</li>');
			
			songNumber += 1;
		}

	}, //populateSongs

	currentSongDisplay: function(songString) {
		let $footerDiv = $('.current-track-info'),
			songObject = SongList[songString];

		if (songString === "") {
			return;
		} else {
			this.currentSong = songString;
			$footerDiv
				.children()
				.first()
				.text(songObject.artist)
				.next()
				.text(songObject.title)
				.next()
				.attr("href", songObject.url);

		}
		
	}, //currentSongDisplay






	//when song/play is clicked
		//icon turns to pause
		//song plays
		//song populates into footer
		//song name in list changes color

	//when song/pause is clicked
		//icon turns to play
		//song pauses
		//song stays in footer
		//song name in list changes color

	//when next button is clicked
		//next song is selected & populates into footer
		//next song plays
		//song name in list changes color
		//if at last song, go to first

	//when previous button is clicked
		//previous song is selected & populates into footer
		//previous song plays
		//song name in list changes color
		//if at first song, go to last



} //player


player.populateSongs(SongList);
//player.currentSongDisplay();

setTimeout(function() {
	$('.song').click(function(event) {
		event.preventDefault();
		let songReg = /song\d+/; //regex pattern to pull song number from class
		let songString = "";
		let $selectedSong = $(event.target)
			.parent()
			.parent();
		
		if ($selectedSong.hasClass("song")) { //only assign songString if user clicks on play button or artist/title
			songString = $selectedSong
				.attr('class')
				.match(songReg)
				.toString();
		}
		
		player.currentSongDisplay(songString);
	});
}, 0);










