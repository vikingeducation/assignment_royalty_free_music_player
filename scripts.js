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
		url: "/music/bensound-ukulele.mp3"
	}
}

//create player object

let player = {

	//declare player variables
	$songList: $('.song-list'),

	$listDiv: "",

	currentSong: "",

	songString: "",

	songPlaying: "paused",

	playToggle: function() {
		if (this.songPlaying === "playing") {
				document.getElementById("song-url").pause();
				this.songPlaying = "paused";
				this.buttonToggle();
			} else {
				document.getElementById("song-url").play();
				this.songPlaying = "playing";
				this.buttonToggle();
			}
		console.log(this.songPlaying);
	},

	buttonToggle: function() {
		if (this.songPlaying === "paused") {	
			this.$listDiv
					.children()
					.first()
					.removeClass('hide')
					.next()
					.addClass('hide');
			$('.the-play-button').removeClass('hide');
			$('.the-pause-button').addClass('hide');
		} else {
			this.$listDiv
					.children()
					.first()
					.addClass('hide')
					.next()
					.removeClass('hide');
			$('.the-play-button').addClass('hide');
			$('.the-pause-button').removeClass('hide');
		}
	},

	//loop through all songs in songList & populate eac one into player
	populateSongs: function(songs) {
			
		let songNumber = 1
		
		for (var song in songs) {
			this.$songList
				.append('<li class="song song' + songNumber + '">\
					<div class="list-play-icon">\
						<i class="fa fa-play" aria-hidden="true"></i>\
					</div>\
					<div class="list-pause-icon hide">\
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

	currentSongDisplay: function(startingSong) {
		let $footerDiv = $('.current-track-info');
		
		if (this.currentSong === "") {
			this.currentSong = startingSong;
		}

		// this.$listDiv = $('.' + this.songString);

		console.log(this.songString + " " + this.currentSong);

		if (this.songString === "" || this.currentSong === this.songString) { //do nothing if same song is clicked
			//this.buttonToggle();
			this.$listDiv = $('.' + this.currentSong); 
			return;
		} else {

			this.currentSong = this.songString; //set currentSong to song that was just clicked
			this.$listDiv = $('.' + this.currentSong); //assign song# class to jQuery list selector
			let songObject = SongList[this.currentSong]; //select the correct song from the catalog
			$footerDiv
				.children()
				.first()
				.text(songObject.artist)
				.next()
				.text(songObject.title)
				.next()
				.children()
				.attr("src", songObject.url);

			//this.buttonToggle();

			document.getElementById("song-url").load(); //load the song as soon as it's selected so that pause function works correctly
			
			

		}
		
	}, //currentSongDisplay

	playSong: function() {
		//this.buttonToggle();
		this.playToggle();
		//document.getElementById("song-url").play();
	}, //playSong

	pauseSong: function() {
		this.playToggle();
		//this.buttonToggle();
	}, //playSong

	clickPlayPause: function(event) {
		
		event.preventDefault();
		let songReg = /song\d+/; //regex pattern to pull song number from class
		let thisSong = "";
		let $selectedSong = $(event.target)
			.parent()
			.parent();

		if ($selectedSong.hasClass("song")) { //only assign songString if user clicks on play button or artist/title
			thisSong = $selectedSong
				.attr('class')
				.match(songReg)
				.toString();
		}
		
		if (thisSong !== this.songString) {
			this.songString = thisSong;
			this.currentSongDisplay();
			//this.buttonToggle();
			this.playToggle();
			//player.buttonToggle();
		} else {
			this.currentSongDisplay();
			//player.buttonToggle();
			this.playToggle();
		}
	} //clickPlayPause





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
player.currentSongDisplay("song1");

setTimeout(function() {
	$('.song').click(function(event) {
		player.clickPlayPause(event);
	});
}, 0);


//YOUAREHERE  - when user clicks on a new song in the list while the old one is playing, shit breaks. FIX IT!!!







