function eventListeners() {
	$(document).on({
		click: function(){ 
			play.main(event.target);
		},
	});
}

var play = {

	currentSong: [],

	main: function(target){

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

		if ($target.attr('id') === 'skip-back') {
			this.skipBack();
		}

		if ($target.attr('id') === 'skip-forward') {
			this.skipForward();
		}
	},

	playPause: function($target){ // accepts the jQuery pause/play icons

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

	play: function(target){ // target accepts the i.play button next to the song

	// if a song is already playing, it needs to be paused first
		if ( $('main').find('.playing').length === 1) {
			var pauseIcon = $('main').find('.playing').parent().siblings('.pause').get(0);
			this.pause(pauseIcon);
			this.playPause( $(pauseIcon) );
		}

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
			play.skipForward();
		}
		
	},
 
	pause: function(target){ // accepts the i.pause button next to the .playing song

		var parent =  target.parentElement;
		var song = parent.childNodes[5].childNodes[5];

		song.classList.remove('playing');
		song.className += 'paused';

		song.pause();

	},

	footerShowSong: function($target){

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

		// get the song id of the most recently played song
			var lastSong = this.currentSong;
			var lastSongDiv = document.getElementById(lastSong);
			var $lastSongDiv = $(lastSongDiv);

		// get the i.play icon next to the paused song
			var playIcon = $lastSongDiv.find('.play').get(0);
			
		// pass that icon to the play function
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

	skipForward: function(){

	// pause the current song
	// get the pause button for the .playing song
		var $playingSong = $('main').find('.playing');
		var $pauseBtn = $playingSong.parent().siblings('.pause');
		var pauseBtn = $pauseBtn.get(0);

	// pass that button to the pause and playPause functions
		this.playPause($pauseBtn);
		this.pause(pauseBtn);

	// get the playing song and traverse to the next .song-container
		var $next = $playingSong.parent().parent().next();

	// get the file of that .song-container
		var $nextSong = $next.find('i.play');
		var nextSong = $nextSong.get(0);

	// pass that song to the 
		this.playPause($nextSong);
		this.play(nextSong);

	},

	skipBack: function(){

	// pause the current song
	// get the pause button for the .playing song
		var $playingSong = $('main').find('.playing');
		var $pauseBtn = $playingSong.parent().siblings('.pause');
		var pauseBtn = $pauseBtn.get(0);

	// pass that button to the pause and playPause functions
		this.playPause($pauseBtn);
		this.pause(pauseBtn);

	// get the playing song and traverse to the next .song-container
		var $next = $playingSong.parent().parent().prev();

	// get the file of that .song-container
		var $nextSong = $next.find('i.play');
		var nextSong = $nextSong.get(0);

	// pass that song to the 
		this.playPause($nextSong);
		this.play(nextSong);
	},

}


$(document).ready(function(){ eventListeners() });