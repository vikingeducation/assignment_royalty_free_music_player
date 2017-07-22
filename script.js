"use strict";

$(function() {
	const playlist = ['audio/Energy.mp3', 'audio/Bounce.mp3', 'audio/IF.mp3', 'audio/My_Nigga.mp3', 'audio/Juice.mp3'];
	var song = new Audio();
	song.preload = 'auto';


    //CONTROLS
    function play () {
    	if (song.paused) {
    		song.play();
    		song.currentTime = 0;
    	} else {
    		song.play();
    		song.currentTime = 0;
    	}
    }

     function pause() {
    	song.pause();
    	song.currentTime = 0;
    }

    function toggleControl()  {
    	if (song.paused) {
    		song.play();
    	}else {
    		song.pause();
    	}	
    }

	//CLICK EVENT & TOGGLE ICONS
	$('.song').click(function() {
	    let identifier = $(this).attr('data-panelid');
	    let newIdentifier = parseInt(identifier);
		song.src = playlist[newIdentifier];
		play();
		$('#current').html($(this).html());
		let currentSong = newIdentifier;
    	$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');

    	// NEXT CONTROL BUTTON
    	$('.fa-step-forward').click(function() {
    		currentSong = newIdentifier + 1;
			if(currentSong === 5){
				currentSong = 0;
			}
			let testing = $('div .song').get(currentSong);

			$('#current').html($(testing).html());
			$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
				newIdentifier = newIdentifier + 1;
				if(newIdentifier === 5){
					newIdentifier = 0;
				}
				song.src = playlist[newIdentifier];
				play();
		});

		//PREVIOUS CONTROL BUTTON
		$('.fa-step-backward').click( function() {
			currentSong = newIdentifier - 1;
			if(currentSong  === - 1) {
				currentSong = 4;
			}
			let testing = $('div .song').get(currentSong);
			$('#current').html($(testing).html());
			$('.fa-play-circle-o').addClass( 'fa-pause-circle-o');
			newIdentifier = newIdentifier - 1;
			if(newIdentifier === - 1){
				newIdentifier = 4;
			}
			song.src = playlist[newIdentifier];
			play();
		});

		//CONTINUE PLAY
		song.addEventListener('ended',function() {
			currentSong = newIdentifier + 1;
			if(currentSong === 5){
				currentSong = 0;
			}

			let testing = $('div .song').get(currentSong);
			$('#current').html($(testing).html());
			if( newIdentifier === - 1){
				newIdentifier = 4;
			}
			newIdentifier = newIdentifier + 1;
			if(newIdentifier === 5){
				newIdentifier = 0;
			}
    		song.currentTime = 0;
			song.src = playlist[newIdentifier];
			play();
		}, true);
		song.loop = false;
    });

    //ERROR HANDLING 
    $('.footer').click( function() {
    	if( song.src == "" ) {
    		alert('select a song first!');
    	}
    });

	$('.fa-play-circle-o').click(function() {
		
		if( song.src == "" ) {
			alert('select a song first!');
		} else {
			$('.fa-play-circle-o').toggleClass( 'fa-pause-circle-o');
			toggleControl();
		}
	});



	//HOVER EFFECTS 
	$('.song').mousemove(function() {
		$(this).css('font-size', '18px');
	});


	$('.song').mouseout(function() {
		$(this).css('font-size', '16px');
	});
	
});
