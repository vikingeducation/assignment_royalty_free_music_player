$(document).ready( function(){
	"use strict";
	console.log("Done loading ...");

	$('.main-song-block').click(function() {
		playAudio( $( this ) );
	});

	function playAudio ( $song ) {
		var song = $song.children('audio').get(0);
		if (song.paused) {
			pauseAll(song);
			song.play();
		} else {
			song.pause();
		}
	}

	function pauseAll ( song ) {
		var $allSongs = $('audio'); 
		for (var i=0; i <= $allSongs.length - 1; i++)  {
			if ($allSongs[i] !== song) {
				$allSongs[i].pause();
				$allSongs[i].currentTime = 0;
			}
		}
	}

});	