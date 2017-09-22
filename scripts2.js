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

	songRegEx: /song\d+/,

	currentSong: "",

	currentSongObject: {},

	songPlaying: false,

	//loop through all songs in songList & populate eac one into player
	populateSongs: function(songs) {
			
		let songNumber = 1;
		
		for (var song in songs) {
			let fullSongId = "song" + songNumber;
			console.log(fullSongId);
			this.$songList
				.append('<li class="song song' + songNumber + '">\
					<div class="list-play-icon play song' + songNumber + '">\
						<button class="fa fa-play" onclick="" aria-hidden="true"></button>\
					</div>\
					<div class="list-pause-icon pause song' + songNumber + ' hide">\
						<button class="fa fa-pause" onclick="" aria-hidden="true"></button>\
					</div>\
					<div class="song-info">\
						<h5 class="list-artist">' + (songs[song]).artist + '</h5>\
						<a href="' + (songs[song]).url + '" class="list-title">' + (songs[song]).title + '\
					</div>\
			</li>');
			
			songNumber += 1;
		}

	}, //populateSongs

	setSong: function(song) {
		console.log(song);
		this.currentSong = song;
		this.currentSongDisplay();
		this.playSong();
	},

	currentSongDisplay: function() {

		//if no currentSong, populate with song1
		if (this.currentSong === "") {
			this.currentSong = "song1"
		};
		//grab player.currentSong & use it to get relevant song info to display
		this.currentSongObject = SongList[this.currentSong];
		let currentArtist = this.currentSongObject.artist,
			currentTitle = this.currentSongObject.title,
			currentUrl = this.currentSongObject.url;

		//display current song in footer
		$('.footer-artist').text(currentArtist);
		$('.footer-title').text(currentTitle);
		$('#song-url')
			.children()
			.attr('src', currentUrl);

		//add class for current songs to play/pause buttons
		$('#footer-play')
			.removeClass() //remove all classes
			.addClass('fa fa-play-circle-o fa-3x the-play-button play ' + this.currentSong)

		$('#footer-pause')
			.removeClass() //remove all classes
			.addClass('fa fa-pause-circle-o fa-3x the-pause-button pause hide ' + this.currentSong)

		//load the song as soon as it's selected so that pause function works correctly
		document.getElementById("song-url").load();

	}, //currentSongDisplay

	toggleButtons: function() {
		$('.play.' + this.currentSong).toggleClass('hide');
		$('.pause.' + this.currentSong).toggleClass('hide');
	},

	playSong: function() {
		//WORKS ON CURRENT SONG DISPLAY!
		document.getElementById("song-url").play();
		this.toggleButtons();
	}, //playSong

	pauseSong: function() {
		//WORKS ON CURRENT SONG DISPLAY!
		document.getElementById("song-url").pause();
		this.toggleButtons();
	}, //pauseSong

	nextSong: function() {
		//grab the current song & add 1
		let nextNum = parseInt(this.currentSong.match(/\d+/).toString()) + 1;
		
		//loop back to 1st song if next button is clicked while on last song
		if (nextNum > Object.keys(SongList).length) {
			nextNum = 1;
		}

		//toggle list play/pause buttons
		$('.list-pause-icon.' + player.currentSong)
			.addClass('hide');
		$('.list-play-icon.' + player.currentSong)
			.removeClass('hide');

		let nextSong = "song" + nextNum;
		player.currentSong = nextSong;

		player.currentSongDisplay();
		player.playSong();
		
	}, //nextSong

	prevSong: function() {

	}, //prevSong

	
} //player


player.populateSongs(SongList);
player.currentSongDisplay();

//list play button is clicked
setTimeout(function() {
	$('.fa-play').click(function(event) {
		let $targetSong = $(event.target)
			.parent()
			.attr('class')
			.match(player.songRegEx)
			.toString();

		//toggle list play/pause buttons
		$('.list-pause-icon.' + player.currentSong)
			.addClass('hide');
		$('.list-play-icon.' + player.currentSong)
			.removeClass('hide');

		player.currentSong = $targetSong;
		player.currentSongDisplay();
		player.playSong();

	});
}, 0);

//list pause button is clicked
setTimeout(function() {
	$('.fa-pause').click(function(event) {
		player.pauseSong();		
	});
}, 0);








