var curPlaying = 'song1';

$(document).ready(function(){
	$(".song-wrapper").click(function(e){
		e.preventDefault();
		var $songElement = $(this).parent().next();
		var song = $songElement.get(0);
		if (song.paused){
			var $curPlayingSong = $('#' + curPlaying);
			make_a_song_pause($curPlayingSong);
			make_a_song_play($songElement, false);
       	}
       	else{
       		make_a_song_pause($songElement);
       	}
	});

	$('#controlPanelButtonPrev').click(function(e){
		var nextToPlay = 0;
		var $songElement = $('#' + curPlaying);
		make_a_song_pause($songElement);
		var curPlay = parseInt(curPlaying.substring(4));
		if(curPlay == 1){
			nextToPlay = 5
		}
		else{
			nextToPlay = curPlay - 1;
		}
		curPlaying = 'song' + nextToPlay;
		$songElement = $('#' + curPlaying);
		make_a_song_play($songElement, true);
	});

	$('#controlPanelButtonPlay').click(function(e){
		var $songElement = $('#' + curPlaying);
		var song = $songElement.get(0);
		if (song.paused){
			make_a_song_play($songElement, false);
       	}
       	else{
       		make_a_song_pause($songElement);
       	}
	});

	$('#controlPanelButtonNext').click(function(e){
		var nextToPlay = 0;
		var $songElement = $('#' + curPlaying);
		make_a_song_pause($songElement);
		var curPlay = parseInt(curPlaying.substring(4));
		if(curPlay == 5){
			nextToPlay = 1
		}
		else{
			nextToPlay = curPlay + 1;
		}
		curPlaying = 'song' + nextToPlay;
		var $songElement = $('#' + curPlaying);
		make_a_song_play($songElement, true);
	});
});

function make_a_song_play(songElement, reset){
	var $songp = songElement.prev().children().first().children().first().next().children().first().children().first().children().first();
	var $singerp = songElement.prev().children().first().children().first().next().children().first().next().children().first().children().first();
	var $glyphicon = songElement.prev().children().first().children().first().children().first().children().first().children().first();
	var song = songElement.get(0);
	if (reset) {
		song.currentTime = 0;
	}
	$glyphicon.removeClass('glyphicon-play');
	$glyphicon.addClass('glyphicon-pause');
	$('.now-playing-song').text($songp.text());
	$('.now-playing-singer').text($singerp.text());
	$('#controlPanelButtonPlay').removeClass('glyphicon-play');
	$('#controlPanelButtonPlay').addClass('glyphicon-pause');
	curPlaying = songElement.attr('id');
    song.play();
}

function make_a_song_pause(songElement){
	var $glyphicon = songElement.prev().children().first().children().first().children().first().children().first().children().first();
	var song = songElement.get(0);
	$glyphicon.removeClass('glyphicon-pause');
	$glyphicon.addClass('glyphicon-play');
	$('#controlPanelButtonPlay').removeClass('glyphicon-pause');
	$('#controlPanelButtonPlay').addClass('glyphicon-play');
    song.pause();
}