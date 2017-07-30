$(document).ready(function() {
	"use strict";
	
	var	i,
			song,
			audio,
			ext,
			currentSong = 0,
			playing = false,
			songs = [ {name: "Community Pig", artist: "Bad Ronald", url: "audio/pig", audio: null},
								{name: "It&apos;s Your Birthday", artist: "Monk Turner", url: "audio/birthday", audio: null},
								{name: "Running Waters", artist: "Jason Shaw", url: "audio/waters", audio: null},
								{name: "Something Elated", artist: "Broke For Free", url: "audio/elated", audio: null},
								{name: "Requiem For A Fish", artist: "The Freak", url: "audio/fish", audio: null}];
	
	function updateStatus(songIndex) {
		
		var song = songs[songIndex],
				$play = $('div[data-song="' + songIndex + '"] .play').eq(0),
				$pause = $('div[data-song="' + songIndex + '"] .pause').eq(0);
		
		$('footer li:first-child').html(song.name);
		$('footer li:last-child').html(song.artist);
		
		if (playing) {
			$('#footer-pause').show();
			$('#footer-play').hide();
			$play.hide();
			$pause.show();
		}
		else {
			$('#footer-pause').hide();
			$('#footer-play').show();
			$play.show();
			$pause.hide();
		}
	}
	
	function toggleSongStatus(song) {
		
		var audio = songs[currentSong].audio;
		
		if (currentSong == song) {
			playing = !playing;
			updateStatus(currentSong);
			if (playing) {
				audio.play();
			}
			else {
				audio.pause();
				audio.currentTime = 0;
			}
		}
		else {
			if (playing) {
				playing = !playing;
				updateStatus(currentSong);		
				audio.pause();
				audio.currentTime = 0;
			}
			playing = !playing;
			currentSong = song;
			updateStatus(currentSong);
			audio = songs[currentSong].audio;	
			audio.play();
		}
	}
	
	function chooseAudioFiletype() {
		
		ext = ".mp3";
		
		var agent = navigator.userAgent.toLowerCase();
		
		if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
			ext = ".ogg";
		}
	}
	
	//	Determine which type of audio file to use
	chooseAudioFiletype();
	
	//	Create song entries
	for (i = 0; i < songs.length; i++) {
		song = songs[i];
		$('main').append($("<div class='song clearfix' data-song='" + i + "'><div class='play'><i class='fa fa-play'></i></div><div class='pause'><i class='fa fa-pause'></i></div><ul><li>" + song.name + "</li><li>" + song.artist + "</li></ul></div>"));
		
		audio = new Audio();
		audio.src = song.url + ext;
		audio.loop = false;
		song.audio = audio;
		audio.addEventListener("ended", function() {
			toggleSongStatus(currentSong);		
		});
	}
	
	//	Hide unused buttons
	$('.song div.pause').hide();
	$('#footer-pause').hide();
	
	//	Report current song
	updateStatus(currentSong);
	
	$('main').on('click', function(event) {
		
		var newSong = $(event.target).closest('div.song').eq(0).data('song');
		
		toggleSongStatus(newSong);
	});
	
	$('#footer-play, #footer-pause').on('click', function(event) {
		
			toggleSongStatus(currentSong);		
	});
	
	$('#footer-step-backward').on('click', function(event) {
		
		var newSong = currentSong - 1;
		
		if (newSong < 0) {
			newSong = songs.length - 1;
		}
		
		toggleSongStatus(newSong);
	});
	
	$('#footer-step-forward').on('click', function(event) {
		
		var newSong = currentSong + 1;
		
		if (newSong >= songs.length) {
			newSong = 0;
		}
		
		toggleSongStatus(newSong);
	});
	
});
