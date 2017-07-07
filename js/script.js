




function eventListeners() {
	$(document).on({
		click: function(){ 
			// console.log(this); 
			// console.log(event.target);
			play.main(event.target);
		},
	});
}

var play = {

	currentSong: [],

	main: function(target){

		// console.log(target);

		var $target = $(target);

		if ($target.hasClass('play') === true) {
			this.playPause($target);
			this.play(target);
			this.footerShowSong($target);
		}

		if ($target.hasClass('pause') === true) {
			this.playPause($target);
			this.pause(target);
			this.footerShowSong($target);
		}

		if ($target.attr('id') === "footer-play" ) {
			this.footerPlay();
		}

		if ($target.attr('id') === "footer-pause" ) {
			this.footerPause($target);
		}

	},

	playPause: function($target){ // accepts the jQuery pause/play icons
		// console.log($target);

		if ($target.hasClass('play') === true) {
			// hide the play button next to the song title/artist
				$target.toggleClass('hide');

			// show the pause button next to the song title/artist
				var $pauseIcon = $target.siblings('.pause');
				$pauseIcon.toggleClass('hide');

			// hide the footer play button 
				$('#footer-play').toggleClass('hide');

			// show the footer pause button
				$('#footer-pause').toggleClass('hide');

			// clear the this.currentSong array 
			// this will always keep the most current song and that song only in the array
				this.currentSong.pop();

			// push the current songContainerId to the this.currentSong array
				var songContainerId = $target.parent().attr('id');
				this.currentSong.push(songContainerId);
		}

		if ($target.hasClass('pause') === true) {
			// hide the play button next to the song title/artist
				$target.toggleClass('hide');

			// show the pause button next to the song title/artist
				var $playIcon = $target.siblings('.play');
				$playIcon.toggleClass('hide');

			// hide the footer play button 
				$('#footer-play').toggleClass('hide');

			// show the footer pause button
				$('#footer-pause').toggleClass('hide');
		}
	},

	// play the song associated with the play button that is selected
	play: function(target){
		
		// console.log('play function');
		// console.log(target);

		if ( target.nodeName === "DIV" ) {
			var song = target.childNodes[5].childNodes[5];
		} else {
			var parent =  target.parentElement;
			var song = parent.childNodes[5].childNodes[5];
		}

		song.classList.remove('paused');
		song.className += 'playing';

		song.play();

		// fires an alert when the song is ended
		song.onended = function(){
			alert('audio ended');
		}
		
	},

	pause: function(target){

		// console.log('pause function');
		// console.log(target);

		var parent =  target.parentElement;
		var song = parent.childNodes[5].childNodes[5];

		song.classList.remove('playing');
		song.className += 'paused';

		song.pause();

	},

	footerShowSong: function($target){

		// console.log($target);

	// get the text of the song and artist
		var songTitle = $target.siblings('.artist-info').find('.song-title').text();
		var artistName = $target.siblings('.artist-info').find('.artist-name').html();
		
	// add that text to the footer song and artist
		$('#played-song').text(songTitle);
		$('#played-artist').html(artistName);

	// if the artist is a link, the below class must be added to preserve the original styling
		if ( $('#played-artist').children().is('a') === true ) {
			$('#played-artist').children().addClass('footer-artist-style');
		}

	},

	footerPlay: function(){

		var max = $('.song-container').length;

	// if no songs have been played, choose a random song to play
		if (this.currentSong.length === 0) {
			var num = Math.random() * max + 1;
			num = Math.floor(num);

		// get the song-container div to send the the play function
			var songId = '#song' + num;
			var song = $(songId);
			song = song.get(0);
			this.play(song);

		// get the song-container play icon to send to the playPause and footerShowSong functions
			var playIcon = $(song).children('.fa-play');
			this.playPause(playIcon);
			this.footerShowSong(playIcon);


		} else { // action: pressing the footer play button when a song has already been played and paused

		// get the song to send to the pause funtion to pause the song
			var $pausedSong = $('main').find('.paused');
			// var pauseIcon = $pausedSong.parent().siblings('.pause').get(0);
			// this.pause(pauseIcon);

		// get the song-container play icon to send to the playpause function
			var playIcon = $pausedSong.parent().siblings('.play').get(0);
			this.play(playIcon);

		// change the footer and respective song play buttons to pause
			this.playPause( $(playIcon) );

		}

	},

	footerPause: function(){ // action: pressing the footer pause button at any point

	// pauses the song: get the current song-container to send to the playPause function
		var $playingSong = $('main').find('.playing');
		var pauseIcon = $playingSong.parent().siblings('.pause').get(0);
		this.pause(pauseIcon);

	// change the pause icons to play on the footer and the playing song: 
	// get the jQuery play/pause icon to send to the playPause function
		this.playPause( $(pauseIcon) );

	},
}



// show current songs/artist on the footer

// when the pause buttong is pushed stop song playback

// if the pause button is pushed all pause buttons turn to play button

// if the skip buttons are used cycle to the next or previous song





























$(document).ready(function(){ eventListeners() });