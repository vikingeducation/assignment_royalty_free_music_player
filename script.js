$(function () {
	"use strict";
	var playlist = ['audio/0.mp3', 'audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3', 'audio/4.mp3'];
	 var song = new Audio();
		song.preload = 'auto';
		song.addEventListener('ended', function() {
			var i = Math.floor(Math.random() * 4);
			$('#current').html($(i).html());
			console.log(i);
			song.src = playlist[i];
			song.play();
		}, true);
		song.loop = false;
    
		/*alert(identifier);*/

    var nextSong = null;
    var prevSong = null;
	function play() {
    	if (song.paused) {
    		song.play();
    		song.currentTime = 0;
    	} else {
    		song.play();
    		song.currentTime = 0;
    	}
    }


    //CONTROLS

    function pause() {
    	song.pause();
    	song.currentTime = 0;
    }

    function toggleControl() {
    	if (song.paused) {
    		song.play();
    	}else {
    		song.pause();
    	}	
    }

	//CLICK EVENT & TOGGLE ICONS
	$('.song').click( function() {
		var identifier = $(this).attr('data-panelid');
		song.src = playlist[identifier];
		play();
		$('#current').html($(this).html());
    	$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
    });

	$('.fa-play-circle-o').click( function() {
		if( song.src == "" ) {
			alert('select a song first!');
		} else {
			$('.fa-play-circle-o').toggleClass( 'fa-pause-circle-o');
			toggleControl();
		}
	});

	$('.fa-step-backward').click(function() {
		$('.current').html($(this).html());
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
		song.src = playlist[identifier - 1];
		pause();
		play();
	});

	$('.fa-step-forward').click(function() {
		$('.current').html($(this).html());
		$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
	});


	//HOVER EFFECTS 
	$('.song').mousemove( function() {
		$(this)
		.css('font-size', '18px');
	});


	$('.song').mouseout( function() {
		$(this).css('font-size', '16px');
	});
	
});
