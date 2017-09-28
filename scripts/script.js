// Notes: 
// (1)
//    The main song section is completed
//    The footer section's buttons do not have functionality yet
//    However the footer's text is fully functional and matches main's song selection
// (2)
//    Need to run node.js' http-server (or ruby's version) for all the code to work in the browser
//    due to the fact that I used background-image:url in my css
// DC, 2017-09

$(document).ready( function(){
	"use strict";
	console.log("Done loading ...");

	$('.main-song-block').click(function() {
		playAudio( $( this ) );
	});

	function playAudio ( $song ) {

		//$song is the .main-song-block
		var song = $song.children('audio').get(0);

		updateSongIcons($song);
		updateFooterSongInfo($song);

		if (song.paused) {
			pauseAll(song);
			song.play();

			//reset icon to play-icon when song ends
			song.onended = function () {
			var $ended = $song.children('.main-icon');
			$ended.removeClass('main-pause-icon')
				  .addClass('main-play-icon');
			};
		} else {
			song.pause();
		} 
	}

	//pause all songs before playing current selection, else the songs will play at the same time as you click on it
	function pauseAll ( song ) {
		var $allSongs = $('audio'); 
		for (var i=0; i <= $allSongs.length - 1; i++)  {
			if ($allSongs[i] !== song) {
				$allSongs[i].pause();
				$allSongs[i].currentTime = 0;

				//provide corrective so that only the song playing has the pause icon,
				//else there wlll erroneously be multiple pause icons when you click the songs
				var $currentIcon = $($allSongs[i]).prevAll('.main-icon');
				if ($currentIcon.hasClass('main-pause-icon')) {
					$currentIcon.removeClass('main-pause-icon')
								.addClass('main-play-icon');
				}	
			} 
		}
	}

	function updateSongIcons($song) {
		var $icon = $song.children('.main-icon');
		if ($icon.hasClass('main-play-icon')) {
			$icon.removeClass('main-play-icon')
				 .addClass('main-pause-icon');
		} else {
			$icon.removeClass('main-pause-icon')
				 .addClass('main-play-icon');
		}
	}

	function updateFooterSongInfo($song) {
		var songName = $song.children('.song').text();
		var artistName = $song.children('.artist').text();
		$('#footer-song').text(songName);
		$('#footer-artist').text(artistName);
	}

});	